import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { Pinecone } from "@pinecone-database/pinecone"
import path from 'path'

const PINECONE_INDEX_NAME = 'portfolio-chat'

export async function processDocument() {
  // Initialize Pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  // Load PDF
  const loader = new PDFLoader(path.join(process.cwd(), 'public', 'DakshPruthiResume.pdf'))
  const rawDocs = await loader.load()

  // Split text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })
  const docs = await textSplitter.splitDocuments(rawDocs)

  // Get the Pinecone index
  const index = pinecone.Index(PINECONE_INDEX_NAME)

  // Create and store embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  })
  
  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: 'resume'
  })
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

  const results = await vectorStore.similaritySearch(query, 3)
  return results
}