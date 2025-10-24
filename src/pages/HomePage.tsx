import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: '#0f3460' }}>돌파구</h1>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-blue-600">홈</Link>
            <Link to="/explore" className="hover:text-blue-600">탐색</Link>
            <Link to="/categories" className="hover:text-blue-600">카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600">프로필</Link>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700">로그아웃</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">환영합니다! 🎉</h2>
          <p className="text-gray-600 mb-6">순수 React SPA로 만든 돌파구입니다.</p>
          <p className="text-sm text-gray-500">로딩 속도가 매우 빠릅니다 ⚡</p>
        </div>
      </main>
    </div>
  )
}
