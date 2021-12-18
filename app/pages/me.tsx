import SideBar from "app/core/components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket"
import { Link } from "next/link";


interface IStream {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function Me() {

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

  const socket = useContext(SocketContext)!
  const [messages, setMessages] = useState<any[]>(getMessages())
  const [stream, setStream] = useState(defaultStream)



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
      <SideBar join={join} setRoomSelect={setStream} exit={exit} />
        <div className="flex flex-col w-full h-48 place-content-end">
          <h1 className="text-4xl m-24 font-bold text-right">
            My Private Streams
            <Link href={`/streams/`}>
            <button className="bg-rose-500 text-xl hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full">
              View All
            </button>
            </Link>
          </h1>
          <p className="text-right">
            These are texts, notes, articles, and other bits and pieces created by you, only for you.
          </p>

        </div>
    </>
  )
}
