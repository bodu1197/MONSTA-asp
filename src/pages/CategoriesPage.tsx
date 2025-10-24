import { Link } from 'react-router-dom'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold" style={{ color: '#0f3460' }}>돌파구</Link>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-blue-600">홈</Link>
            <Link to="/explore" className="hover:text-blue-600">탐색</Link>
            <Link to="/categories" className="text-blue-600 font-semibold">카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600">프로필</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">카테고리 페이지 - 다양한 서비스 카테고리</p>
        </div>
      </main>
    </div>
  )
}
