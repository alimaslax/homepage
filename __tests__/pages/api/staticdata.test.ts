import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/staticdata'
import { promises as fs } from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}))

// Mock path module
jest.mock('path', () => ({
  join: jest.fn(),
}))

const mockedFs = fs as jest.Mocked<typeof fs>
const mockedPath = path as jest.Mocked<typeof path>

describe('/api/staticdata', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Success Cases', () => {
    it('should return static data successfully', async () => {
      // Mock file system calls
      const mockJsonPath = '/mock/path/to/json'
      const mockJsonFile = '/mock/path/to/json/data.json'
      const mockFileContents = JSON.stringify({
        name: 'John Doe',
        title: 'Software Engineer',
        skills: ['React', 'TypeScript'],
      })

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      // Create mock request and response
      const { req, res } = createMocks({
        method: 'GET',
      })

      // Call the handler
      await handler(req, res)

      // Verify fs calls
      expect(mockedPath.join).toHaveBeenCalledWith(process.cwd(), 'json')
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        mockJsonFile,
        'utf8'
      )

      // Verify response
      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toBe(mockFileContents)
    })

    it('should handle empty JSON file', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = ''

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toBe(mockFileContents)
    })

    it('should handle large JSON files', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const largeData = {
        users: new Array(1000).fill(0).map((_, i) => ({
          id: i,
          name: `User ${i}`,
          email: `user${i}@example.com`,
        })),
      }
      const mockFileContents = JSON.stringify(largeData)

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toBe(mockFileContents)
    })
  })

  describe('Error Cases', () => {
    it('should handle file not found error', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockError = new Error('ENOENT: no such file or directory')
      mockError.code = 'ENOENT'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockRejectedValue(mockError)

      const { req, res } = createMocks({
        method: 'GET',
      })

      // The handler doesn't have error handling, so it should throw
      await expect(handler(req, res)).rejects.toThrow('ENOENT: no such file or directory')
    })

    it('should handle permission denied error', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockError = new Error('EACCES: permission denied')
      mockError.code = 'EACCES'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockRejectedValue(mockError)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await expect(handler(req, res)).rejects.toThrow('EACCES: permission denied')
    })

    it('should handle invalid JSON content', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = 'invalid json content {'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      // The handler returns the raw file contents, not parsed JSON
      // So invalid JSON is still returned as-is
      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toBe(mockFileContents)
    })
  })

  describe('HTTP Methods', () => {
    it('should handle GET requests', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = '{"test": "data"}'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
    })

    it('should handle POST requests (even though logic is the same)', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = '{"test": "data"}'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'POST',
      })

      await handler(req, res)

      // The handler doesn't check method, so it should work with any method
      expect(res._getStatusCode()).toBe(200)
    })

    it('should handle requests with query parameters', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = '{"test": "data"}'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          param1: 'value1',
          param2: 'value2',
        },
      })

      await handler(req, res)

      // Query parameters shouldn't affect the response since they're not used
      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toBe(mockFileContents)
    })
  })

  describe('Path Construction', () => {
    it('should construct correct file path', async () => {
      const mockFileContents = '{"test": "data"}'

      mockedPath.join.mockImplementation((...args) => {
        if (args[0] === process.cwd() && args[1] === 'json') {
          return '/correct/path/json'
        }
        return args.join('/')
      })
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(mockedPath.join).toHaveBeenCalledWith(process.cwd(), 'json')
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        '/correct/path/json/data.json',
        'utf8'
      )
    })
  })

  describe('Response Headers', () => {
    it('should set correct content-type for JSON response', async () => {
      const mockJsonPath = '/mock/path/to/json'
      const mockFileContents = '{"test": "data"}'

      mockedPath.join.mockReturnValue(mockJsonPath)
      mockedFs.readFile.mockResolvedValue(mockFileContents)

      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(res.getHeader('content-type')).toContain('application/json')
    })
  })
})