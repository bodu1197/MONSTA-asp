import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: '#0f3460' }}>
          돌파구
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          {isSignUp ? '새로운 계정을 만드세요' : '계정에 로그인하세요'}
        </p>

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">이메일</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
              {success}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ backgroundColor: '#0f3460' }}
          >
            {loading ? (isSignUp ? '가입 중...' : '로그인 중...') : (isSignUp ? '회원가입' : '로그인')}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-11"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google로 계속하기</span>
          </Button>

          <Button
            type="button"
            onClick={handleKakaoLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 h-11 bg-[#FEE500] hover:bg-[#FEE500]/90 border-[#FEE500] text-[#000000]/85"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 3C6.486 3 2 6.262 2 10.273c0 2.62 1.767 4.917 4.438 6.23-.19.697-.66 2.428-.757 2.814-.11.461.164.455.353.33.142-.094 2.273-1.525 3.155-2.117.598.084 1.211.127 1.811.127 5.514 0 10-3.262 10-7.273C22 6.262 17.514 3 12 3z"/>
            </svg>
            <span>카카오로 계속하기</span>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
              setSuccess('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            }}
            className="text-sm hover:underline"
            style={{ color: '#0f3460' }}
          >
            {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
          </button>
        </div>
      </Card>
    </div>
  )
}
