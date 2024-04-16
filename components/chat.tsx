'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PP6u5heb4Nh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState } from 'react'
import { useUIState, useActions } from 'ai/rsc'
import { AI } from '@/app/action'
import Image from 'next/image'
import { CardContent, Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// import { useChat } from 'ai/react'

export function Chat() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  console.log('🚀 ~ Chat ~ messages:', messages)
  const { submitUserMessage } = useActions<typeof AI>()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    // Add user message to UI state
    setMessages((currentMessages: any) => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <div>{inputValue}</div>,
      },
    ])

    // Submit and get response message
    const responseMessage = await submitUserMessage(inputValue)
    setMessages((currentMessages: any) => [...currentMessages, responseMessage])

    setInputValue('')
  }

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.map((m) => (
        <div key={m.id} className='whitespace-pre-wrap'>
          {m.display && (
            <div className='p-4 space-y-2'>
              <Card>
                <CardContent className='p-4 space-y-4'>
                  <div className='flex space-x-2 items-center'>
                    <div className='font-semibold'>{m.role === 'user' ? 'User: ' : 'AI: '}</div>
                  </div>
                  <p className='text-sm leading-loose'>{m.display}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ))}

      <div className='p-4'>
        <form onSubmit={handleSubmit} className='flex space-x-2 items-end'>
          <Input
            className='flex-1'
            placeholder='Type a message...'
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
          />
          {/* <Button type='submit'>Send</Button> */}
        </form>
      </div>
    </div>
  )
}
