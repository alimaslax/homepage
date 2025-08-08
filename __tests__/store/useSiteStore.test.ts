import { renderHook, act } from '@testing-library/react'
import useSiteStore from '../../store/useSiteStore'

// Mock zustand persist middleware
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}))

describe('useSiteStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useSiteStore.setState({
        PanOpen: true,
        isRobot: true,
        apiKey: 'xxxx',
        profile: {},
        activeLink: 'Home',
      })
    })
  })

  describe('Initial State', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => useSiteStore())

      expect(result.current.PanOpen).toBe(true)
      expect(result.current.isRobot).toBe(true)
      expect(result.current.apiKey).toBe('xxxx')
      expect(result.current.profile).toEqual({})
      expect(result.current.activeLink).toBe('Home')
    })
  })

  describe('togglePan', () => {
    it('should toggle PanOpen state', () => {
      const { result } = renderHook(() => useSiteStore())

      // Initial state
      expect(result.current.PanOpen).toBe(true)

      // Toggle to false
      act(() => {
        result.current.togglePan()
      })
      expect(result.current.PanOpen).toBe(false)

      // Toggle back to true
      act(() => {
        result.current.togglePan()
      })
      expect(result.current.PanOpen).toBe(true)
    })
  })

  describe('toggleIsRobot', () => {
    it('should set isRobot to specified value', () => {
      const { result } = renderHook(() => useSiteStore())

      // Set to false
      act(() => {
        result.current.toggleIsRobot(false)
      })
      expect(result.current.isRobot).toBe(false)

      // Set to true
      act(() => {
        result.current.toggleIsRobot(true)
      })
      expect(result.current.isRobot).toBe(true)
    })

    it('should handle boolean values correctly', () => {
      const { result } = renderHook(() => useSiteStore())

      // Test with explicit boolean values
      act(() => {
        result.current.toggleIsRobot(false)
      })
      expect(result.current.isRobot).toBe(false)
      expect(typeof result.current.isRobot).toBe('boolean')

      act(() => {
        result.current.toggleIsRobot(true)
      })
      expect(result.current.isRobot).toBe(true)
      expect(typeof result.current.isRobot).toBe('boolean')
    })
  })

  describe('setApiKey', () => {
    it('should update apiKey with provided value', () => {
      const { result } = renderHook(() => useSiteStore())
      const newApiKey = 'new-api-key-123'

      act(() => {
        result.current.setApiKey(newApiKey)
      })

      expect(result.current.apiKey).toBe(newApiKey)
    })

    it('should handle empty string', () => {
      const { result } = renderHook(() => useSiteStore())

      act(() => {
        result.current.setApiKey('')
      })

      expect(result.current.apiKey).toBe('')
    })

    it('should handle special characters in apiKey', () => {
      const { result } = renderHook(() => useSiteStore())
      const specialApiKey = 'api_key-with.special@chars!'

      act(() => {
        result.current.setApiKey(specialApiKey)
      })

      expect(result.current.apiKey).toBe(specialApiKey)
    })
  })

  describe('setResume', () => {
    it('should update profile with provided object', () => {
      const { result } = renderHook(() => useSiteStore())
      const newProfile = {
        name: 'John Doe',
        title: 'Software Engineer',
        experience: ['React', 'TypeScript'],
      }

      act(() => {
        result.current.setResume(newProfile)
      })

      expect(result.current.profile).toEqual(newProfile)
    })

    it('should completely replace the profile object', () => {
      const { result } = renderHook(() => useSiteStore())
      
      // Set initial profile
      const initialProfile = { name: 'Jane Doe', title: 'Designer' }
      act(() => {
        result.current.setResume(initialProfile)
      })
      expect(result.current.profile).toEqual(initialProfile)

      // Replace with new profile (should not merge)
      const newProfile = { email: 'test@example.com', skills: ['Design'] }
      act(() => {
        result.current.setResume(newProfile)
      })
      expect(result.current.profile).toEqual(newProfile)
      expect(result.current.profile).not.toHaveProperty('name')
      expect(result.current.profile).not.toHaveProperty('title')
    })

    it('should handle empty profile object', () => {
      const { result } = renderHook(() => useSiteStore())

      act(() => {
        result.current.setResume({})
      })

      expect(result.current.profile).toEqual({})
    })

    it('should handle nested objects in profile', () => {
      const { result } = renderHook(() => useSiteStore())
      const complexProfile = {
        personal: {
          name: 'John Doe',
          contact: {
            email: 'john@example.com',
            phone: '123-456-7890',
          },
        },
        professional: {
          title: 'Senior Developer',
          skills: ['React', 'Node.js'],
        },
      }

      act(() => {
        result.current.setResume(complexProfile)
      })

      expect(result.current.profile).toEqual(complexProfile)
      expect(result.current.profile.personal.name).toBe('John Doe')
      expect(result.current.profile.professional.skills).toEqual(['React', 'Node.js'])
    })
  })

  describe('setActiveLink', () => {
    it('should update activeLink with provided string', () => {
      const { result } = renderHook(() => useSiteStore())
      const newActiveLink = 'About'

      act(() => {
        result.current.setActiveLink(newActiveLink)
      })

      expect(result.current.activeLink).toBe(newActiveLink)
    })

    it('should handle various link names', () => {
      const { result } = renderHook(() => useSiteStore())
      const linkNames = ['Home', 'About', 'Resume', 'Contact', 'Projects']

      linkNames.forEach(linkName => {
        act(() => {
          result.current.setActiveLink(linkName)
        })
        expect(result.current.activeLink).toBe(linkName)
      })
    })

    it('should handle empty string', () => {
      const { result } = renderHook(() => useSiteStore())

      act(() => {
        result.current.setActiveLink('')
      })

      expect(result.current.activeLink).toBe('')
    })

    it('should handle special characters in link names', () => {
      const { result } = renderHook(() => useSiteStore())
      const specialLink = 'About-Me & Contact!'

      act(() => {
        result.current.setActiveLink(specialLink)
      })

      expect(result.current.activeLink).toBe(specialLink)
    })
  })

  describe('State Isolation', () => {
    it('should not affect other state properties when updating one', () => {
      const { result } = renderHook(() => useSiteStore())
      const initialState = {
        PanOpen: result.current.PanOpen,
        isRobot: result.current.isRobot,
        apiKey: result.current.apiKey,
        profile: result.current.profile,
        activeLink: result.current.activeLink,
      }

      // Update only activeLink
      act(() => {
        result.current.setActiveLink('NewLink')
      })

      expect(result.current.PanOpen).toBe(initialState.PanOpen)
      expect(result.current.isRobot).toBe(initialState.isRobot)
      expect(result.current.apiKey).toBe(initialState.apiKey)
      expect(result.current.profile).toEqual(initialState.profile)
      expect(result.current.activeLink).toBe('NewLink')
    })
  })

  describe('Multiple Hook Instances', () => {
    it('should share state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useSiteStore())
      const { result: result2 } = renderHook(() => useSiteStore())

      // Update state in first instance
      act(() => {
        result1.current.setActiveLink('SharedLink')
      })

      // Both instances should reflect the same state
      expect(result1.current.activeLink).toBe('SharedLink')
      expect(result2.current.activeLink).toBe('SharedLink')

      // Update state in second instance
      act(() => {
        result2.current.togglePan()
      })

      // Both instances should reflect the change
      expect(result1.current.PanOpen).toBe(result2.current.PanOpen)
    })
  })

  describe('Type Safety', () => {
    it('should maintain correct types for all state properties', () => {
      const { result } = renderHook(() => useSiteStore())

      expect(typeof result.current.PanOpen).toBe('boolean')
      expect(typeof result.current.isRobot).toBe('boolean')
      expect(typeof result.current.apiKey).toBe('string')
      expect(typeof result.current.profile).toBe('object')
      expect(typeof result.current.activeLink).toBe('string')
      
      // Function types
      expect(typeof result.current.togglePan).toBe('function')
      expect(typeof result.current.toggleIsRobot).toBe('function')
      expect(typeof result.current.setApiKey).toBe('function')
      expect(typeof result.current.setResume).toBe('function')
      expect(typeof result.current.setActiveLink).toBe('function')
    })
  })
})