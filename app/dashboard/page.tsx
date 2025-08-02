"use client"
import { useState } from "react"
import { BarChart3, Briefcase, FileText, MessageSquare, PieChart, Plus, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects" onClick={() => setActiveTab("projects")}>
            Projects
          </TabsTrigger>
          <TabsTrigger value="clients" onClick={() => setActiveTab("clients")}>
            Clients
          </TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>
            Reports
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      <TabsContent value="overview" className="h-full flex-col border-none p-0 data-[state=active]:flex">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">-3 from last week</p>
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
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>You have 12 active projects this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">TechCorp Strategy Overhaul</div>
                      <div className="text-sm text-muted-foreground">Strategic Planning</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-primary/10 flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">GlobalManufacturing Optimization</div>
                      <div className="text-sm text-muted-foreground">Operational Excellence</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-primary/10 flex items-center justify-center">
                      <Settings className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">FinServe Digital Transformation</div>
                      <div className="text-sm text-muted-foreground">Digital Transformation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">RetailGiant Talent Strategy</div>
                      <div className="text-sm text-muted-foreground">Organizational Development</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Projects
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
                    <div className="font-medium">New client inquiry from TechStart Inc.</div>
                    <div className="text-sm text-muted-foreground">10 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium">Project milestone completed: TechCorp</div>
                    <div className="text-sm text-muted-foreground">1 hour ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div>
                    <div className="font-medium">Meeting scheduled: GlobalManufacturing</div>
                    <div className="text-sm text-muted-foreground">3 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium">New project proposal submitted</div>
                    <div className="text-sm text-muted-foreground">Yesterday</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium">Client feedback received: FinServe</div>
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
      <TabsContent value="projects" className="h-full flex-col border-none p-0 data-[state=active]:flex">
        <div className="border rounded-md">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Projects</h3>
              <Input placeholder="Search projects..." className="max-w-xs" />
            </div>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Project</th>
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Deadline</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>TechCorp Strategy Overhaul</div>
                      </div>
                    </td>
                    <td className="p-2">TechCorp Inc.</td>
                    <td className="p-2">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        In Progress
                      </div>
                    </td>
                    <td className="p-2">Dec 15, 2023</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden bg-primary/10 flex items-center justify-center">
                          <PieChart className="h-5 w-5 text-primary" />
                        </div>
                        <div>GlobalManufacturing Optimization</div>
                      </div>
                    </td>
                    <td className="p-2">Global Manufacturing Ltd.</td>
                    <td className="p-2">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        In Progress
                      </div>
                    </td>
                    <td className="p-2">Jan 30, 2024</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden bg-primary/10 flex items-center justify-center">
                          <Settings className="h-5 w-5 text-primary" />
                        </div>
                        <div>FinServe Digital Transformation</div>
                      </div>
                    </td>
                    <td className="p-2">Financial Services Inc.</td>
                    <td className="p-2">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                        Planning
                      </div>
                    </td>
                    <td className="p-2">Mar 15, 2024</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>RetailGiant Talent Strategy</div>
                      </div>
                    </td>
                    <td className="p-2">RetailGiant Corp.</td>
                    <td className="p-2">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                        Completed
                      </div>
                    </td>
                    <td className="p-2">Nov 30, 2023</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        View
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
  )
}
