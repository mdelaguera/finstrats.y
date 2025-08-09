import "./globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar, SidebarProvider } from "@/components/sidebar" // Import AppSidebar and SidebarProvider
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import type React from "react"
import { cookies } from "next/headers" // Import cookies for persisted sidebar state

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Financial Dashboard",
  description: "A modern, responsive financial dashboard with YNAB integration and AI features",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const defaultSidebarOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <TooltipProvider delayDuration={0}>
              <SidebarProvider defaultOpen={defaultSidebarOpen}>
                <div className="min-h-screen flex">
                  <AppSidebar /> {/* Use AppSidebar here */}
                  <div className="flex-1 flex flex-col">
                    <TopNav />
                    <div className="flex-1 overflow-auto">
                      <main className="w-full">{children}</main>
                    </div>
                  </div>
                </div>
              </SidebarProvider>
            </TooltipProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
