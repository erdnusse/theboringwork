import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const search = searchParams.get("search") || ""

    const query = `
      SELECT * FROM properties
      WHERE title ILIKE $1 OR description ILIKE $1 OR address ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `

    const properties = await sql(query, [`%${search}%`, limit, offset])

    return NextResponse.json({ properties })
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Check authentication
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
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
    } = body

    const query = `
      INSERT INTO properties (
        title, description, price, bedrooms, bathrooms, square_feet,
        property_type, status, address, city, state, zip_code, featured
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `

    const property = await sql(query, [
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
      featured || false,
    ])

    return NextResponse.json({ property: property[0] })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
