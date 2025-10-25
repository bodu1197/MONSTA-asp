import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export function ThemeToggle() {
  const { actualTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={`현재 테마: ${actualTheme === 'light' ? '라이트' : '다크'}`}
    >
      {actualTheme === 'light' ? <Moon style={{ width: '20px', height: '20px' }} /> : <Sun style={{ width: '20px', height: '20px' }} />}
    </button>
  )
}
