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
      <main className="main-content">
        <div className="content-wrapper">
          {children}
          <RightSidebar />
        </div>
      </main>
      <MobileNav />
    </>
  )
}
