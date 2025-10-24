import { Search, TrendingUp, Filter, Star } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { ThemeToggle } from '../components/ThemeToggle'

export default function ExplorePage() {
  // TODO: 실제 데이터로 교체
  const [featuredCreators] = useState<any[]>([])
  const [trendingPosts] = useState<any[]>([])
  const [popularSearches] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#0f3460] dark:text-blue-400">돌파구</Link>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">홈</Link>
            <Link to="/explore" className="font-semibold text-[#0f3460] dark:text-blue-400">탐색</Link>
            <Link to="/categories" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">프로필</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="w-full mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="크리에이터, 서비스, 태그 검색..."
              className="pl-12 pr-12 h-14 text-lg rounded-full border-2 focus:border-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Popular Searches */}
          {popularSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((tag) => (
                <Link key={tag} to={`/search?q=${tag}`}>
                  <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Creators */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">주목받는 크리에이터</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">인기 상승 중인 전문가</p>
            </div>
          </div>

          {featuredCreators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <Link key={creator.id} to={`/profile/${creator.username}`}>
                  <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-primary">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                          {creator.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{creator.username}</h3>
                        {creator.verified && (
                          <Badge variant="secondary" className="bg-primary text-white text-xs px-2">
                            인증
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {creator.title}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div>
                          <span className="font-semibold text-foreground">
                            {creator.followers}
                          </span>
                          {" "}팔로워
                        </div>
                        {creator.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-foreground">
                              {creator.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button className="w-full" size="sm">
                        팔로우
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <p className="text-lg mb-2">크리에이터가 아직 없습니다</p>
              <p className="text-sm">첫 번째 크리에이터가 되어보세요!</p>
            </div>
          )}
        </section>

        {/* Trending Works */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-[#0f3460] dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">트렌딩 작업물</h2>
          </div>

          {trendingPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trendingPosts.map((post) => (
                  <Link key={post.id} to={`/post/${post.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer border-2 hover:border-primary group">
                      <div className="relative aspect-square bg-muted">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.creator}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>좋아요 {post.likes}</span>
                          <span>조회 {post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="rounded-full">
                  더 많은 작업물 보기
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <p className="text-lg mb-2">트렌딩 작업물이 아직 없습니다</p>
              <p className="text-sm">포트폴리오를 업로드하여 주목받아보세요!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
