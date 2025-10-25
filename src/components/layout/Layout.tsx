import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { RightSidebar } from './RightSidebar'
import { MobileNav } from './MobileNav'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <RightSidebar />
      <main className="flex-1 pb-14 lg:pb-0 lg:ml-64 xl:mr-80 min-w-0">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
