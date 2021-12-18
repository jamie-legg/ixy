import { Fragment, useState, useContext, Suspense } from "react"
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

const navigation = [
  { name: "Home", href: "/", activeIcon: HomeIconSolid, icon: HomeIcon, current: false },
  { name: "Just Me", href: "/me", activeIcon: UserIconSolid, icon: UserIcon, current: true },
  { name: "Yan (AI)", href: "#", activeIcon: CodeIconSolid, icon: CodeIcon, current: false },
  { name: "My Friends", href: "#", activeIcon: UsersIconSolid, icon: UsersIcon, current: false },
  { name: "Global Streams", href: "#", activeIcon: GlobeAltIconSolid, icon: GlobeAltIcon, current: false },
  { name: "Create New", href: "#", activeIcon: PlusIconSolid, icon: PlusIcon, current: false },
]

export default function SideBar(props) {
  const [logoutMutation] = useMutation(logout)
  const [currentNavigation, setCurrentNavigation] = useState(navigation[0])

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

  function updateRoom(room) {
    props.setRoomSelect(room)
    socket!.emit("room::join", { room })
  }

  return (
    <>
              <Fade duration={200}>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4"></div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                <div
                  key={item.name}
                  onClick={() => updateRoom(item.name)}
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
                    item.current ? "font-bold" : "text-gray-400", "")}
                    >
                      {item.name}
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
      </Fade>
    </>
  )
}
