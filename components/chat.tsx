'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PP6u5heb4Nh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image'
import { CardContent, Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useChat } from 'ai/react'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.map((m) => (
        <div key={m.id} className='whitespace-pre-wrap'>
          {m.content && (
            <div className='p-4 space-y-2'>
              <Card>
                <CardContent className='p-4 space-y-4'>
                  <div className='flex space-x-2 items-center'>
                    {/* <Image
                    alt='Avatar'
                    className='rounded-full overflow-hidden'
                    height='40'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '40/40',
                      objectFit: 'cover',
                    }}
                    width='40'
                  /> */}
                    <div className='font-semibold'>{m.role === 'user' ? 'User: ' : 'AI: '}</div>
                  </div>
                  <p className='text-sm leading-loose'>{m.content}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ))}

      <div className='p-4'>
        <form onSubmit={handleSubmit} className='flex space-x-2 items-end'>
          <Input className='flex-1' placeholder='Type a message...' value={input} onChange={handleInputChange} />
          {/* <Button type='submit'>Send</Button> */}
        </form>
      </div>
    </div>
  )
}
