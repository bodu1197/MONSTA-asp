import { Link } from 'react-router-dom'

// TODO: 실제 데이터로 교체
const recommendedSellers: any[] = []

export function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="suggestions-section">
        <div className="suggestions-header">
          <h3>회원님을 위한 추천</h3>
          <Link to="/discover">모두 보기</Link>
        </div>

        <div className="suggestions-list">
          {recommendedSellers.map((seller) => (
            <div key={seller.id} className="suggestion-item">
              <Link to={`/profile/${seller.name}`} className="suggestion-user">
                <div className="suggestion-avatar">{seller.initials}</div>
                <div className="suggestion-info">
                  <div className="suggestion-name">{seller.name}</div>
                  <div className="suggestion-subtitle">{seller.specialty}</div>
                </div>
              </Link>
              <button className="follow-btn-small">팔로우</button>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-links">
        <Link to="/about">소개</Link>
        <Link to="/help">도움말</Link>
        <Link to="/privacy">개인정보처리방침</Link>
        <Link to="/terms">약관</Link>
        <p>© 2025 돌파구 from MONSTA</p>
      </div>
    </aside>
  )
}
