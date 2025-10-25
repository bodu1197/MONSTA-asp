import { Home, Search, PlusSquare, Bell, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '검색', href: '/search', icon: Search },
  { name: '만들기', href: '/post/create', icon: PlusSquare },
  { name: '알림', href: '/notifications', icon: Bell, badge: 3 },
  { name: '프로필', href: '/profile', icon: User },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon style={{ width: '26px', height: '26px' }} />
              {item.badge && <span className="nav-badge">{item.badge}</span>}
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
