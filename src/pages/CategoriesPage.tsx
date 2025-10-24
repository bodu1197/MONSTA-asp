import { Search, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { ThemeToggle } from '../components/ThemeToggle'
import { supabase } from '../lib/supabase'

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const [
        { data: allCategoriesData },
        { count: usersCount },
      ] = await Promise.all([
        supabase
          .from("categories")
          .select(`
            id,
            name,
            slug,
            service_count,
            is_popular,
            parent_id,
            display_order
          `)
          .order("display_order", { ascending: true }),
        supabase
          .from("users")
          .select("*", { count: "exact", head: true }),
      ])

      setAllCategories(allCategoriesData || [])
      setTotalUsers(usersCount || 0)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-[#0f3460] dark:text-blue-400">돌파구</Link>
            <nav className="flex gap-6 items-center">
              <Link to="/" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">홈</Link>
              <Link to="/explore" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">탐색</Link>
              <Link to="/categories" className="font-semibold text-[#0f3460] dark:text-blue-400">카테고리</Link>
              <Link to="/profile" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">프로필</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            로딩 중...
          </div>
        </div>
      </div>
    )
  }

  const parentCategories = allCategories.filter((cat) => cat.parent_id === null) || []
  const childCategories = allCategories.filter((cat) => cat.parent_id !== null) || []

  const childCountMap = childCategories.reduce((acc: { [key: string]: number }, child: any) => {
    acc[child.parent_id] = (acc[child.parent_id] || 0) + 1
    return acc
  }, {})

  const mainCategories = parentCategories.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    count: childCountMap[category.id] || 0,
    children: childCategories.filter((c: any) => c.parent_id === category.id),
  }))

  const trendingCategories = allCategories
    .filter((cat: any) => cat.is_popular && cat.parent_id === null)
    .sort((a: any, b: any) => (b.service_count || 0) - (a.service_count || 0))
    .slice(0, 4)
    .map((cat: any) => ({
      name: cat.name,
      count: cat.service_count || 0,
      growth: "+0%",
    })) || []

  const totalCategories = allCategories.length || 0
  const totalParentCategories = parentCategories.length

  const selectedCategoryData = selectedCategory
    ? mainCategories.find((c) => c.id === selectedCategory)
    : null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#0f3460] dark:text-blue-400">돌파구</Link>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">홈</Link>
            <Link to="/explore" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">탐색</Link>
            <Link to="/categories" className="font-semibold text-[#0f3460] dark:text-blue-400">카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">프로필</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Search Section */}
        <div className="mb-8 sm:mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search style={{ width: '20px', height: '20px' }} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="카테고리, 서비스를 검색하세요..."
              className="pl-12 h-12 text-base rounded-full border-2 focus:border-[#0f3460] dark:focus:border-blue-400"
            />
          </div>
        </div>

        {/* Trending Section */}
        {trendingCategories.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <TrendingUp style={{ width: '24px', height: '24px' }} className="text-[#0f3460] dark:text-blue-400 sm:w-7 sm:h-7" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">트렌딩</h2>
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingCategories.map((category) => (
                <Link key={category.name} to={`/search?q=${category.name}`}>
                  <Card className="p-4 sm:p-6 min-w-[240px] sm:min-w-[280px] hover:shadow-lg transition cursor-pointer border-2 hover:border-[#0f3460] dark:hover:border-blue-400 bg-white dark:bg-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{category.name}</h3>
                      <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-500/10 text-[#0f3460] dark:text-blue-400 border-0">
                        {category.growth}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
                className="text-[#0f3460] dark:text-blue-400 hover:underline mb-4"
              >
                ← 전체 카테고리로 돌아가기
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{selectedCategoryData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategoryData.count}개의 하위 카테고리
              </p>
            </div>

            {selectedCategoryData.children.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategoryData.children.map((child: any) => (
                  <Link key={child.id} to={`/search?category=${child.slug}`}>
                    <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-[#0f3460] dark:hover:border-blue-400 group bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[#0f3460] dark:group-hover:text-blue-400 transition text-gray-900 dark:text-gray-100">
                            {child.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {child.service_count || 0}개 서비스
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                하위 카테고리가 없습니다.
              </div>
            )}
          </section>
        ) : (
          /* All Categories Grid */
          <section>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">모든 카테고리</h2>
              {totalCategories && totalCategories > 0 && (
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {totalCategories}개의 세부 카테고리에서 원하는 서비스를 찾아보세요
                </p>
              )}
            </div>

            {mainCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full text-left"
                  >
                    <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-[#0f3460] dark:hover:border-blue-400 group bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[#0f3460] dark:group-hover:text-blue-400 transition text-gray-900 dark:text-gray-100">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {category.count}개 하위 카테고리
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-[#0f3460] dark:text-blue-400 font-bold">
                          {category.count}
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                카테고리가 없습니다.
              </div>
            )}
          </section>
        )}

        {/* Stats */}
        <section className="mt-12 sm:mt-16 text-center">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-[#0f3460] dark:text-blue-400 mb-1 sm:mb-2">
                {totalCategories || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">전체 카테고리</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-[#0f3460] dark:text-blue-400 mb-1 sm:mb-2">
                {totalParentCategories || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">대분류</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-[#0f3460] dark:text-blue-400 mb-1 sm:mb-2">
                {totalUsers ? `${(totalUsers / 1000).toFixed(1)}K+` : "0"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">크리에이터</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
