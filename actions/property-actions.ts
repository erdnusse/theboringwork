"use server"

import { createProperty, updateProperty, deleteProperty } from "@/services/property-service"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// Helper function to check if user is admin
async function isAdmin() {
  const { userId } = auth()
  if (!userId) return false

  // In a real app, you would check the user's role in your database
  // For now, we'll assume all authenticated users can manage properties
  return true
}

export async function addProperty(formData: FormData) {
  try {
    // Check if user is authorized
    if (!(await isAdmin())) {
      return { success: false, message: "Unauthorized" }
    }

    // Extract and validate form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const bedrooms = Number.parseInt(formData.get("bedrooms") as string)
    const bathrooms = Number.parseInt(formData.get("bathrooms") as string)
    const square_feet = Number.parseInt(formData.get("square_feet") as string)
    const property_type = formData.get("property_type") as string
    const status = formData.get("status") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zip_code = formData.get("zip_code") as string
    const featured = formData.get("featured") === "on"

    // Validate required fields
    if (!title || !description || !price || !address || !city || !state || !zip_code) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Create property
    const property = await createProperty({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      square_feet,
      property_type,
      status,
      address,
      city,
      state,
      zip_code,
      featured,
    })

    // Revalidate properties pages
    revalidatePath("/properties")
    revalidatePath("/dashboard/properties")

    return {
      success: true,
      message: "Property added successfully",
      property,
    }
  } catch (error) {
    console.error("Error adding property:", error)
    return {
      success: false,
      message: "There was an error adding the property. Please try again.",
    }
  }
}

export async function editProperty(id: number, formData: FormData) {
  try {
    // Check if user is authorized
    if (!(await isAdmin())) {
      return { success: false, message: "Unauthorized" }
    }

    // Extract and validate form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const bedrooms = Number.parseInt(formData.get("bedrooms") as string)
    const bathrooms = Number.parseInt(formData.get("bathrooms") as string)
    const square_feet = Number.parseInt(formData.get("square_feet") as string)
    const property_type = formData.get("property_type") as string
    const status = formData.get("status") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zip_code = formData.get("zip_code") as string
    const featured = formData.get("featured") === "on"

    // Validate required fields
    if (!title || !description || !price || !address || !city || !state || !zip_code) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Update property
    const property = await updateProperty(id, {
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      square_feet,
      property_type,
      status,
      address,
      city,
      state,
      zip_code,
      featured,
    })

    // Revalidate properties pages
    revalidatePath("/properties")
    revalidatePath(`/properties/${id}`)
    revalidatePath("/dashboard/properties")

    return {
      success: true,
      message: "Property updated successfully",
      property,
    }
  } catch (error) {
    console.error("Error updating property:", error)
    return {
      success: false,
      message: "There was an error updating the property. Please try again.",
    }
  }
}

export async function removeProperty(id: number) {
  try {
    // Check if user is authorized
    if (!(await isAdmin())) {
      return { success: false, message: "Unauthorized" }
    }

    // Delete property
    await deleteProperty(id)

    // Revalidate properties pages
    revalidatePath("/properties")
    revalidatePath("/dashboard/properties")

    return {
      success: true,
      message: "Property deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting property:", error)
    return {
      success: false,
      message: "There was an error deleting the property. Please try again.",
    }
  }
}
