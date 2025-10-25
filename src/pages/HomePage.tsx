import { Heart, MessageCircle, Send, Plus, MoreVertical } from 'lucide-react'

export default function HomePage() {
  // TODO: 실제 데이터로 교체
  const stories: any[] = []
  const posts: any[] = []

  return (
    <div className="feed-section">
      {/* Stories Section */}
      <div className="stories-container">
        <div className="stories-scroll">
          {/* Your Story */}
          <div className="story-item">
            <div className="story-avatar add-story">
              <Plus style={{ width: '28px', height: '28px' }} />
            </div>
            <span className="story-name">내 스토리</span>
          </div>

          {/* Other Stories */}
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <div className={`story-avatar ${story.hasNew ? 'story-new' : ''}`}>
                {story.initials}
              </div>
              <span className="story-name">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
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
              <div className="post-author">
                <div className="author-avatar">{post.initials}</div>
                <div className="author-info">
                  <h4>{post.username}</h4>
                  <p>{post.timeAgo}</p>
                </div>
              </div>
              <button className="icon-btn">
                <MoreVertical style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Post Image */}
            <div className="post-image">
              <img src={post.image} alt="Post" />
            </div>

            {/* Post Actions */}
            <div className="post-actions">
              <button className="action-btn">
                <Heart style={{ width: '20px', height: '20px' }} />
                {post.likes}
              </button>
              <button className="action-btn">
                <MessageCircle style={{ width: '20px', height: '20px' }} />
                {post.comments}
              </button>
              <button className="action-btn">
                <Send style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Caption */}
            <div className="post-caption">
              <p>
                <strong>{post.username}</strong> {post.caption} <span className="view-more">더 보기</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
