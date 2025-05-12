"use server"

import { revalidatePath } from "next/cache"
import { updateUserRole } from "@/services/user-service"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

// Helper function to check if user is authorized
async function isAuthorized() {
  const { userId } = await auth()
  if (!userId) return false

  // Check if user is an admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  return user?.role === "ADMIN"
}

// Update user role
export async function changeUserRole(
  userId: string,
  role: "USER" | "AGENT" | "ADMIN",
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if user is authorized
    if (!(await isAuthorized())) {
      return {
        success: false,
        message: "Unauthorized. Only admins can change user roles.",
      }
    }

    // Update user role
    const updatedUser = await updateUserRole(userId, role)

    if (!updatedUser) {
      return {
        success: false,
        message: "User not found",
      }
    }

    // Revalidate the users page
    revalidatePath("/dashboard/users")

    return {
      success: true,
      message: `User role updated to ${role}`,
    }
  } catch (error) {
    console.error("Error updating user role:", error)
    return {
      success: false,
      message: `Failed to update user role: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
