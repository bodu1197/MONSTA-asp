import {
  Home, MessageCircle, Bell, User,
  Book, Calendar, Scissors, Sparkles, Target, Star, BookOpen, Scale,
  Hammer, GraduationCap, TrendingUp, Music, Languages, Bike, Briefcase,
  Pen, Camera, Megaphone, Palette, Bot, Code, Menu
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const mainNavigation = [
  // 홈 메뉴 제거 - 로고가 홈 역할
]

const categories = [
  { name: 'IT/프로그래밍', href: '/category/it-programming', icon: Code },
  { name: 'AI 서비스', href: '/category/ai-services', icon: Bot },
  { name: '디자인', href: '/category/design', icon: Palette },
  { name: '마케팅', href: '/category/marketing', icon: Megaphone },
  { name: '생활 서비스', href: '/category/life-service', icon: Home },
  { name: '영상/사진', href: '/category/video-photo', icon: Camera },
  { name: '문서/글쓰기', href: '/category/writing', icon: Pen },
  { name: '비즈니스', href: '/category/business', icon: Briefcase },
  { name: '심부름', href: '/category/errands', icon: Bike },
  { name: '번역/통역', href: '/category/translation', icon: Languages },
  { name: '음악/오디오', href: '/category/music-audio', icon: Music },
  { name: '직무역량', href: '/category/job-skills', icon: TrendingUp },
  { name: '취업/입시', href: '/category/career-admission', icon: GraduationCap },
  { name: '주문제작', href: '/category/custom-order', icon: Hammer },
  { name: '세무/법무/노무', href: '/category/tax-legal-labor', icon: Scale },
  { name: '전자책/템플릿', href: '/category/ebook-template', icon: BookOpen },
  { name: '운세/타로', href: '/category/fortune-tarot', icon: Star },
  { name: '상담/코칭', href: '/category/counseling-coaching', icon: Target },
  { name: '뷰티/패션', href: '/category/beauty-fashion', icon: Sparkles },
  { name: '취미/핸드메이드', href: '/category/hobby-handmade', icon: Scissors },
  { name: '이벤트', href: '/category/event', icon: Calendar },
  { name: '라이프스타일', href: '/category/lifestyle', icon: Book },
]

const myDolpaguLinks = [
  { name: '프로필', href: '/profile', icon: User },
  { name: '알림', href: '/notifications', icon: Bell },
  { name: '메시지', href: '/messages', icon: MessageCircle },
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
      <Link to="/" className="logo-section">
        <Home style={{ width: '28px', height: '28px' }} />
      </Link>
      <nav className="nav-menu">

        {/* 카테고리 메뉴 */}
        {categories.map((item) => {
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

        <div style={{ marginTop: 'auto' }}>
          {/* 마이 돌파구 */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="nav-item"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Menu style={{ width: '24px', height: '24px' }} />
            <span>마이 돌파구</span>
          </button>

          {showMoreMenu && (
            <div className="more-menu">
              {/* 프로필, 알림, 메시지 */}
              {myDolpaguLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="more-menu-item"
                  onClick={() => setShowMoreMenu(false)}
                >
                  <link.icon style={{ width: '20px', height: '20px', marginRight: '12px' }} />
                  {link.name}
                </Link>
              ))}
              <div className="nav-divider" style={{ margin: '8px 0' }}></div>
              {/* 기타 링크 */}
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
