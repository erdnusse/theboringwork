"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

type MessageFilter = {
  status?: string
  search?: string
  page: number
  perPage: number
  sortBy: string
  sortDirection: "asc" | "desc"
}

export async function getContactMessages(filters: MessageFilter) {
  const { status, search, page = 1, perPage = 10, sortBy = "createdAt", sortDirection = "desc" } = filters

  // Build where clause
  const where: any = {}

  if (status) {
    where.status = status
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { subject: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ]
  }

  // Get total count
  const total = await prisma.contactMessage.count({ where })

  // Get messages with pagination
  const messages = await prisma.contactMessage.findMany({
    where,
    orderBy: {
      [sortBy]: sortDirection,
    },
    skip: (page - 1) * perPage,
    take: perPage,
  })

  return {
    messages,
    total,
  }
}

export async function updateMessageStatus(id: string, status: "NEW" | "READ" | "REPLIED" | "SPAM" | "ARCHIVED") {
  const message = await prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
  })

  revalidatePath("/dashboard/messages")
  return message
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  })

  revalidatePath("/dashboard/messages")
  return { success: true }
}

export async function updateMessageNotes(id: string, notes: string) {
  const message = await prisma.contactMessage.update({
    where: { id },
    data: {
      notes,
      updatedAt: new Date(),
    },
  })

  revalidatePath("/dashboard/messages")
  return message
}
