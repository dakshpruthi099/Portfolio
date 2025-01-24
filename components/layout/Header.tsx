import { useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { smoothScroll } from '@/utils/smoothScroll'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme() as { theme: string | undefined; setTheme: (theme: string) => void }
  const activeSection = useActiveSection()

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]

  // Update the desktop navigation link className
  const getLinkClassName = (href: string) => {
    return `transition-colors ${
      activeSection === href 
        ? 'text-primary' 
        : 'hover:text-primary'
    }`
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Daksh Pruthi</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className={getLinkClassName(link.href)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  smoothScroll(e, link.href)
                  setIsMenuOpen(false)
                }}
                className="block hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                setIsMenuOpen(false)
              }}
              className="flex items-center space-x-2 hover:text-primary py-2"
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}