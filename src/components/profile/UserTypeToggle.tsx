import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Building2 } from 'lucide-react'

interface UserTypeToggleProps {
  currentType?: 'buyer' | 'seller'
}

export function UserTypeToggle({ currentType = 'buyer' }: UserTypeToggleProps) {
  const [userType, setUserType] = useState<'buyer' | 'seller'>(currentType)
  const [updating, setUpdating] = useState(false)

  const handleToggle = async (type: 'buyer' | 'seller') => {
    if (type === userType || updating) return

    setUpdating(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
        .from('users')
        .update({ user_type: type })
        .eq('id', user.id)

      if (!error) {
        setUserType(type)
      }
    } catch (error) {
      console.error('Failed to update user type:', error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="activity-mode">
      <h2 className="activity-mode-title">활동 모드</h2>
      <p className="activity-mode-subtitle">구매자와 판매자 모드를 자유롭게 전환할 수 있습니다.</p>

      <div className="mode-toggle">
        <div
          className={`mode-card ${userType === 'buyer' ? 'active' : ''}`}
          onClick={() => handleToggle('buyer')}
        >
          <div className="mode-icon">
            <ShoppingBag />
          </div>
          <div className="mode-title">구매자</div>
          <div className="mode-desc">서비스·구매</div>
        </div>

        <div
          className={`mode-card ${userType === 'seller' ? 'active' : ''}`}
          onClick={() => handleToggle('seller')}
        >
          <div className="mode-icon">
            <Building2 />
          </div>
          <div className="mode-title">판매자</div>
          <div className="mode-desc">서비스·판매</div>
        </div>
      </div>
    </div>
  )
}
