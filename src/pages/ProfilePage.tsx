import { Settings, Star, Calendar, Image, Briefcase } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const [activeTab, setActiveTab] = useState('portfolio')

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
      <div className="profile-container">
        <div className="empty-state">
          <div className="empty-title">로딩 중...</div>
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
      : 5.0

  const initials = user.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'
  const joinedDate = new Date(user.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  })

  const getTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="empty-state">
            <div className="empty-icon">
              <Image />
            </div>
            <h3 className="empty-title">아직 포트폴리오가 없습니다.</h3>
            <p className="empty-desc">첫 번째 작품을 업로드해 보세요!</p>
          </div>
        )
      case 'services':
        return (
          <div className="empty-state">
            <div className="empty-icon">
              <Briefcase />
            </div>
            <h3 className="empty-title">등록된 서비스가 없습니다.</h3>
            <p className="empty-desc">첫 번째 서비스를 등록해 보세요!</p>
          </div>
        )
      case 'reviews':
        return (
          <div className="empty-state">
            <div className="empty-icon">
              <Star />
            </div>
            <h3 className="empty-title">아직 리뷰가 없습니다.</h3>
            <p className="empty-desc">첫 번째 리뷰를 받아 보세요!</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-top">
          {/* Avatar */}
          <div className="profile-avatar-section">
            <div className="profile-avatar">{initials}</div>
            <Link to="/profile/edit" className="settings-btn">
              <Settings />
            </Link>
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{posts?.length || 0}</span>
                <span className="stat-label">포스트</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{followerCount || 0}</span>
                <span className="stat-label">팔로워</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{followingCount || 0}</span>
                <span className="stat-label">팔로잉</span>
              </div>
            </div>

            <div className="profile-meta">
              <Calendar style={{ width: '16px', height: '16px' }} />
              <span>가입일: {joinedDate}</span>
            </div>

            <div className="profile-actions">
              <Link to="/profile/edit" className="btn-primary">
                프로필 편집
              </Link>
            </div>
          </div>

          {/* Profile Right */}
          <div className="profile-right">
            <p className="joined-date">회원님을 위한 추천</p>
            <div className="recommended-badge">
              <Star style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
              {averageRating.toFixed(1)}점 보기
            </div>
          </div>
        </div>
      </div>

      {/* User Type Toggle */}
      <UserTypeToggle currentType={user.user_type} />

      {/* Content Tabs */}
      <div className="tabs-container">
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            포트폴리오
          </button>
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            서비스
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            리뷰
          </button>
        </div>

        <div className="tab-content">
          {getTabContent()}
        </div>
      </div>
    </div>
  )
}
