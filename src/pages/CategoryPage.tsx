import { useParams } from 'react-router-dom'
import { Grid, List } from 'lucide-react'
import { useState } from 'react'

const categoryInfo: Record<string, { name: string; description: string }> = {
  'lifestyle': { name: '라이프스타일', description: '삶의 질을 높이는 서비스' },
  'event': { name: '이벤트', description: '특별한 날을 위한 서비스' },
  'hobby-handmade': { name: '취미/핸드메이드', description: '취미 활동과 수제 작품' },
  'beauty-fashion': { name: '뷰티/패션', description: '뷰티와 패션 관련 서비스' },
  'counseling-coaching': { name: '상담/코칭', description: '전문적인 상담과 코칭' },
  'fortune-tarot': { name: '운세/타로', description: '운세와 타로 상담' },
  'ebook-template': { name: '전자책/템플릿', description: '전자책과 각종 템플릿' },
  'tax-legal-labor': { name: '세무/법무/노무', description: '세무, 법률, 노무 전문 서비스' },
  'custom-order': { name: '주문제작', description: '맞춤형 주문 제작 서비스' },
  'career-admission': { name: '취업/입시', description: '취업과 입시 준비 서비스' },
  'job-skills': { name: '직무역량', description: '직무 능력 향상 서비스' },
  'music-audio': { name: '음악/오디오', description: '음악 제작 및 오디오 서비스' },
  'translation': { name: '번역/통역', description: '전문 번역 및 통역 서비스' },
  'errands': { name: '심부름', description: '빠른 배달 및 심부름 서비스' },
  'business': { name: '비즈니스', description: '비즈니스 성장을 위한 전문 서비스' },
  'writing': { name: '문서/글쓰기', description: '전문적인 문서 작성 서비스' },
  'video-photo': { name: '영상/사진', description: '영상 제작 및 사진 촬영' },
  'life-service': { name: '생활 서비스', description: '일상 생활 편의 서비스' },
  'marketing': { name: '마케팅', description: '효과적인 마케팅 전략' },
  'design': { name: '디자인', description: '창의적인 디자인 솔루션' },
  'ai-services': { name: 'AI 서비스', description: 'AI 기반 혁신 서비스' },
  'it-programming': { name: 'IT/프로그래밍', description: '웹, 앱, 소프트웨어 개발' },
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const category = slug ? categoryInfo[slug] : null

  if (!category) {
    return (
      <div className="feed-section">
        <div className="empty-feed">
          <p>카테고리를 찾을 수 없습니다</p>
          <span>올바른 카테고리를 선택해주세요</span>
        </div>
      </div>
    )
  }

  return (
    <div className="feed-section">
      {/* 카테고리 헤더 */}
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '12px'
        }}>
          {category.name}
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}>
          {category.description}
        </p>

        {/* 뷰 모드 토글 */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '8px 16px',
              background: viewMode === 'grid' ? 'var(--active-color)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: viewMode === 'grid' ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Grid style={{ width: '20px', height: '20px' }} />
            그리드
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '8px 16px',
              background: viewMode === 'list' ? 'var(--active-color)' : 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: viewMode === 'list' ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <List style={{ width: '20px', height: '20px' }} />
            리스트
          </button>
        </div>
      </div>

      {/* 서비스 목록 */}
      <div className="empty-feed">
        <p>아직 등록된 서비스가 없습니다</p>
        <span>곧 다양한 서비스가 등록될 예정입니다</span>
      </div>
    </div>
  )
}
