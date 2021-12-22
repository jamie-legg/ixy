import { ChevronDoubleDownIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { SocketContext } from "app/context/socket";
import SideBar from "app/core/components/Sidebar";
import StreamTable from "app/streams/components/StreamTable";
import { Suspense, useContext, useEffect, useState } from "react";
import Layout from "app/core/layouts/Layout";
const messages = [

]
const Yan = () => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket?.connect();
    socket!.on("message", (message) => {
      console.log(message)
    })
  }, [])

  const [streams, setStreams] = useState([
    {
      "name": "Untitled Stream",
    }
  ])
  let currentStream = streams[0]!;

  const [message, setMessage] = useState("")
  const [messageMap, setMessageMap] = useState<string[]>([])
  return (
    <div className="dark:bg-ixy-900 h-screen w-full">
      <SideBar currentNav={2} />
      <div className="container lg:pl-64">
        <div className="h-full w-full flex flex-col">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl m-4 font-bold text-gray-900 dark:text-ixy-100">
              🤖 yan is our resident AI, here to answer all of your questions and to inspire your creativity
            </h2>
            <div className="w-full flex">
              <div className="w-96 rounded-lg lowercase bg-ixy-700 dark:text-ixy-100 h-1/2">
                <div className="w-full h-full bg-ixy-600 rounded-lg font-bold">your ai streams</div>
                {streams.map(stream => {
                  return (
                    <div>{stream.name}</div>
                  )
                })}
                <Suspense fallback={<div>loading</div>}>

                <StreamTable type={'AI'} />
                </Suspense>
              </div>
              <div className="w-3/4 h-max transition-all">
                Connected to {currentStream.name}
                <form
                  onSubmit={
                    (e) => {
                      e.preventDefault();
                      socket!.emit("room::message::send", {
                        message: message,
                        stream: "",
                        time: new Date().toISOString(),
                      });
                      setMessageMap([...messageMap, message])
                      setMessage("")
                    }
                  }
                  className="flex w-full justify-center space-x-2 py-24">
                  <input
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    value={
                      message
                    }
                    className="h-12 p-1 w-full dark:text-ixy-100 rounded-lg dark:bg-ixy-600 placeholder-ixy-200 border-none" placeholder="write your message" />
                  <button className="bg-ixy-800 text-lg w-12 rounded-full h-12 dark:text-ixy-100">
                    <ChevronDoubleDownIcon className="w-6 h-6 mb-1 ml-2.5" />
                    </button>
                </form>
                <div className="flex flex-col-reverse w-full justify-center space-x-2">
                  {messageMap.map((message, index) => {
                    return index % 2 === 0 ? (
                      <div className="flex w-full">
                        <div className="dark:text-ixy-100 lowercase text-xs">Jamie</div>
                        <div key={index} className="flex w-max rounded-lg p-2 m-2 bg-ixy-800 lowercase dark:text-ixy-100 flex-col items-left justify-left h-full">
                          <p>{message}</p>
                        </div>
                      </div>) :
                      (
                        <div className="flex w-full justify-end">
                          <div key={index} className="flex w-max rounded-lg p-2 m-2 bg-ixy-100 lowercase dark:text-ixy-900 flex-col place-content-end items-end h-full">
                            <p>{message}</p>

                          </div>
                          <div className="dark:text-ixy-100 lowercase text-xs">yan</div>
                        </div>
                      )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Yan.authenticate = true;
Yan.getLayout = (page) => <Layout>{page}</Layout>

export default Yan;
