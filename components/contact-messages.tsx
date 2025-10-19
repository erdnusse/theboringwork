"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Archive,
  Check,
  Eye,
  Inbox,
  Loader2,
  Mail,
  MailOpen,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { getContactMessages, updateMessageStatus, deleteMessage } from "@/actions/message-actions"

import { useTranslation } from "@/hooks/use-translation";

// Initialize dayjs plugins
dayjs.extend(relativeTime)

type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "NEW" | "READ" | "REPLIED" | "SPAM" | "ARCHIVED"
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

type MessageFilter = {
  status?: string
  search?: string
  page: number
  perPage: number
  sortBy: string
  sortDirection: "asc" | "desc"
}

export function ContactMessages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation();

  // State
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [loading, setLoading] = useState(true)
  const [totalMessages, setTotalMessages] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<MessageFilter>({
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
    page: Number.parseInt(searchParams.get("page") || "1"),
    perPage: Number.parseInt(searchParams.get("perPage") || "10"),
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortDirection: (searchParams.get("sortDirection") as "asc" | "desc") || "desc",
  })
  const [activeTab, setActiveTab] = useState(filters.status || "all")
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Load messages
  useEffect(() => {
    loadMessages()
    // Update URL with filters
    const params = new URLSearchParams()
    if (filters.status) params.set("status", filters.status)
    if (filters.search) params.set("search", filters.search)
    params.set("page", filters.page.toString())
    params.set("perPage", filters.perPage.toString())
    params.set("sortBy", filters.sortBy)
    params.set("sortDirection", filters.sortDirection)

    router.push(`/dashboard/messages?${params.toString()}`, { scroll: false })
  }, [filters])

  async function loadMessages() {
    setLoading(true)
    try {
      const result = await getContactMessages(filters)
      setMessages(result.messages)
      setTotalMessages(result.total)
      setTotalPages(Math.ceil(result.total / filters.perPage))
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle status change
  async function handleStatusChange(id: string, status: "NEW" | "READ" | "REPLIED" | "SPAM" | "ARCHIVED") {
    setActionLoading(id)
    try {
      await updateMessageStatus(id, status)
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status } : msg)))
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status })
      }
    } catch (error) {
      console.error("Failed to update message status:", error)
    } finally {
      setActionLoading(null)
    }
  }

  // Handle message deletion
  async function handleDeleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      return
    }

    setActionLoading(id)
    try {
      await deleteMessage(id)
      setMessages(messages.filter((msg) => msg.id !== id))
      if (selectedMessage?.id === id) {
        setIsDetailOpen(false)
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error("Failed to delete message:", error)
    } finally {
      setActionLoading(null)
    }
  }

  // View message details
  function viewMessageDetails(message: ContactMessage) {
    setSelectedMessage(message)
    setIsDetailOpen(true)

    // Mark as read if it's new
    if (message.status === "NEW") {
      handleStatusChange(message.id, "READ")
    }
  }

  // Handle tab change
  function handleTabChange(value: string) {
    setActiveTab(value)
    setFilters({
      ...filters,
      status: value === "all" ? undefined : value,
      page: 1,
    })
  }

  // Handle search
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get("search") as string

    setFilters({
      ...filters,
      search: search || undefined,
      page: 1,
    })
  }

  // Handle sort change
  function handleSortChange(value: string) {
    const [sortBy, sortDirection] = value.split("-")
    setFilters({
      ...filters,
      sortBy,
      sortDirection: sortDirection as "asc" | "desc",
      page: 1,
    })
  }

  // Handle page change
  function handlePageChange(page: number) {
    setFilters({
      ...filters,
      page,
    })
  }

  // Get status badge
  function getStatusBadge(status: string) {
    switch (status) {
      case "NEW":
        return <Badge variant="default">{t("contact_messages_status_new")}</Badge>;
      case "READ":
        return <Badge variant="secondary">{t("contact_messages_status_read")}</Badge>;
      case "REPLIED":
        return <Badge variant="success">{t("contact_messages_status_replied")}</Badge>;
      case "SPAM":
        return <Badge variant="destructive">{t("contact_messages_status_spam")}</Badge>;
      case "ARCHIVED":
        return <Badge variant="outline">{t("contact_messages_status_archived")}</Badge>;
      default:
        return null;
    }
  }

  // Format date with dayjs
  function formatRelativeTime(date: Date) {
    return dayjs(date).fromNow()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{t("contact_messages_title")}</CardTitle>
              <CardDescription>{t("contact_messages_description")}{totalMessages}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => loadMessages()} disabled={loading}>
                <RefreshCcw className="h-4 w-4 mr-1" />
                {t("contact_messages_refresh")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 border-b gap-4">
              <TabsList>
                <TabsTrigger value="all">{t("contact_messages_tab_all")}</TabsTrigger>
                <TabsTrigger value="NEW">{t("contact_messages_tab_new")}</TabsTrigger>
                <TabsTrigger value="READ">{t("contact_messages_tab_read")}</TabsTrigger>
                <TabsTrigger value="REPLIED">{t("contact_messages_tab_replied")}</TabsTrigger>
                <TabsTrigger value="SPAM">{t("contact_messages_tab_spam")}</TabsTrigger>
                <TabsTrigger value="ARCHIVED">{t("contact_messages_tab_archived")}</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="search"
                    placeholder={t("contact_messages_search_placeholder")}
                    className="w-full pl-8 sm:w-[200px] md:w-[300px]"
                    defaultValue={filters.search || ""}
                  />
                </form>

                <Select value={`${filters.sortBy}-${filters.sortDirection}`} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder={t("contact_messages_sort_by")}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt-desc">{t("contact_messages_sort_created_desc")}</SelectItem>
                    <SelectItem value="createdAt-asc">{t("contact_messages_sort_created_asc")}</SelectItem>
                    <SelectItem value="name-asc">{t("contact_messages_sort_name_asc")}</SelectItem>
                    <SelectItem value="name-desc">{t("contact_messages_sort_name_desc")}</SelectItem>
                    <SelectItem value="subject-asc">{t("contact_messages_sort_subject_asc")}</SelectItem>
                    <SelectItem value="subject-desc">{t("contact_messages_sort_subject_desc")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="m-0">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">{t("contact_messages_no_found")}</h3>
                  <p className="text-muted-foreground mt-1">
                    {filters.search
                      ? t("contact_messages_no_found_search")
                      : t("contact_messages_no_found_category")}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">{t("contact_messages_table_name")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("contact_messages_table_subject")}</TableHead>
                      <TableHead className="hidden lg:table-cell">{t("contact_messages_table_email")}</TableHead>
                      <TableHead className="hidden sm:table-cell w-[120px]">{t("contact_messages_table_date")}</TableHead>
                      <TableHead className="w-[100px]">{t("contact_messages_table_status")}</TableHead>
                      <TableHead className="w-[100px] text-right">{t("contact_messages_table_actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow
                        key={message.id}
                        className={message.status === "NEW" ? "font-medium bg-primary-50" : ""}
                      >
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">{message.subject}</TableCell>
                        <TableCell className="hidden lg:table-cell">{message.email}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {formatRelativeTime(new Date(message.createdAt))}
                        </TableCell>
                        <TableCell>{getStatusBadge(message.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => viewMessageDetails(message)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">{t("contact_messages_action_view")}</span>
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{t("contact_messages_table_actions")}</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {message.status !== "READ" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusChange(message.id, "READ")}
                                    disabled={actionLoading === message.id}
                                  >
                                    <MailOpen className="h-4 w-4 mr-2" />
                                    {t("contact_messages_action_mark_read")}
                                  </DropdownMenuItem>
                                )}

                                {message.status !== "NEW" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusChange(message.id, "NEW")}
                                    disabled={actionLoading === message.id}
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    {t("contact_messages_action_mark_unread")}
                                  </DropdownMenuItem>
                                )}

                                {message.status !== "REPLIED" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusChange(message.id, "REPLIED")}
                                    disabled={actionLoading === message.id}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    {t("contact_messages_action_mark_replied")}
                                  </DropdownMenuItem>
                                )}

                                {message.status !== "ARCHIVED" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusChange(message.id, "ARCHIVED")}
                                    disabled={actionLoading === message.id}
                                  >
                                    <Archive className="h-4 w-4 mr-2" />
                                    {t("contact_messages_action_archive")}
                                  </DropdownMenuItem>
                                )}

                                {message.status === "ARCHIVED" && (
                                  <DropdownMenuItem
                                    onClick={() => handleStatusChange(message.id, "READ")}
                                    disabled={actionLoading === message.id}
                                  >
                                    <Inbox className="h-4 w-4 mr-2" />
                                    {t("contact_messages_action_unarchive")}
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteMessage(message.id)}
                                  disabled={actionLoading === message.id}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t("contact_messages_action_delete")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>

        {!loading && messages.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              {`${t("contact_messages_showing")} ${(filters.page - 1) * filters.perPage + 1}-${Math.min(
                filters.page * filters.perPage,
                totalMessages
              )} ${totalMessages}`}
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
                    className={filters.page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number

                  // Logic to show pages around current page
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (filters.page <= 3) {
                    pageNum = i + 1
                  } else if (filters.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = filters.page - 2 + i
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink onClick={() => handlePageChange(pageNum)} isActive={pageNum === filters.page}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && filters.page < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, filters.page + 1))}
                    className={filters.page >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              {t("contact_messages_detail_from")} {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {selectedMessage && getStatusBadge(selectedMessage.status)}
                <span className="text-muted-foreground">
                  {selectedMessage && formatRelativeTime(new Date(selectedMessage.createdAt))}
                </span>
              </div>
            </div>

            <div className="border rounded-md p-4 whitespace-pre-wrap">{selectedMessage?.message}</div>

            {selectedMessage?.notes && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-1">{t("contact_messages_detail_admin_notes")}</h4>
                <p className="text-sm text-muted-foreground">{selectedMessage.notes}</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              {selectedMessage?.status !== "REPLIED" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedMessage && handleStatusChange(selectedMessage.id, "REPLIED")}
                  disabled={actionLoading === selectedMessage?.id}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Replied
                </Button>
              )}

              {selectedMessage?.status !== "ARCHIVED" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedMessage && handleStatusChange(selectedMessage.id, "ARCHIVED")}
                  disabled={actionLoading === selectedMessage?.id}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                {t("contact_messages_detail_close")}
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  // Open email client with pre-filled details
                  if (selectedMessage) {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`
                  }
                }}
              >
                {t("contact_messages_detail_reply_email")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
