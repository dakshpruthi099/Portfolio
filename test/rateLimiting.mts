import type { StatusCounts } from '../types/api';

const testRateLimit = async () => {
  console.log('Starting rate limit test...')
  const requests = Array(150).fill(null)
  
  const { default: fetch } = await import('node-fetch')
  
  try {
    const results = await Promise.all(
      requests.map(async (_, index) => {
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `test message ${index}` })
        })
        return response.status
      })
    )
    
    const statusCounts = results.reduce((acc: StatusCounts, status) => {
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {} as StatusCounts)
    
    console.log('Status code distribution:', statusCounts)
  } catch (error) {
    console.error('Test failed:', error)
  }
}

await testRateLimit() 

export {} 