import { Search, Heart, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="header">
      <Link to="/" className="logo">돌파구</Link>

      <div className="search-bar">
        <Search className="search-icon" style={{ width: '18px', height: '18px' }} />
        <input
          type="search"
          placeholder="검색..."
        />
      </div>

      <div className="header-actions">
        <ThemeToggle />

        <button className="icon-btn">
          <Heart style={{ width: '22px', height: '22px' }} />
        </button>

        <button className="icon-btn">
          <Bell style={{ width: '22px', height: '22px' }} />
          <span className="badge">3</span>
        </button>

        {user ? (
          <Link to="/profile" className="user-avatar">
            {user.email?.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <Link to="/login" className="login-btn">
            로그인
          </Link>
        )}
      </div>
    </header>
  )
}
