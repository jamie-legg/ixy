import { Fragment, useState, useContext, Suspense } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline"
import { SocketContext } from "../context/socket"
import { Image } from "blitz"
import { UserInfo } from "./UserInfo"

const navigation = [
  { name: "Room 1", href: "#", icon: HomeIcon, current: true },
  { name: "Room 2", href: "#", icon: UsersIcon, current: false },
  { name: "Room 3", href: "#", icon: FolderIcon, current: false },
  { name: "Room 4", href: "#", icon: CalendarIcon, current: false },
  { name: "Room 5", href: "#", icon: InboxIcon, current: false },
  { name: "Room 6", href: "#", icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function SideBar(props) {
  const socket = useContext(SocketContext)

  function updateRoom(room) {
    props.setRoomSelect(room)
    socket!.emit("room::join", { room })
  }

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4"></div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  onClick={() => updateRoom(item.name)}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group cursor-pointer flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </div>
              ))}
            </nav>
            <button
              className="h-10 uppercase px-5 m-2 text-indigo-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800 font-bold"
              onClick={() => props.disconnect()}
            >
              Leave
            </button>
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
