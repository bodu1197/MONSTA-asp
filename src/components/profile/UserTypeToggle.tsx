import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, Building2, ArrowLeftRight } from 'lucide-react'

interface UserTypeToggleProps {
  currentType?: 'buyer' | 'seller'
}

export function UserTypeToggle({ currentType = 'buyer' }: UserTypeToggleProps) {
  const [userType, setUserType] = useState<'buyer' | 'seller'>(currentType)
  const [updating, setUpdating] = useState(false)

  const handleToggle = async () => {
    if (updating) return

    const newType = userType === 'buyer' ? 'seller' : 'buyer'

    setUpdating(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase
        .from('users')
        .update({ user_type: newType })
        .eq('id', user.id)

      if (!error) {
        setUserType(newType)
      }
    } catch (error) {
      console.error('Failed to update user type:', error)
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
          <div className="mode-toggle-content">
            <div className="mode-current">
              {userType === 'buyer' ? (
                <>
                  <ShoppingBag className="mode-icon-small" />
                  <span>구매자 모드</span>
                </>
              ) : (
                <>
                  <Building2 className="mode-icon-small" />
                  <span>판매자 모드</span>
                </>
              )}
            </div>

            <div className="mode-switch-icon">
              <ArrowLeftRight className="switch-icon" />
            </div>

            <div className="mode-next">
              {userType === 'buyer' ? (
                <>
                  <Building2 className="mode-icon-small" />
                  <span>판매자로 전환</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="mode-icon-small" />
                  <span>구매자로 전환</span>
                </>
              )}
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
