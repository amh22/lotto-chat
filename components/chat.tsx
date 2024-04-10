/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PP6u5heb4Nh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image'
import { CardContent, Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Chat() {
  return (
    <Card className='w-full max-w-lg mx-auto flex flex-col'>
      <CardContent className='flex flex-1 flex-col p-0'>
        <div className='flex-1 flex flex-col justify-between bg-gray-100 dark:bg-gray-850'>
          <div className='p-4 space-y-2'>
            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='flex space-x-2 items-center'>
                  <Image
                    alt='Avatar'
                    className='rounded-full overflow-hidden'
                    height='40'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '40/40',
                      objectFit: 'cover',
                    }}
                    width='40'
                  />
                  <div className='font-semibold'>You</div>
                </div>
                <p className='text-sm leading-loose'>Hi there! I'm the Vercel chatbot. How can I assist you today?</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='flex space-x-2 items-center'>
                  <Image
                    alt='Avatar'
                    className='rounded-full overflow-hidden'
                    height='40'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '40/40',
                      objectFit: 'cover',
                    }}
                    width='40'
                  />
                  <div className='font-semibold'>Vercel</div>
                </div>
                <p className='text-sm leading-loose'>
                  I'm here to help you with any questions you have about Vercel. Feel free to ask!
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='p-4'>
            <form className='flex space-x-2 items-end'>
              <Input
                className='flex-1'
                placeholder='Type a message...'
                style={{
                  minWidth: 0,
                }}
              />
              <Button type='submit'>Send</Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
