import 'server-only'

import { OpenAI } from 'ai/openai'
import { createAI } from 'ai/rsc'
import { z } from 'zod'
import Spinner from '@/components/ui/spinner'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// An example of a function that fetches flight information from an external API.
async function getFlightInfo(flightNumber: string) {
  return {
    flightNumber,
    departure: 'New York',
    arrival: 'San Francisco',
  }
}

// EXPORT 'AI' CONTEXT PROVIDER & TYPE DEFINITIONS

// TYPE DEFINITIONS
// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

// AI is a context provider you wrap your application with so you can access AI and UI state in your components
export const AI = createAI({
  actions: {
    // Actions go here
  },
  initialUIState: [],
  initialAIState: [],
})
