import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Moon, Sun } from 'lucide-react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('login-theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('login-theme', newTheme)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('회원가입이 완료되었습니다! 이메일을 확인해주세요.')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setIsSignUp(false)
      }, 2000)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  const handleKakaoLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  const isDark = theme === 'dark'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        background: isDark
          ? 'linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)'
          : 'linear-gradient(135deg, #e8f0ff 0%, #f5f9ff 100%)',
        transition: 'background 0.3s ease',
      }}
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

        .login-page * {
          font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif;
        }

        .login-container {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .login-container {
            max-width: 100% !important;
            padding: 32px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 28px 20px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: isDark ? 'rgba(30, 45, 65, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${isDark ? 'rgba(100, 150, 200, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
          borderRadius: '50px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          color: isDark ? '#e8f0ff' : '#1a2332',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        {isDark ? <Moon size={20} /> : <Sun size={20} />}
        <span style={{ fontSize: '13px', fontWeight: 500 }}>
          {isDark ? '다크 모드' : '라이트 모드'}
        </span>
      </button>

      {/* Login Container */}
      <div
        className="login-container login-page"
        style={{
          background: isDark ? 'rgba(30, 45, 65, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: `1px solid ${isDark ? 'rgba(100, 150, 200, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
          boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '420px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = isDark
            ? '0 12px 40px rgba(0, 0, 0, 0.5)'
            : '0 12px 40px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <h1 style={{
            color: '#5b9aff',
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            margin: 0,
          }}>
            돌파구
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          color: isDark ? '#a0b4cc' : '#5a6c7d',
          fontSize: '14px',
          marginBottom: '36px',
        }}>
          {isSignUp ? '새로운 계정을 만드세요' : '계정에 로그인하세요'}
        </p>

        {/* Form */}
        <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: isDark ? '#e8f0ff' : '#1a2332',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px',
            }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '8px',
                color: isDark ? '#e8f0ff' : '#1a2332',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#5b9aff'
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(91, 154, 255, 0.05)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 154, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: isDark ? '#e8f0ff' : '#1a2332',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px',
            }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '8px',
                color: isDark ? '#e8f0ff' : '#1a2332',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#5b9aff'
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(91, 154, 255, 0.05)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 154, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {isSignUp && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: isDark ? '#e8f0ff' : '#1a2332',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
              }}>
                비밀번호 확인
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '8px',
                  color: isDark ? '#e8f0ff' : '#1a2332',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#5b9aff'
                  e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(91, 154, 255, 0.05)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 154, 255, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>
          )}

          {error && (
            <div style={{
              color: '#dc2626',
              fontSize: '14px',
              background: '#fef2f2',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #fecaca',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              color: '#16a34a',
              fontSize: '14px',
              background: '#f0fdf4',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
              marginBottom: '16px',
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #4a7fc9 0%, #5b9aff 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(91, 154, 255, 0.3)',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #5b9aff 0%, #6aa8ff 100%)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(91, 154, 255, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4a7fc9 0%, #5b9aff 100%)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(91, 154, 255, 0.3)'
            }}
          >
            {loading ? (isSignUp ? '가입 중...' : '로그인 중...') : (isSignUp ? '회원가입' : '로그인')}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '32px 0',
          color: isDark ? '#a0b4cc' : '#5a6c7d',
          fontSize: '14px',
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}></div>
          <span style={{
            padding: '0 16px',
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: '12px',
            padding: '4px 12px',
          }}>또는</span>
          <div style={{
            flex: 1,
            height: '1px',
            background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}></div>
        </div>

        {/* Social Login */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '14px',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`,
              borderRadius: '8px',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              color: isDark ? '#e8f0ff' : '#1a2332',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(91, 154, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
              e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google 계정으로 로그인
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #fee500',
              borderRadius: '8px',
              background: '#fee500',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffd900'
              e.currentTarget.style.borderColor = '#ffd900'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fee500'
              e.currentTarget.style.borderColor = '#fee500'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 208 191" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M104 0C46.562 0 0 36.793 0 82.188c0 29.454 19.737 55.297 49.453 69.729-1.976 7.177-12.664 45.966-14.52 52.828-2.275 8.407 3.103 8.407 6.516 6.104 2.758-1.862 44.466-30.62 51.775-36.138 3.758.517 7.62.787 11.572.787 57.438 0 104-36.793 104-82.188C208 36.793 161.438 0 104 0z"/>
            </svg>
            카카오로 계속하기
          </button>
        </div>

        {/* Sign up link */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: isDark ? '#e8f0ff' : '#1a2332',
        }}>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setSuccess('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#5b9aff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#7bb0ff'
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#5b9aff'
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>
        </div>
      </div>
    </div>
  )
}
