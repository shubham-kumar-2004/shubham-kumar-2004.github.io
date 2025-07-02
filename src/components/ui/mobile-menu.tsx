import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NAV_LINKS } from '@/consts'
import { Menu } from 'lucide-react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleViewTransitionStart = () => {
      handleClose()
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('astro:before-swap', handleViewTransitionStart)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('astro:before-swap', handleViewTransitionStart)
      document.removeEventListener('mousedown', handleClickOutside)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleClose = () => {
    if (!isOpen) return
    
    setIsAnimating(false)
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200) // Match this with the transition duration
  }

  const handleOpen = () => {
    setIsOpen(true)
    // Small delay to allow the dropdown to render before starting the animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => open ? handleOpen() : handleClose()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-8 sm:hidden transition-transform duration-200 hover:bg-accent/50"
          title="Menu"
          aria-expanded={isOpen}
        >
          <Menu 
            className={`size-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        ref={contentRef}
        align="end" 
        className={`w-56 rounded-lg border bg-background/95 backdrop-blur-sm p-2 shadow-lg sm:hidden transition-all duration-200 ease-out ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
        sideOffset={8}
        onInteractOutside={(e) => {
          e.preventDefault()
          handleClose()
        }}
      >

        <DropdownMenuGroup>
          {NAV_LINKS.map((item) => (
            <DropdownMenuItem 
              key={item.href} 
              asChild
              className="cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors duration-150 hover:bg-accent/50 focus:bg-accent/70 focus:text-accent-foreground"
            >
              <a
                href={item.href}
                className="flex w-full items-center gap-2"
                onClick={(e) => {
                  // Only prevent default if it's an anchor link to a different page
                  if (item.href.startsWith('http') || item.href.startsWith('#')) {
                    handleClose()
                  } else {
                    e.preventDefault()
                    handleClose()
                    // Small delay to allow the animation to play before navigation
                    setTimeout(() => {
                      window.location.href = item.href
                    }, 200)
                  }
                }}
              >
                <span className="capitalize transition-transform duration-200 hover:translate-x-1">
                  {item.label}
                </span>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenu
