import { neon } from "@neondatabase/serverless"

// Create a SQL client with the Neon connection string
export const sql = neon(process.env.DATABASE_URL!)

// Helper function to execute SQL queries
export async function query(text: string, params: any[] = []) {
  try {
    return await sql`${text}${params}`
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
