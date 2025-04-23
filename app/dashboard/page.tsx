"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Building,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 md:mr-4">
          <Building className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">EstateElite</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Input type="search" placeholder="Search..." className="w-full bg-muted/30 sm:w-64 md:w-80 lg:w-96" />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <span className="hidden sm:inline-block">My Account</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r bg-muted/40 sm:flex">
          <nav className="grid gap-2 px-4 py-6">
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeTab === "overview" ? "bg-muted" : "hover:bg-muted"
              } transition-all`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeTab === "properties" ? "bg-muted" : "hover:bg-muted"
              } transition-all`}
              onClick={() => setActiveTab("properties")}
            >
              <Home className="h-4 w-4" />
              Properties
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeTab === "clients" ? "bg-muted" : "hover:bg-muted"
              } transition-all`}
              onClick={() => setActiveTab("clients")}
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeTab === "messages" ? "bg-muted" : "hover:bg-muted"
              } transition-all`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                activeTab === "settings" ? "bg-muted" : "hover:bg-muted"
              } transition-all`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs defaultValue="overview" className="h-full space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
                  Overview
                </TabsTrigger>
                <TabsTrigger value="properties" onClick={() => setActiveTab("properties")}>
                  Properties
                </TabsTrigger>
                <TabsTrigger value="clients" onClick={() => setActiveTab("clients")}>
                  Clients
                </TabsTrigger>
                <TabsTrigger value="messages" onClick={() => setActiveTab("messages")}>
                  Messages
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>
            </div>
            <TabsContent value="overview" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">16</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">+8 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+3 since yesterday</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Properties</CardTitle>
                    <CardDescription>You have added 2 properties this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src="/placeholder.svg?height=64&width=64&query=modern apartment"
                              alt="Modern Downtown Apartment"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Modern Downtown Apartment</div>
                            <div className="text-sm text-muted-foreground">$450,000</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src="/placeholder.svg?height=64&width=64&query=luxury villa"
                              alt="Luxury Waterfront Villa"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Luxury Waterfront Villa</div>
                            <div className="text-sm text-muted-foreground">$1,250,000</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src="/placeholder.svg?height=64&width=64&query=suburban home"
                              alt="Cozy Suburban Home"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Cozy Suburban Home</div>
                            <div className="text-sm text-muted-foreground">$650,000</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src="/placeholder.svg?height=64&width=64&query=urban loft"
                              alt="Urban Loft Space"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">Urban Loft Space</div>
                            <div className="text-sm text-muted-foreground">$525,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Properties
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions and notifications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div>
                          <div className="font-medium">New client inquiry</div>
                          <div className="text-sm text-muted-foreground">10 minutes ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div>
                          <div className="font-medium">Property listing updated</div>
                          <div className="text-sm text-muted-foreground">1 hour ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div>
                          <div className="font-medium">Viewing scheduled</div>
                          <div className="text-sm text-muted-foreground">3 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div>
                          <div className="font-medium">New property added</div>
                          <div className="text-sm text-muted-foreground">Yesterday</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div>
                          <div className="font-medium">Client message received</div>
                          <div className="text-sm text-muted-foreground">Yesterday</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="properties" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <div className="border rounded-md">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Your Properties</h3>
                    <Input placeholder="Search properties..." className="max-w-xs" />
                  </div>
                  <div className="overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Property</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Price</th>
                          <th className="text-left p-2">Views</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=40&width=40&query=modern apartment"
                                  alt="Modern Downtown Apartment"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>Modern Downtown Apartment</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Active
                            </div>
                          </td>
                          <td className="p-2">$450,000</td>
                          <td className="p-2">245</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=40&width=40&query=luxury villa"
                                  alt="Luxury Waterfront Villa"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>Luxury Waterfront Villa</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Active
                            </div>
                          </td>
                          <td className="p-2">$1,250,000</td>
                          <td className="p-2">189</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=40&width=40&query=suburban home"
                                  alt="Cozy Suburban Home"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>Cozy Suburban Home</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                              Pending
                            </div>
                          </td>
                          <td className="p-2">$650,000</td>
                          <td className="p-2">312</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=40&width=40&query=urban loft"
                                  alt="Urban Loft Space"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>Urban Loft Space</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              Active
                            </div>
                          </td>
                          <td className="p-2">$525,000</td>
                          <td className="p-2">178</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=40&width=40&query=family home"
                                  alt="Family Home with Pool"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div>Family Home with Pool</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                              Sold
                            </div>
                          </td>
                          <td className="p-2">$780,000</td>
                          <td className="p-2">423</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
