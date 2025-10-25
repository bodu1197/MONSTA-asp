import { Search } from 'lucide-react'
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
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>돌파구</h1>
        </Link>

        <div className="search-container">
          <Search style={{ width: '20px', height: '20px' }} className="search-icon" />
          <input
            type="search"
            placeholder="검색..."
            className="search-bar"
          />
        </div>

        <div className="header-actions">
          <ThemeToggle />
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
      </div>
    </header>
  )
}
