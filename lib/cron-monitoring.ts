import prisma from "@/lib/prisma"

export interface TokenRefreshMetrics {
  totalAttempts: number
  successfulAttempts: number
  failedAttempts: number
  successRate: number
  avgExecutionTime: number
  lastSuccessfulRefresh?: Date
  lastFailedRefresh?: Date
}

export async function getTokenRefreshMetrics(hours = 24): Promise<TokenRefreshMetrics> {
  try {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    const stats = await prisma.tokenRefreshLog.aggregate({
      where: {
        timestamp: {
          gte: since,
        },
      },
      _count: {
        id: true,
      },
      _avg: {
        execution_time_ms: true,
      },
    })

    const successCount = await prisma.tokenRefreshLog.count({
      where: {
        timestamp: { gte: since },
        success: true,
      },
    })

    const failedCount = await prisma.tokenRefreshLog.count({
      where: {
        timestamp: { gte: since },
        success: false,
      },
    })

    const lastSuccessful = await prisma.tokenRefreshLog.findFirst({
      where: { success: true },
      orderBy: { timestamp: "desc" },
    })

    const lastFailed = await prisma.tokenRefreshLog.findFirst({
      where: { success: false },
      orderBy: { timestamp: "desc" },
    })

    const totalAttempts = stats._count.id || 0
    const successRate = totalAttempts > 0 ? (successCount / totalAttempts) * 100 : 0

    return {
      totalAttempts,
      successfulAttempts: successCount,
      failedAttempts: failedCount,
      successRate: Math.round(successRate * 100) / 100,
      avgExecutionTime: Math.round(stats._avg.execution_time_ms || 0),
      lastSuccessfulRefresh: lastSuccessful?.timestamp,
      lastFailedRefresh: lastFailed?.timestamp,
    }
  } catch (error) {
    console.error("Error getting token refresh metrics:", error)
    throw error
  }
}

export async function checkTokenRefreshHealth(): Promise<{
  healthy: boolean
  issues: string[]
  metrics: TokenRefreshMetrics
}> {
  const issues: string[] = []
  const metrics = await getTokenRefreshMetrics(24)

  // Check if there have been recent successful refreshes
  if (!metrics.lastSuccessfulRefresh || Date.now() - metrics.lastSuccessfulRefresh.getTime() > 2 * 60 * 60 * 1000) {
    issues.push("No successful token refresh in the last 2 hours")
  }

  // Check success rate
  if (metrics.successRate < 90 && metrics.totalAttempts > 5) {
    issues.push(`Low success rate: ${metrics.successRate}%`)
  }

  // Check for excessive execution time
  if (metrics.avgExecutionTime > 10000) {
    issues.push(`High average execution time: ${metrics.avgExecutionTime}ms`)
  }

  return {
    healthy: issues.length === 0,
    issues,
    metrics,
  }
}
