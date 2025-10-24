import { Heart, MessageCircle, Send, Bookmark, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { ThemeToggle } from '../components/ThemeToggle'

export default function HomePage() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // TODO: 실제 데이터로 교체
  const stories: any[] = []
  const posts: any[] = []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0f3460] dark:text-blue-400">돌파구</h1>
          <nav className="flex gap-6 items-center">
            <Link to="/" className="font-semibold text-[#0f3460] dark:text-blue-400">홈</Link>
            <Link to="/explore" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">탐색</Link>
            <Link to="/categories" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">카테고리</Link>
            <Link to="/profile" className="hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">프로필</Link>
            <ThemeToggle />
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">로그아웃</button>
          </nav>
        </div>
      </header>

      {/* Main Content - Feed */}
      <div className="w-full max-w-2xl mx-auto px-0">
        {/* Stories Section */}
        <div className="border-b dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-16 md:top-16 z-40 pb-3 pt-3 md:pb-4 md:pt-4">
          <div className="flex gap-3 md:gap-4 overflow-x-auto px-3 md:px-4 scrollbar-hide">
            {/* Your Story */}
            <div className="flex flex-col items-center gap-1.5 md:gap-2 min-w-[70px] md:min-w-[80px]">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition active:scale-95">
                  <Plus style={{ width: '20px', height: '20px' }} className="text-gray-600 dark:text-gray-300 md:w-6 md:h-6" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-center font-medium text-gray-900 dark:text-gray-100">내 스토리</span>
            </div>

            {/* Other Stories */}
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center gap-1.5 md:gap-2 min-w-[70px] md:min-w-[80px]">
                <div className="relative">
                  <Avatar
                    className={`w-14 h-14 md:w-16 md:h-16 cursor-pointer transition active:scale-95 border-2 ${
                      story.hasNew ? "border-primary" : "border-muted"
                    }`}
                  >
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm md:text-base">
                      {story.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-[10px] md:text-xs text-center font-medium truncate w-full px-1">
                  {story.username}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Posts */}
        <div className="pb-4 md:pb-8 px-0">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <p className="text-lg mb-2">아직 포스트가 없습니다</p>
              <p className="text-sm">다른 크리에이터를 팔로우하여 피드를 채워보세요!</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="mb-4 md:mb-6 overflow-hidden border-0 rounded-none sm:border sm:rounded-xl shadow-sm">
                {/* Post Header */}
                <div className="flex items-center justify-between p-3 md:p-4">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs md:text-sm">
                        {post.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{post.username}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{post.timeAgo}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs md:text-sm px-2 md:px-3 h-7 md:h-8">
                    팔로우
                  </Button>
                </div>

                {/* Post Image */}
                <div className="relative w-full aspect-square bg-muted">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="flex items-center gap-4 md:gap-5">
                      <button className="hover:text-primary transition active:scale-95 touch-manipulation">
                        <Heart className="w-6 h-6 md:w-7 md:h-7" />
                      </button>
                      <button className="hover:text-primary transition active:scale-95 touch-manipulation">
                        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                      </button>
                      <button className="hover:text-primary transition active:scale-95 touch-manipulation">
                        <Send className="w-6 h-6 md:w-7 md:h-7" />
                      </button>
                    </div>
                    <button className="hover:text-primary transition active:scale-95 touch-manipulation">
                      <Bookmark className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                  </div>

                  {/* Likes */}
                  <p className="font-semibold text-xs md:text-sm mb-1.5 md:mb-2">
                    좋아요 {post.likes.toLocaleString()}개
                  </p>

                  {/* Caption */}
                  <div className="text-xs md:text-sm mb-1.5 md:mb-2">
                    <span className="font-semibold mr-1.5 md:mr-2">{post.username}</span>
                    <span className="leading-relaxed">{post.caption}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    {post.tags?.map((tag: string) => (
                      <Link
                        key={tag}
                        to={`/search?q=${tag}`}
                        className="text-xs md:text-sm text-primary hover:underline active:underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  {/* View Comments */}
                  <button className="text-xs md:text-sm text-muted-foreground hover:text-foreground active:text-foreground">
                    댓글 45개 모두 보기
                  </button>
                </div>
              </Card>
            ))
          )}

          {/* Load More */}
          {posts.length > 0 && (
            <div className="text-center py-6 md:py-8">
              <Button variant="outline" size="default" className="rounded-full text-sm md:text-base px-6 md:px-8">
                더 보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
