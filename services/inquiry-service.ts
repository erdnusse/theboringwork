import { sql } from "@/lib/db"

export type Inquiry = {
  id: number
  property_id: number | null
  user_id: string | null
  name: string
  email: string
  phone: string | null
  message: string
  status: string
  created_at: string
}

export async function createInquiry(inquiry: Omit<Inquiry, "id" | "created_at" | "status">) {
  const query = `
    INSERT INTO inquiries (property_id, user_id, name, email, phone, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `

  const result = await sql(query, [
    inquiry.property_id,
    inquiry.user_id,
    inquiry.name,
    inquiry.email,
    inquiry.phone,
    inquiry.message,
  ])

  return result[0] as Inquiry
}

export async function getInquiries(limit = 10, offset = 0, status = "") {
  let query = `
    SELECT * FROM inquiries
    WHERE 1=1
  `

  const params: any[] = []

  if (status) {
    query += ` AND status = $${params.length + 1}`
    params.push(status)
  }

  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
  params.push(limit, offset)

  const inquiries = await sql(query, params)
  return inquiries as Inquiry[]
}

export async function getInquiryById(id: number) {
  const query = `
    SELECT * FROM inquiries
    WHERE id = $1
  `

  const inquiries = await sql(query, [id])
  return inquiries[0] as Inquiry | undefined
}

export async function updateInquiryStatus(id: number, status: string) {
  const query = `
    UPDATE inquiries
    SET status = $2
    WHERE id = $1
    RETURNING *
  `

  const result = await sql(query, [id, status])
  return result[0] as Inquiry
}

export async function getInquiriesByPropertyId(propertyId: number) {
  const query = `
    SELECT * FROM inquiries
    WHERE property_id = $1
    ORDER BY created_at DESC
  `

  const inquiries = await sql(query, [propertyId])
  return inquiries as Inquiry[]
}

export async function getInquiriesByUserId(userId: string) {
  const query = `
    SELECT * FROM inquiries
    WHERE user_id = $1
    ORDER BY created_at DESC
  `

  const inquiries = await sql(query, [userId])
  return inquiries as Inquiry[]
}
