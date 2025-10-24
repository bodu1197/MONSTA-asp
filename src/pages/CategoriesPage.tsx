import { Search, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // TODO: 실제 데이터로 교체
  const [mainCategories] = useState<any[]>([])
  const [trendingCategories] = useState<any[]>([])

  const selectedCategoryData = selectedCategory
    ? mainCategories.find((c) => c.id === selectedCategory)
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold" style={{ color: '#0f3460' }}>돌파구</Link>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-blue-600">홈</Link>
            <Link to="/explore" className="hover:text-blue-600">탐색</Link>
            <Link to="/categories" className="font-semibold" style={{ color: '#0f3460' }}>카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600">프로필</Link>
          </nav>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Search Section */}
        <div className="mb-8 sm:mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search style={{ width: '20px', height: '20px' }} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="카테고리, 서비스를 검색하세요..."
              className="pl-12 h-12 text-base rounded-full border-2 focus:border-primary"
            />
          </div>
        </div>

        {/* Trending Section */}
        {trendingCategories.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <TrendingUp style={{ width: '24px', height: '24px' }} className="text-primary sm:w-7 sm:h-7" />
              <h2 className="text-xl sm:text-2xl font-bold">트렌딩</h2>
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingCategories.map((category) => (
                <Link key={category.name} to={`/search?q=${category.name}`}>
                  <Card className="p-4 sm:p-6 min-w-[240px] sm:min-w-[280px] hover:shadow-lg transition cursor-pointer border-2 hover:border-primary">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        {category.growth}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.count.toLocaleString()}개 서비스
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Detail View */}
        {selectedCategoryData ? (
          <section>
            <div className="mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline mb-4"
              >
                ← 전체 카테고리로 돌아가기
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedCategoryData.name}</h2>
              <p className="text-muted-foreground">
                {selectedCategoryData.count}개의 하위 카테고리
              </p>
            </div>

            {selectedCategoryData.children && selectedCategoryData.children.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategoryData.children.map((child: any) => (
                  <Link key={child.id} to={`/search?category=${child.slug}`}>
                    <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-primary group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">
                            {child.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {child.service_count || 0}개 서비스
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                하위 카테고리가 없습니다.
              </div>
            )}
          </section>
        ) : (
          /* All Categories Grid */
          <section>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">모든 카테고리</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                다양한 서비스 카테고리를 탐색하세요
              </p>
            </div>

            {mainCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full text-left"
                  >
                    <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-primary group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.count}개 하위 카테고리
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {category.count}
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg mb-2">카테고리가 아직 없습니다</p>
                <p className="text-sm">곧 다양한 카테고리가 추가될 예정입니다!</p>
              </div>
            )}
          </section>
        )}

        {/* Stats */}
        <section className="mt-12 sm:mt-16 text-center">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                0
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">전체 카테고리</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                0
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">대분류</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                0
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">크리에이터</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
