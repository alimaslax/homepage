import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import useSiteStore from '../../store/useSiteStore'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, onClick }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  )
})

// Mock the store
jest.mock('../../store/useSiteStore')

const mockUseSiteStore = useSiteStore as jest.MockedFunction<typeof useSiteStore>

describe('Header', () => {
  const mockTogglePan = jest.fn()
  const mockSetActiveLink = jest.fn()

  const defaultStoreState = {
    PanOpen: true,
    togglePan: mockTogglePan,
    activeLink: 'Home',
    setActiveLink: mockSetActiveLink,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseSiteStore.mockReturnValue(defaultStoreState)
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })

    // Mock scroll height
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })
  })

  afterEach(() => {
    // Clean up event listeners
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders navigation menu with all links', () => {
      render(<Header />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Resume')).toBeInTheDocument()
      expect(screen.getByText('Notebook')).toBeInTheDocument()
      expect(screen.getByText('Social 📸')).toBeInTheDocument()
      expect(screen.getByText('Contact Me')).toBeInTheDocument()
    })

    it('renders mobile navigation buttons', () => {
      render(<Header />)
      
      expect(screen.getByTitle('Show navigation')).toBeInTheDocument()
      expect(screen.getByTitle('Hide navigation')).toBeInTheDocument()
    })

    it('applies current class to active link', () => {
      mockUseSiteStore.mockReturnValue({
        ...defaultStoreState,
        activeLink: 'Resume',
      })

      render(<Header />)
      
      const resumeLink = screen.getByText('Resume').closest('li')
      expect(resumeLink).toHaveClass('current')
    })

    it('shows navigation when PanOpen is true', () => {
      mockUseSiteStore.mockReturnValue({
        ...defaultStoreState,
        PanOpen: true,
      })

      render(<Header />)
      
      const nav = document.querySelector('#nav')
      expect(nav).toHaveStyle('display: block')
    })

    it('hides navigation when PanOpen is false', () => {
      mockUseSiteStore.mockReturnValue({
        ...defaultStoreState,
        PanOpen: false,
      })

      render(<Header />)
      
      const nav = document.querySelector('#nav')
      expect(nav).toHaveStyle('display: none')
    })
  })

  describe('Mobile Behavior', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500, // Mobile width
      })
    })

    it('automatically closes pan on mobile when component mounts', async () => {
      render(<Header />)
      
      await waitFor(() => {
        expect(mockTogglePan).toHaveBeenCalled()
      })
    })

    it('toggles pan when mobile button is clicked', () => {
      render(<Header />)
      
      const showNavButton = screen.getByTitle('Show navigation')
      fireEvent.click(showNavButton)
      
      expect(mockTogglePan).toHaveBeenCalled()
    })

    it('closes navigation after clicking link on mobile', () => {
      render(<Header />)
      
      const homeLink = screen.getByText('Home')
      fireEvent.click(homeLink)
      
      expect(mockSetActiveLink).toHaveBeenCalledWith('Home')
      expect(mockTogglePan).toHaveBeenCalled()
    })
  })

  describe('Desktop Behavior', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024, // Desktop width
      })
    })

    it('does not toggle pan on link click for desktop', () => {
      render(<Header />)
      
      const homeLink = screen.getByText('Home')
      fireEvent.click(homeLink)
      
      expect(mockSetActiveLink).toHaveBeenCalledWith('Home')
      // Should not call togglePan for desktop
      expect(mockTogglePan).not.toHaveBeenCalled()
    })
  })

  describe('Link Navigation', () => {
    const linkTestCases = [
      { text: 'Home', href: '/', activeLink: 'Home' },
      { text: 'Resume', href: '/resume', activeLink: 'Resume' },
      { text: 'Notebook', href: '/notebook', activeLink: 'Notebook' },
      { text: 'Social 📸', href: '/social', activeLink: 'Social' },
      { text: 'Contact Me', href: '/contact', activeLink: 'Contact' },
    ]

    linkTestCases.forEach(({ text, href, activeLink }) => {
      it(`navigates to ${text} page and sets active link`, () => {
        render(<Header />)
        
        const link = screen.getByText(text)
        expect(link.closest('a')).toHaveAttribute('href', href)
        
        fireEvent.click(link)
        expect(mockSetActiveLink).toHaveBeenCalledWith(activeLink)
      })
    })
  })

  describe('Scroll Behavior', () => {
    it('adds opaque class when scrolled down on desktop', async () => {
      render(<Header />)
      
      // Simulate scrolling past 8% of document height
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 200, // More than 8% of 2000px
      })
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const nav = document.querySelector('#nav')
        expect(nav).toHaveClass('opaque')
      })
    })

    it('removes opaque class when scrolled to top', async () => {
      render(<Header />)
      
      // First scroll down
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 200,
      })
      fireEvent.scroll(window)
      
      // Then scroll back to top
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 0,
      })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const nav = document.querySelector('#nav')
        expect(nav).not.toHaveClass('opaque')
      })
    })

    it('does not add opaque class on mobile even when scrolled', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500, // Mobile width
      })
      
      render(<Header />)
      
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 200,
      })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        const nav = document.querySelector('#nav')
        expect(nav).not.toHaveClass('opaque')
      })
    })
  })

  describe('Event Listeners', () => {
    it('adds scroll event listener on mount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
      
      render(<Header />)
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      )
      
      addEventListenerSpy.mockRestore()
    })

    it('removes scroll event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
      
      const { unmount } = render(<Header />)
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      )
      
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Active Link Highlighting', () => {
    const linkNames = ['Home', 'Resume', 'Notebook', 'Social', 'Contact']
    
    linkNames.forEach(linkName => {
      it(`highlights ${linkName} when active`, () => {
        mockUseSiteStore.mockReturnValue({
          ...defaultStoreState,
          activeLink: linkName,
        })
        
        render(<Header />)
        
        // Find the link by its text content or partial text
        let linkElement
        if (linkName === 'Social') {
          linkElement = screen.getByText('Social 📸').closest('li')
        } else if (linkName === 'Contact') {
          linkElement = screen.getByText('Contact Me').closest('li')
        } else {
          linkElement = screen.getByText(linkName).closest('li')
        }
        
        expect(linkElement).toHaveClass('current')
        
        // Check that other links don't have the current class
        const allLinks = document.querySelectorAll('#nav li')
        const otherLinks = Array.from(allLinks).filter(link => link !== linkElement)
        
        otherLinks.forEach(otherLink => {
          expect(otherLink).not.toHaveClass('current')
        })
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles window resize events', () => {
      render(<Header />)
      
      // Simulate window resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      
      fireEvent.resize(window)
      
      // Component should handle the resize gracefully
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('handles multiple rapid clicks on navigation links', () => {
      render(<Header />)
      
      const homeLink = screen.getByText('Home')
      
      // Rapidly click the same link multiple times
      fireEvent.click(homeLink)
      fireEvent.click(homeLink)
      fireEvent.click(homeLink)
      
      // Should call setActiveLink for each click
      expect(mockSetActiveLink).toHaveBeenCalledTimes(3)
      expect(mockSetActiveLink).toHaveBeenCalledWith('Home')
    })
  })
})