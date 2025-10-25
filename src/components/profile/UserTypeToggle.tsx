import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { ShoppingBag, User } from 'lucide-react'

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
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">사용자 유형</h3>
          <p className="text-sm text-muted-foreground">
            {userType === 'buyer' ? '구매자로 활동 중입니다' : '판매자로 활동 중입니다'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={userType === 'buyer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('buyer')}
            disabled={updating}
          >
            <User className="h-4 w-4 mr-2" />
            구매자
          </Button>
          <Button
            variant={userType === 'seller' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggle('seller')}
            disabled={updating}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            판매자
          </Button>
        </div>
      </div>
    </Card>
  )
}
