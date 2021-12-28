import { Fragment, useState, useContext, Suspense, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  CalendarIcon,
  ChartBarIcon,
  CodeIcon,
  FolderIcon,
  GlobeAltIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline"
import { SocketContext } from "../../context/socket"
import { Image, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { UserInfo } from "./UserInfo"
import Link from "next/link"
import { DotsHorizontalIcon, ExternalLinkIcon, LogoutIcon } from "@heroicons/react/solid"
import { Fade } from "react-awesome-reveal"
import { classNames } from "../utils/utils"
import { HomeIcon as HomeIconSolid, UserIcon as UserIconSolid, CodeIcon as CodeIconSolid, UsersIcon as UsersIconSolid, GlobeAltIcon as GlobeAltIconSolid, PlusIcon as PlusIconSolid } from "@heroicons/react/solid";
import NewStreamDialog from "app/streams/components/NewStreamPopover"

const navigation = [
  { name: "home", href: "/", activeIcon: HomeIconSolid, icon: HomeIcon, current: false },
  { name: "just me", href: "/me", activeIcon: UserIconSolid, icon: UserIcon, current: true },
  { name: "yan (AI)", href: "/yan", activeIcon: CodeIconSolid, icon: CodeIcon, current: false },
  { name: "my friends", href: "/friends", activeIcon: UsersIconSolid, icon: UsersIcon, current: false },
  { name: "global streams", href: "/global", activeIcon: GlobeAltIconSolid, icon: GlobeAltIcon, current: false },
  { name: "create new", href: "/streams/new", activeIcon: PlusIconSolid, icon: PlusIcon, current: false },
]

export default function SideBar({ currentNav }) {
  const [logoutMutation] = useMutation(logout)
  const [currentNavigation, setCurrentNavigation] = useState(navigation[currentNav || 0])
  const [createStreamModalOpen, setCreateStreamModalOpen] = useState(false)
  useEffect(() => {
    let tempNavigation = navigation
    tempNavigation.forEach((nav) => {
      nav.current = false
    })
    tempNavigation[currentNav]!.current = true
    setCurrentNavigation(tempNavigation[currentNav]!)
  }, [currentNav])
  const changeNavigation = (changeToNavName) => {
    const currentNav = navigation
    navigation.forEach((nav) => {
      nav.current = false
    })
    let newNav = currentNav.find((nav) => nav.name === changeToNavName)
    newNav!.current = true
    setCurrentNavigation(newNav)
  }

  const socket = useContext(SocketContext)

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col-reverse md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white dark:border-ixy-600 dark:bg-ixy-900 dark:text-ixy-100">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4"></div>
            <h1 className="uppercase font-bold text-3xl px-4">ixy<span className="text-ixy-800 ml-1">:)</span></h1>
            <h2 className="text-sm font-thin px-4">chat with friends and ai</h2>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item, index) => index === navigation.length - 1 ?
                  <div key={index} className="bg-ixy-800 w-full p-2 uppercase font-bold rounded-lg">
                  <Suspense fallback={<div>Loading...</div>}>
                  <NewStreamDialog />
                  </Suspense>
                  </div>
                   :
              (
                <Link href={index === navigation.length-1? "" : item.href} key={item.name}>
                <div
                  key={item.name}
                  onClick={() => index === navigation.length-1? setCreateStreamModalOpen(true) : null}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-black"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group cursor-pointer flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >

                  {
                    item.current?
                    <item.activeIcon
                    className={classNames(
                      item.current ? "text-black" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  /> :
                  <item.icon
                    className={classNames(
                      item.current ? "text-black" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                }
                  <span className={classNames(
                    item.current ? "font-bold" : "text-gray-400", "flex justify-between w-full")}
                    >
                      {item.name}

                      {item.current ? <span className="w-1 bg-ixy-300"></span> : ""}
                  </span>

                </div>
                </Link>
              ))}
              </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div></div>
                <div className="ml-3">
                  <Suspense fallback="Loading...">
                    <UserInfo />
                  </Suspense>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
