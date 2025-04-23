import { sql } from "@/lib/db"

export type Property = {
  id: number
  title: string
  description: string
  price: number
  bedrooms: number
  bathrooms: number
  square_feet: number
  property_type: string
  status: string
  address: string
  city: string
  state: string
  zip_code: string
  featured: boolean
  created_at: string
  updated_at: string
}

export async function getProperties(limit = 10, offset = 0, search = "") {
  const query = `
    SELECT * FROM properties
    WHERE title ILIKE $1 OR description ILIKE $1 OR address ILIKE $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `

  const properties = await sql(query, [`%${search}%`, limit, offset])
  return properties as Property[]
}

export async function getFeaturedProperties(limit = 4) {
  const query = `
    SELECT * FROM properties
    WHERE featured = true
    ORDER BY created_at DESC
    LIMIT $1
  `

  const properties = await sql(query, [limit])
  return properties as Property[]
}

export async function getPropertyById(id: number) {
  const query = `
    SELECT * FROM properties
    WHERE id = $1
  `

  const properties = await sql(query, [id])
  return properties[0] as Property | undefined
}

export async function createProperty(property: Omit<Property, "id" | "created_at" | "updated_at">) {
  const query = `
    INSERT INTO properties (
      title, description, price, bedrooms, bathrooms, square_feet,
      property_type, status, address, city, state, zip_code, featured
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *
  `

  const result = await sql(query, [
    property.title,
    property.description,
    property.price,
    property.bedrooms,
    property.bathrooms,
    property.square_feet,
    property.property_type,
    property.status,
    property.address,
    property.city,
    property.state,
    property.zip_code,
    property.featured,
  ])

  return result[0] as Property
}

export async function updateProperty(id: number, property: Partial<Property>) {
  // Build dynamic query based on provided fields
  const fields = Object.keys(property).filter((key) => key !== "id")
  const values = fields.map((field) => property[field as keyof typeof property])

  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ")

  const query = `
    UPDATE properties
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `

  const result = await sql(query, [id, ...values])
  return result[0] as Property
}

export async function deleteProperty(id: number) {
  const query = `
    DELETE FROM properties
    WHERE id = $1
    RETURNING *
  `

  const result = await sql(query, [id])
  return result[0] as Property
}
