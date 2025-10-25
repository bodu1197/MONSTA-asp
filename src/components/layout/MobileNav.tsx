import { Home, Search, Compass, Play, PlusSquare } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '검색', href: '/search', icon: Search },
  { name: '탐색', href: '/explore', icon: Compass },
  { name: '릴스', href: '/reels', icon: Play },
  { name: '만들기', href: '/post/create', icon: PlusSquare },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 dark:bg-gray-800/95 dark:border-gray-700 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-14 px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors touch-manipulation no-tap-highlight',
                isActive
                  ? 'text-[#0f3460] dark:text-blue-400'
                  : 'text-muted-foreground dark:text-gray-400 active:text-foreground dark:active:text-gray-100'
              )}
            >
              <item.icon className={cn(
                "w-6 h-6",
                isActive && 'fill-[#0f3460] dark:fill-blue-400'
              )} />
              <span className="text-[10px] font-medium mt-0.5">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
