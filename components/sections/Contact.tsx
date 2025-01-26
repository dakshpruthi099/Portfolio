import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Notification from '../ui/Notification'
import { useFormValidation } from '@/hooks/useFormValidation'

// Initialize EmailJS
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
})

const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
}

// Add validation
if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
  console.error('Missing EmailJS configuration')
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { errors, validateForm } = useFormValidation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm(formData)) {
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId as string,
        EMAILJS_CONFIG.templateId as string,
        formRef.current!,
        EMAILJS_CONFIG.publicKey as string
      )
      setNotification({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      })
      formRef.current?.reset()
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error(error)
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly @dakshpruthicareeers@gmail.com.'
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setNotification(null), 5000) // Hide notification after 5 seconds
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, 
                I&apos;ll try my best to get back to you!
              </p>
              
              <div className="flex gap-4 mb-8">
                <a
                  href="https://github.com/dakshpruthi099"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/dakshpruthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/elonmusk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a
                  href="mailto:dakshpruthicareers@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  <FaEnvelope className="h-6 w-6" />
                </a>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'dark:border-gray-700'
                  } bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              <AnimatePresence>
                {notification && (
                  <Notification
                    type={notification.type}
                    message={notification.message}
                  />
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}