declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string
      PINECONE_API_KEY: string
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: string
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export {} 