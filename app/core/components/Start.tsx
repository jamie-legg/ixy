import Head from 'next/head'
import { Suspense, useState } from 'react'
import Boxes from '../components/Boxes'
import { Fade, Bounce, Flip } from "react-awesome-reveal";
import { UserInfo } from './UserInfo';

export default function Start() {
  const [isOpen, setIsOpen] = useState(false)
  const [box, setBox] = useState('me')
  const [username, setUsername] = useState('')

  return (
    <div className={`${!isOpen ? " " : "opacity-0 "} transition-opacity flex flex-col items-center justify-center min-h-screen py-2`}>
      <div className="flex flex-col items-left justify-center w-full flex-1 px-20 text-center">
        <div className={`left w-3/4 sm:mx-12 lg:mx-48`}>
          <Fade duration={1000}>

            <h1 className="text-6xl font-bold text-left">
              welcome to{' '}
              <a className="text-ixy-600 dark:text-ixy-800" href="https://nextjs.org">
                ixy<span className="text-ixy-100">.chat</span>:)
              </a>
            </h1>


          </Fade>
          <Fade duration={1500}>
            <p className="mt-30 text-2xl text-left">who are you going to chat to?</p>
          </Fade>
          <Suspense fallback={<div>Loading...</div>}>
              <UserInfo />
            </Suspense>
          <Fade duration={1500}>
            <Boxes expanded={isOpen} />
          </Fade>
          <div className='flex justify-between'>


            <p className="mt-30 text-2xl">select an option to <span className='text-ixy-800 font-bold transition-all hover:bg-ixy-600 hover:text-white'>get started &rarr;</span></p>

          </div>

        </div>

      </div>

    </div>
  )
}
