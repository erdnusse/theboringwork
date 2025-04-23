"use server"

import { createInquiry } from "@/services/inquiry-service"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function submitPropertyInquiry(formData: FormData) {
  try {
    const propertyId = Number.parseInt(formData.get("propertyId") as string)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Validate inputs
    if (!name || !email || !message) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Get current user if logged in
    const user = await currentUser()
    const userId = user?.id || null

    // Create inquiry
    await createInquiry({
      property_id: propertyId,
      user_id: userId,
      name,
      email,
      phone,
      message,
    })

    // Revalidate the property page
    revalidatePath(`/properties/${propertyId}`)

    return {
      success: true,
      message: "Your inquiry has been submitted. An agent will contact you soon.",
    }
  } catch (error) {
    console.error("Error submitting inquiry:", error)
    return {
      success: false,
      message: "There was an error submitting your inquiry. Please try again.",
    }
  }
}
