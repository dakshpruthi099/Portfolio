import { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!data.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (data.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Message validation
    if (!data.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (data.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return { errors, validateForm }
}