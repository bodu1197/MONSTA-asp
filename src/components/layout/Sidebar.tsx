import { Home, Search, Compass, Play, MessageCircle, Bell, PlusSquare, User, Briefcase } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '검색', href: '/search', icon: Search },
  { name: '탐색', href: '/explore', icon: Compass },
  { name: '릴스', href: '/reels', icon: Play },
  { name: '메시지', href: '/messages', icon: MessageCircle },
  { name: '알림', href: '/notifications', icon: Bell },
  { name: '만들기', href: '/post/create', icon: PlusSquare },
  { name: '프로필', href: '/profile', icon: User },
  { name: '카테고리', href: '/categories', icon: Briefcase },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <h1>돌파구</h1>
      </div>
      <nav className="nav-menu">
        {navigation.slice(0, -1).map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon style={{ width: '24px', height: '24px' }} />
              <span>{item.name}</span>
            </Link>
          )
        })}
        <div className="nav-divider"></div>
        {(() => {
          const categoryItem = navigation[8]
          const CategoryIcon = categoryItem.icon
          return (
            <Link
              to={categoryItem.href}
              className={`nav-item ${location.pathname === categoryItem.href ? 'active' : ''}`}
            >
              <CategoryIcon style={{ width: '24px', height: '24px' }} />
              <span>{categoryItem.name}</span>
            </Link>
          )
        })()}
      </nav>
    </aside>
  )
}
