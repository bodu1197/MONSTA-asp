import { Link } from 'react-router-dom'

// TODO: 실제 데이터로 교체
const recommendedSellers: any[] = []

export function RightSidebar() {
  return (
    <aside className="suggestions-section">
      <div className="suggestions-card">
        <div className="suggestions-header">
          <h3>회원님을 위한 추천</h3>
          <Link to="/discover" style={{ color: 'var(--active-color)', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>모두 보기</Link>
        </div>

        {recommendedSellers.map((seller) => (
          <div key={seller.id} className="suggestion-item">
            <div className="suggestion-avatar">{seller.initials}</div>
            <div className="suggestion-info">
              <h4>{seller.name}</h4>
              <p>{seller.specialty}</p>
            </div>
            <button className="follow-btn">팔로우</button>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="footer-links">
          <Link to="/about">소개</Link>
          <Link to="/help">도움말</Link>
          <Link to="/promotions">홍보 센터</Link>
          <Link to="/api">API</Link>
          <Link to="/jobs">채용 정보</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/terms">약관</Link>
          <Link to="/locations">위치</Link>
          <Link to="/language">언어</Link>
        </div>
        <p>© 2025 돌파구 from MONSTA</p>
      </div>
    </aside>
  )
}
