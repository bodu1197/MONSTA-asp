import { Home, Search, Compass, Play, MessageCircle, Bell, PlusSquare, User, Briefcase, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

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

const moreLinks = [
  { name: '서비스 소개', href: '/about' },
  { name: '이용약관', href: '/terms' },
  { name: '개인정보처리방침', href: '/privacy' },
  { name: '고객센터', href: '/support' },
  { name: '공지사항', href: '/announcements' },
]

export function Sidebar() {
  const location = useLocation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)

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

        <div style={{ marginTop: 'auto' }}>
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="nav-item"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Menu style={{ width: '24px', height: '24px' }} />
            <span>더보기</span>
          </button>

          {showMoreMenu && (
            <div className="more-menu">
              {moreLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="more-menu-item"
                  onClick={() => setShowMoreMenu(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="more-menu-footer">
                © 2025 돌파구
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}
