export const PINECONE_CONFIG = {
  INDEX_NAME: 'portfolio-chat',
  NAMESPACE: 'resume'
} as const

export const CHAT_CONFIG = {
  MAX_TOKENS: 200,
  TEMPERATURE: 0.7
} as const

export const DOCUMENT_PROCESSOR_CONFIG = {
  CHUNK_SIZE: 1000,
  CHUNK_OVERLAP: 200
} as const 