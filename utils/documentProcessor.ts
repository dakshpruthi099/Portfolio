import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { Pinecone } from "@pinecone-database/pinecone"
import path from 'path'
import { PINECONE_CONFIG, DOCUMENT_PROCESSOR_CONFIG } from './constants'

const PINECONE_INDEX_NAME = PINECONE_CONFIG.INDEX_NAME

export async function processDocument() {
  if (!process.env.PINECONE_API_KEY || !process.env.OPENAI_API_KEY) {
    throw new Error('Missing required environment variables')
  }

  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    })

    const loader = new PDFLoader(path.join(process.cwd(), 'public', 'DakshPruthiResume.pdf'))
    const rawDocs = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    })
    const docs = await textSplitter.splitDocuments(rawDocs)

    const index = pinecone.Index(PINECONE_INDEX_NAME)
    
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    })
    
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: 'resume'
    })
  } catch (error) {
    console.error('Error processing document:', error)
    throw error
  }
}

export async function queryDocuments(query: string) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  const index = pinecone.Index(PINECONE_INDEX_NAME)
  
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  })

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: 'resume'
  })

  const results = await vectorStore.similaritySearch(query, 5)
  return results
}