import 'server-only'

import { OpenAI } from 'openai'
import { createAI, getMutableAIState, render } from 'ai/rsc'
import { z } from 'zod'
import Spinner from '@/components/ui/spinner'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// An example of a flight card component.
function FlightCard({ flightInfo }: { flightInfo: any }) {
  return (
    <div className='bg-blue-200 border-2 border-green-300'>
      <h2>- get_flight_info TOOL-</h2>
      <h2>Flight Information</h2>
      <p>Flight Number: {flightInfo.flightNumber}</p>
      <p>Departure: {flightInfo.departure}</p>
      <p>Arrival: {flightInfo.arrival}</p>
    </div>
  )
}

// An example of a function that fetches flight information from an external API.
async function getFlightInfo(flightNumber: string) {
  return {
    flightNumber,
    departure: 'New York',
    arrival: 'San Francisco',
  }
}

// A React SERVER ACTION that submits a user message to the AI and returns the generated UI.
async function submitUserMessage(userInput: string) {
  // Server Action
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  // Update the AI state with the new *USER* message, thereby providing the LLM with conversation context
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ])

  // The UI that will be displayed to the client
  // The `render()` creates a generated, streamable UI
  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [{ role: 'system', content: 'You are a flight assistant' }, ...aiState.get()],
    // Show a Spinner (loading) component to the client while the AI is processing the user input
    initial: <Spinner />,
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: 'assistant',
            content,
          },
        ])
      }

      // Return LLM response to the client.
      return <p>- TEXT, Not TOOL - {content}</p>
    },
    tools: {
      get_flight_info: {
        description: 'Get the information for a flight',
        parameters: z
          .object({
            flightNumber: z.string().describe('the number of the flight'),
          })
          .required(),
        render: async function* ({ flightNumber }) {
          // Fetch the flight information from an external API.
          const flightInfo = await getFlightInfo(flightNumber)

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_flight_info',
              // Content can be any string to provide context to the LLM in the rest of the conversation.
              content: JSON.stringify(flightInfo),
            },
          ])

          // Return the flight card to the client.
          return <FlightCard flightInfo={flightInfo} />
        },
      },
    },
  })

  return {
    id: Date.now(),
    role: 'assistant',
    display: ui,
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
  role: string
  display: React.ReactNode
}[] = []

// AI is a context provider you wrap your application with so you can access AI and UI state in your components
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
})
