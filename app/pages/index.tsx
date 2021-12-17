import { Suspense, useContext, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SocketContext } from "../context/socket"
import ChatInput from "../core/components/ChatInput"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Sidebar from "../core/components/Sidebar"
import { MenuIcon } from "@heroicons/react/outline"
import Start from "../core/components/Start"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

function slugify(string) {
  return [...string]
    .map((letter, index) => {
      const code = letter.charCodeAt(0)
      if (code >= 65 && code <= 90 && string[index - 1]) {
        return `-${letter.toLowerCase()}`
      }

      return letter.toLowerCase()
    })
    .join("")
}

function getMessages() {
  return []
}

interface IStream {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

function Home() {
  const defaultStream: IStream = {
    id: "",
    name: "",
    slug: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  }
  const socket = useContext(SocketContext)!
  const [messages, setMessages] = useState<any[]>(getMessages())
  const [stream, setStream] = useState(defaultStream)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    socket.on("room::message::send", ({ message, time }) => {
      setMessages([...messages, message])
    })
  }, [])
  function join(room) {
    socket.emit("room::join", room)
  }
  function send(message) {
    console.log(stream)
    socket.emit("room::message::send", {
      room: stream,
      message: message,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    })
  }
  function exit() {
    {
      stream.name
    }
  }

  return (
    <>
      <div>
        <Sidebar join={join} setRoomSelect={setStream} exit={exit} />
        <Start />

        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            {/* <a onClick={() => updateRoom(room)}>
              <p>Room 1 test</p>
            </a> */}
            <div>{stream.name}</div>
            <div className="py-4 px-20 h-screen flex flex-col justify-between">
              <div className="flex flex-col space-y-2">
                {messages.map((m, i) => (
                  <p key={i}>{m}</p>
                ))}
              </div>
              <ChatInput send={send} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
