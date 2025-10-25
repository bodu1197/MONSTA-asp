import { Settings, Star, Briefcase } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserTypeToggle } from '@/components/profile/UserTypeToggle'
import { supabase } from '@/lib/supabase'
import type { User, Post } from '@/types/database'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    async function loadProfile() {
      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        navigate('/login')
        return
      }

      // Get user profile
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (!userData) {
        // Create default user data if profile doesn't exist
        setUser({
          id: authUser.id,
          email: authUser.email!,
          username: authUser.email?.split('@')[0],
          created_at: authUser.created_at!,
        })
        setLoading(false)
        return
      }

      setUser(userData as User)

      // Fetch all data in parallel for better performance
      const [
        { data: postsData },
        { count: followers },
        { count: following },
        { data: reviewsData }
      ] = await Promise.all([
        supabase
          .from('posts')
          .select('*')
          .eq('user_id', userData.id)
          .eq('is_portfolio', true)
          .order('created_at', { ascending: false }),

        supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', userData.id),

        supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', userData.id),

        supabase
          .from('reviews')
          .select(`
            *,
            reviewer:reviewer_id(username),
            order:order_id(title)
          `)
          .eq('reviewee_id', userData.id)
          .eq('is_public', true)
          .order('created_at', { ascending: false })
      ])

      setPosts(postsData || [])
      setFollowerCount(followers || 0)
      setFollowingCount(following || 0)
      setReviews(reviewsData || [])
      setLoading(false)
    }

    loadProfile()
  }, [navigate])

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12 text-muted-foreground">
          로딩 중...
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0

  const initials = user.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'
  const joinedDate = new Date(user.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-4xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Stats - Mobile */}
            <div className="flex gap-6 md:hidden mb-4">
              <div className="text-center">
                <div className="font-bold text-xl">{posts?.length || 0}</div>
                <div className="text-xs text-muted-foreground">포스트</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">{followerCount || 0}</div>
                <div className="text-xs text-muted-foreground">팔로워</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">{followingCount || 0}</div>
                <div className="text-xs text-muted-foreground">팔로잉</div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  {user.is_verified && (
                    <Badge className="bg-primary text-white">인증</Badge>
                  )}
                </div>
                {user.full_name && (
                  <p className="text-muted-foreground">{user.full_name}</p>
                )}
              </div>
              <Link to="/profile/edit">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats - Desktop */}
            <div className="hidden md:flex gap-6 mb-4">
              <div>
                <span className="font-bold">{posts?.length || 0}</span>{' '}
                <span className="text-muted-foreground">포스트</span>
              </div>
              <div>
                <span className="font-bold">{followerCount || 0}</span>{' '}
                <span className="text-muted-foreground">팔로워</span>
              </div>
              <div>
                <span className="font-bold">{followingCount || 0}</span>{' '}
                <span className="text-muted-foreground">팔로잉</span>
              </div>
              {reviews && reviews.length > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{averageRating.toFixed(1)}</span>{' '}
                  <span className="text-muted-foreground">({reviews.length})</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.bio && <p className="mb-4">{user.bio}</p>}

            {/* Meta Info */}
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                가입일: {joinedDate}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link to="/profile/edit" className="flex-1">
                <Button className="w-full">프로필 편집</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* User Type Toggle */}
      <div className="mb-6">
        <UserTypeToggle currentType={user.user_type} />
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="portfolio">포트폴리오</TabsTrigger>
          <TabsTrigger value="services">서비스</TabsTrigger>
          <TabsTrigger value="reviews">리뷰</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="mt-6">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map((post: Post) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer border-2 hover:border-primary group">
                    <div className="relative aspect-square bg-muted">
                      {post.media_urls && post.media_urls[0] && (
                        <img
                          src={post.media_urls[0]}
                          alt={post.title || 'Portfolio item'}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition">
                        {post.title || '제목 없음'}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>좋아요 {post.like_count}</span>
                        <span>조회 {post.view_count.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              아직 포트폴리오가 없습니다.
            </div>
          )}
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            제공 중인 서비스 목록이 여기에 표시됩니다.
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {review.reviewer?.username?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.reviewer?.username || '익명'}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.order?.title || '서비스'}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      {review.content && <p className="text-sm">{review.content}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              아직 리뷰가 없습니다.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
