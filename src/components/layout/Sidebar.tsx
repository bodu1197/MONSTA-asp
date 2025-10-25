import {
  Home,
  Book, Calendar, Scissors, Sparkles, Target, Star, BookOpen, Scale,
  Hammer, GraduationCap, TrendingUp, Music, Languages, Bike, Briefcase,
  Pen, Camera, Megaphone, Palette, Bot, Code
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const categories = [
  { name: 'AI 서비스', href: '/category/ai-services', icon: Bot },
  { name: '생활 서비스', href: '/category/life-service', icon: Home },
  { name: '심부름', href: '/category/errands', icon: Bike },
  { name: 'IT/프로그래밍', href: '/category/it-programming', icon: Code },
  { name: '디자인', href: '/category/design', icon: Palette },
  { name: '마케팅', href: '/category/marketing', icon: Megaphone },
  { name: '영상/사진', href: '/category/video-photo', icon: Camera },
  { name: '문서/글쓰기', href: '/category/writing', icon: Pen },
  { name: '비즈니스', href: '/category/business', icon: Briefcase },
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


export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <Link to="/" className="logo-section">
        <Home style={{ width: '28px', height: '28px' }} />
        <span>돌파구</span>
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
      </nav>
    </aside>
  )
}
