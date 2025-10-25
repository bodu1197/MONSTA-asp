import { Home, Search, Compass, Play, PlusSquare } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

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
    <nav className="mobile-nav">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon style={{ width: '24px', height: '24px' }} />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
