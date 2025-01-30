import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'

export default function ResumeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showWelcomeToast, setShowWelcomeToast] = useState(true)
  const [isMobile, setIsMobile] = useState(true) // Default to mobile to prevent flash
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your RAG based AI assistant. Feel free to ask me anything about Daksh's experience, skills, or projects!"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Handle initial state and window resize
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setIsOpen(true)
        setShowWelcomeToast(false)
      }
    }

    // Set initial state
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Welcome Toast for Mobile */}
      <AnimatePresence>
        {showWelcomeToast && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-3">
              <FaRobot className="h-6 w-6 text-primary" />
              <p className="flex-1">Hi! I can help you learn more about Daksh&apos;s experience!</p>
              <button 
                onClick={() => setShowWelcomeToast(false)}
                className="text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button and Window */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
      >
        <FaRobot className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 w-[calc(100%-3rem)] md:w-96 max-h-[80vh] md:max-h-none bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold">Ask me anything about Daksh</h3>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}