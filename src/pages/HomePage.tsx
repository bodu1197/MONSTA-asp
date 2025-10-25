import { Heart, MessageCircle, Send, Bookmark, Plus } from 'lucide-react'

export default function HomePage() {
  // TODO: 실제 데이터로 교체
  const stories: any[] = []
  const posts: any[] = []

  return (
    <div className="feed-container">
      {/* Stories Section */}
      <div className="stories-container">
        <div className="stories-scroll">
          {/* Your Story */}
          <div className="story-item">
            <div className="story-avatar-add">
              <Plus style={{ width: '24px', height: '24px' }} />
            </div>
            <span className="story-username">내 스토리</span>
          </div>

          {/* Other Stories */}
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <div className={`story-avatar ${story.hasNew ? 'story-new' : ''}`}>
                {story.initials}
              </div>
              <span className="story-username">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="feed-posts">
        {posts.length === 0 ? (
          <div className="empty-feed">
            <p>아직 포스트가 없습니다</p>
            <span>다른 크리에이터를 팔로우하여 피드를 채워보세요!</span>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              {/* Post Header */}
              <div className="post-header">
                <div className="post-user-info">
                  <div className="post-avatar">{post.initials}</div>
                  <div>
                    <div className="post-username">{post.username}</div>
                    <div className="post-time">{post.timeAgo}</div>
                  </div>
                </div>
                <button className="follow-btn">팔로우</button>
              </div>

              {/* Post Image */}
              <div className="post-image">
                <img src={post.image} alt="Post" />
              </div>

              {/* Post Actions */}
              <div className="post-content">
                <div className="post-actions">
                  <div className="post-actions-left">
                    <button className="action-btn">
                      <Heart style={{ width: '24px', height: '24px' }} />
                    </button>
                    <button className="action-btn">
                      <MessageCircle style={{ width: '24px', height: '24px' }} />
                    </button>
                    <button className="action-btn">
                      <Send style={{ width: '24px', height: '24px' }} />
                    </button>
                  </div>
                  <button className="action-btn">
                    <Bookmark style={{ width: '24px', height: '24px' }} />
                  </button>
                </div>

                {/* Likes */}
                <div className="post-likes">좋아요 {post.likes.toLocaleString()}개</div>

                {/* Caption */}
                <div className="post-caption">
                  <strong>{post.username}</strong> {post.caption}
                </div>

                {/* View Comments */}
                <button className="view-comments">댓글 45개 모두 보기</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
