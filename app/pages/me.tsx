import SideBar from "app/core/components/Sidebar";
import { Suspense, useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket"
import { Link } from "next/link";
import UserGreeting from "app/core/components/UserGreeting";
import { EyeOffIcon, AdjustmentsIcon, UserGroupIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon as AdjustmentsIconSolid, UserGroupIcon as UserGroupIconSolid, EyeOffIcon as EyeOffIconSolid, InformationCircleIcon } from "@heroicons/react/solid";
import { classNames } from "app/core/utils/utils";
import { usePaginatedQuery, useRouter } from "blitz";
import getStreams from "app/streams/queries/getStreams";
import StreamTable from "app/streams/components/StreamTable";
import Layout from "app/core/layouts/Layout";


interface IStream {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

const categories = [
  { name: "private streams", activeIcon: EyeOffIconSolid, icon: EyeOffIcon, current: true },
  { name: "friends & groups", activeIcon: UserGroupIconSolid, icon: UserGroupIcon, current: false },
  { name: "user preferences", activeIcon: AdjustmentsIcon, icon: AdjustmentsIconSolid, current: false }
]

function Me() {
  const [currentCategories, setCurrentCategories] = useState(categories)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const defaultStream: IStream = {
    id: "",
    name: "",
    slug: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  }

  const getMessages = () => {
    return []
  }

  const ITEMS_PER_PAGE = 10;
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const socket = useContext(SocketContext)!
  const [messages, setMessages] = useState<any[]>(getMessages())




  useEffect(() => {
    socket.on("room::message::send", ({ message, time }) => {
      setMessages([...messages, message])
    })
  }, [])

  const preferences = [
    {
      id: "",
      name: "",
      slug: "",
      createdAt: "",
      messageCount: 0,
    }
  ]

  const friends = [
    {
      id: "",
      name: "",
      slug: "",
      createdAt: "",
      messageCount: 0,
    }
  ]

  return (
    <div className="dark:bg-ixy-900">
      <SideBar currentNav={1}/>
        <div className="lg:pl-72 pt-4 dark:bg-ixy-900 dark:text-ixy-100 h-full overflow-hidden flex flex-col w-full place-content-end">
          <UserGreeting />
          <h2 className="py-12 text-xl"><InformationCircleIcon className="inline-block w-6 h-6 mx-2" />
          this is your private profile page, look at your notes (private streams), configure your groups of friends, or adjust your personal preferences</h2>
          <div className="flex w-full justify-around pb-6">
            {currentCategories.map((c, index) => (
              <div
                onClick={
                  () => {
                    let tempCategories = categories;
                    tempCategories.forEach((category) => {
                      category.current = false
                    })
                    tempCategories[index]!.current = true
                    setCurrentCategories(tempCategories)
                    setCategoryIndex(index)
                }}
              key={index} className={classNames(c.current? `border-ixy-800`: `border-ixy-900`, `flex border-b-2 cursor-pointer hover:border-ixy-800`)}>
                {c.current ? <c.activeIcon className="w-6 mx-3 h-8"/> : <c.icon className="w-6 mx-3 h-8"/>}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-ixy-100">{c.name}</h2>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full dark:bg-ixy-900">
            {
              categoryIndex === 0 ?(
              <div className="flex flex-col w-full justify-around">
                <Suspense
                  fallback={
                    <div className="h-screen w-full dark:bg-ixy-900">Loading...</div>}
                    >
                  <StreamTable type={'PRIVATE'} />
                    </Suspense>
              </div>)
              : categoryIndex === 1 ?
              (<div className="flex flex-col w-full justify-around">
                {friends.map((friend, index) => (
                  <div key={index} className="flex w-full justify-around">
                    <div className="flex w-full justify-around">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-ixy-100">{friend.name}</h2>
                    </div>
                  </div>
                ))}
              </div>)
              : (<div className="flex flex-col w-full justify-around">
                {preferences.map((preference, index) => (
                  <div key={index} className="flex w-full justify-around">
                    <div className="flex w-full justify-around">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-ixy-100">{preference.name}</h2>
                    </div>
                  </div>
                ))}
              </div>)}
              </div>
        </div>
    </div>
  )
}

Me.authenticate = true
Me.getLayout = (page) => <Layout>{page}</Layout>

export default Me
