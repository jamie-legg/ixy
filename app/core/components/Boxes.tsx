import { CodeIcon, GlobeAltIcon, PlusCircleIcon, UserGroupIcon, UserIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Boxes({ expanded }) {
    return(
          <div className="flex flex-wrap my-6 w-full justify-center">
            <Link href={'/me'}>
              <a className="cursor-pointer p-6 mt-6 text-left border w-96 mr-6 rounded-xl hover:text-rose-600 focus:text-rose-600">
                <h3 className="text-2xl font-bold flex">
                  <UserIcon className="w-8 h-8 text-rose-600 mr-4" />
                  myself &rarr;
                  </h3>
                  <p className="mt-4 text-xl">
                    Work on your personal masterpiece.
                  </p>
              </a>
          </Link>
          <Link href={'/ai'}>
          <a
            className="cursor-pointer p-6 mt-6 text-left border w-96 rounded-xl hover:text-rose-600 focus:text-rose-600"
          >
            <h3 className="text-2xl font-bold flex">
                <CodeIcon className="w-8 h-8 text-rose-600 mr-4" />
                AI - meet yan &rarr;</h3>
            <p className="mt-4 text-xl">
             Performs a wide array of natural language tasks with GPT-3.
            </p>
          </a>
          </Link>

          <Link href={'/friends'}>
            <a
            className="cursor-pointer p-6 mt-6 text-left border w-96 mr-6 rounded-xl hover:text-rose-600 focus:text-rose-600"
          >
            <h3 className="text-2xl font-bold flex">
                <UserGroupIcon className="w-8 h-8 text-rose-600 mr-4" />
                friends &rarr;</h3>
            <p className="mt-4 text-xl">
            Create streams and synchronise them with your friends.
            </p>
          </a>
          </Link>

          <Link href={'/global'}>
            <a
            className="cursor-pointer p-6 mt-6 text-left border w-96 rounded-xl hover:text-rose-600 focus:text-rose-600"
          >
            <h3 className="text-2xl font-bold flex">
                <GlobeAltIcon className="w-8 h-8 text-rose-600 mr-4" />
                everyone &rarr;</h3>
            <p className="mt-4 text-xl">
              Join a global community of worlds and streams.
            </p>
          </a>
          </Link>
        </div>
    )
}
