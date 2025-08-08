import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/send'

// Mock the request module
jest.mock('request', () => {
  return jest.fn()
})

const mockRequest = require('request')

// Mock environment variables
process.env.SENDINBLUE_APIKEY = 'test-api-key'

describe('/api/send - Simplified Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Email Validation', () => {
    it('should reject invalid email addresses', async () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@domain.com',
        'test.domain.com',
        '',
      ]

      for (const email of invalidEmails) {
        const { req, res } = createMocks({
          method: 'POST',
          body: {
            contactEmail: email,
            contactName: 'Test User',
            contactSubject: 'Test Subject',
            contactMessage: 'Test Message',
          },
        })

        await handler(req, res)

        expect(res._getStatusCode()).toBe(400)
        const data = JSON.parse(res._getData())
        expect(data.msg).toBe('Error in Email')
      }
    })

    it('should accept valid email addresses and process them', async () => {
      // Mock successful API response
      mockRequest.mockImplementation((options, callback) => {
        callback(null, { statusCode: 200, body: 'success' })
      })

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          contactEmail: 'test@example.com',
          contactName: 'John Doe',
          contactSubject: 'Test Subject',
          contactMessage: 'This is a test message',
        },
      })

      await handler(req, res)

      // Should not return 400 (bad request)
      expect(res._getStatusCode()).toBe(200)
    })
  })

  describe('API Integration', () => {
    it('should construct correct email payload', async () => {
      let capturedOptions

      mockRequest.mockImplementation((options, callback) => {
        capturedOptions = options
        callback(null, { statusCode: 200, body: 'success' })
      })

      const validEmailData = {
        contactEmail: 'test@example.com',
        contactName: 'John Doe',
        contactSubject: 'Test Subject',
        contactMessage: 'This is a test message',
      }

      const { req, res } = createMocks({
        method: 'POST',
        body: validEmailData,
      })

      await handler(req, res)

      expect(capturedOptions).toBeDefined()
      expect(capturedOptions.uri).toBe('https://api.sendinblue.com/v3/smtp/email')
      expect(capturedOptions.method).toBe('POST')
      expect(capturedOptions.headers['Content-Type']).toBe('application/json')
      expect(capturedOptions.headers['api-key']).toBe('test-api-key')

      const payload = JSON.parse(capturedOptions.body)
      expect(payload.sender.name).toBe(validEmailData.contactName)
      expect(payload.sender.email).toBe('test@sendinblue.com')
      expect(payload.to[0].email).toBe('alimaslax.web@gmail.com')
      expect(payload.subject).toBe(validEmailData.contactSubject)
      expect(payload.htmlContent).toContain(validEmailData.contactMessage)
      expect(payload.htmlContent).toContain(validEmailData.contactEmail)
    })
  })

  describe('Content Sanitization', () => {
    it('should sanitize message content', async () => {
      let capturedOptions

      mockRequest.mockImplementation((options, callback) => {
        capturedOptions = options
        callback(null, { statusCode: 200, body: 'success' })
      })

      const maliciousData = {
        contactEmail: 'test@example.com',
        contactName: 'John Doe',
        contactSubject: 'Test Subject',
        contactMessage: 'Test <script>alert("xss")</script> message! @#$%^&*()',
      }

      const { req, res } = createMocks({
        method: 'POST',
        body: maliciousData,
      })

      await handler(req, res)

      const payload = JSON.parse(capturedOptions.body)
      // Should remove special characters but keep letters and spaces
      expect(payload.htmlContent).toContain('Test scriptalertxssscript message')
      expect(payload.htmlContent).not.toContain('<script>')
      expect(payload.htmlContent).not.toContain('@#$%^&*()')
    })
  })
})