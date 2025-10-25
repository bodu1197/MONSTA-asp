export interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  bio?: string
  avatar_url?: string
  is_verified?: boolean
  user_type?: 'buyer' | 'seller'
  created_at: string
  updated_at?: string
}

export interface Post {
  id: string
  user_id: string
  title?: string
  content?: string
  media_urls?: string[]
  is_portfolio: boolean
  like_count: number
  view_count: number
  created_at: string
  updated_at?: string
}

export interface Review {
  id: string
  reviewer_id: string
  reviewee_id: string
  order_id?: string
  rating: number
  content?: string
  is_public: boolean
  created_at: string
  updated_at?: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}
