import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AI } from './action'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import {
  Home as HomeIcon,
  Dices as DicesIcon,
  File as FileIcon,
  Store as MarketplaceIcon,
  LogInIcon as LogInIcon,
  Bell as BellIcon,
  Search as SearchIcon,
  Target as TargetIcon,
} from 'lucide-react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lottie AI',
  description: 'Lottie the AI chatbot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth()

  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
            <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
              <div className='flex h-full max-h-screen flex-col gap-2'>
                <div className='flex h-[60px] items-center border-b px-6'>
                  <Link className='flex items-center gap-2 font-semibold' href='#'>
                    <TargetIcon className='h-6 w-6' />
                    <span className=''>Acme Inc</span>
                  </Link>
                  <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
                    <BellIcon className='h-4 w-4' />
                    <span className='sr-only'>Toggle notifications</span>
                  </Button>
                </div>
                <div className='flex-1 overflow-auto py-2'>
                  <nav className='grid items-start px-4 text-sm font-medium'>
                    <Link
                      className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                      href='#'
                    >
                      <HomeIcon className='h-4 w-4' />
                      Home
                    </Link>
                    <Link
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                      href='#'
                    >
                      <DicesIcon className='h-4 w-4' />
                      Results
                    </Link>
                    <Link
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                      href='#'
                    >
                      <FileIcon className='h-4 w-4' />
                      Documents
                    </Link>
                    <Link
                      className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                      href='#'
                    >
                      <MarketplaceIcon className='h-4 w-4' />
                      Marketplace
                    </Link>
                    <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
                      {userId ? (
                        <UserButton afterSignOutUrl='/' />
                      ) : (
                        <>
                          <Link href='/sign-in'>
                            <Button>
                              Sign in
                              <LogInIcon className='w-4 h-4 ml-2' />
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </nav>
                </div>
                <div className='mt-auto p-4'>
                  <Card>
                    <CardHeader className='pb-4'>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className='w-full' size='sm'>
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
                <Link className='lg:hidden' href='#'>
                  <TargetIcon className='h-6 w-6' />
                  <span className='sr-only'>Home</span>
                </Link>
                <div className='w-full flex-1'>
                  <form>
                    <div className='relative'>
                      <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
                      <Input
                        className='w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950'
                        placeholder='Search files...'
                        type='search'
                      />
                    </div>
                  </form>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className='rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800'
                      size='icon'
                      variant='ghost'
                    >
                      <Image
                        alt='Avatar'
                        className='rounded-full'
                        height='32'
                        src='/placeholder.svg'
                        style={{
                          aspectRatio: '32/32',
                          objectFit: 'cover',
                        }}
                        width='32'
                      />
                      <span className='sr-only'>Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>
              <AI>{children}</AI>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
