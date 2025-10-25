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
    <>
      <Header />
      <Sidebar />
      <RightSidebar />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      <MobileNav />
    </>
  )
}
