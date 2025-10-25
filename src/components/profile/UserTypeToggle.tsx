import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Building2 } from 'lucide-react'

interface UserTypeToggleProps {
  currentType?: 'buyer' | 'seller'
}

export function UserTypeToggle({ currentType = 'buyer' }: UserTypeToggleProps) {
  const [userType, setUserType] = useState<'buyer' | 'seller'>(currentType)
  const [updating, setUpdating] = useState(false)

  const handleToggle = async () => {
    if (updating) return

    const previousType = userType
    const newType = userType === 'buyer' ? 'seller' : 'buyer'

    // 즉시 UI 업데이트 (Optimistic Update)
    setUserType(newType)
    setUpdating(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        console.error('No user found')
        setUserType(previousType) // 원래대로 되돌림
        return
      }

      const { error } = await supabase
        .from('users')
        .update({ user_type: newType })
        .eq('id', user.id)

      if (error) {
        console.error('Supabase update error:', error)
        setUserType(previousType) // 실패 시 원래대로 되돌림
      } else {
        console.log('User type updated successfully:', newType)
      }
    } catch (error) {
      console.error('Failed to update user type:', error)
      setUserType(previousType) // 에러 시 원래대로 되돌림
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="activity-mode">
      <div className="activity-mode-header">
        <div>
          <h2 className="activity-mode-title">활동 모드</h2>
          <p className="activity-mode-subtitle">구매자와 판매자 모드를 자유롭게 전환할 수 있습니다.</p>
        </div>

        <button
          className="mode-toggle-btn"
          onClick={handleToggle}
          disabled={updating}
        >
          {userType === 'buyer' ? (
            <>
              <ShoppingBag className="mode-icon-small" />
              <span>구매자</span>
            </>
          ) : (
            <>
              <Building2 className="mode-icon-small" />
              <span>판매자</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
