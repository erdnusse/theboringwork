import { sql } from "@/lib/db"

export type Agent = {
  id: number
  name: string
  email: string
  phone: string
  bio: string
  image_url: string
  created_at: string
}

export async function getAgents(limit = 10, offset = 0, search = "") {
  const query = `
    SELECT * FROM agents
    WHERE name ILIKE $1 OR email ILIKE $1
    ORDER BY name ASC
    LIMIT $2 OFFSET $3
  `

  const agents = await sql(query, [`%${search}%`, limit, offset])
  return agents as Agent[]
}

export async function getAgentById(id: number) {
  const query = `
    SELECT * FROM agents
    WHERE id = $1
  `

  const agents = await sql(query, [id])
  return agents[0] as Agent | undefined
}

export async function createAgent(agent: Omit<Agent, "id" | "created_at">) {
  const query = `
    INSERT INTO agents (name, email, phone, bio, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `

  const result = await sql(query, [agent.name, agent.email, agent.phone, agent.bio, agent.image_url])

  return result[0] as Agent
}

export async function updateAgent(id: number, agent: Partial<Agent>) {
  // Build dynamic query based on provided fields
  const fields = Object.keys(agent).filter((key) => key !== "id")
  const values = fields.map((field) => agent[field as keyof typeof agent])

  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ")

  const query = `
    UPDATE agents
    SET ${setClause}
    WHERE id = $1
    RETURNING *
  `

  const result = await sql(query, [id, ...values])
  return result[0] as Agent
}

export async function deleteAgent(id: number) {
  const query = `
    DELETE FROM agents
    WHERE id = $1
    RETURNING *
  `

  const result = await sql(query, [id])
  return result[0] as Agent
}

export async function getAgentProperties(agentId: number) {
  const query = `
    SELECT p.* FROM properties p
    JOIN property_agents pa ON p.id = pa.property_id
    WHERE pa.agent_id = $1
    ORDER BY p.created_at DESC
  `

  const properties = await sql(query, [agentId])
  return properties
}
