import { ChevronDoubleDownIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { SocketContext } from "app/context/socket";
import { useMutation, usePaginatedQuery, useRouter } from "blitz";
import { useContext, useEffect, useState } from "react";
import getMessages from "../queries/getMessages";
import createMessage from "../mutations/createMessage";
import Typical from "react-typical";
import { Stream } from "@prisma/client";
const ITEMS_PER_PAGE = 100

interface IMessageBoxProps {
  s: Stream | undefined;
}

const MessageBox = ({ s }: IMessageBoxProps) => {
  const [] = useMutation(createMessage)
  const router = useRouter();
  const page = Number(router.query.page) || 0
  const [{ messages, hasMore }] = s && s.messageCount > 0 ? usePaginatedQuery(getMessages, {
    where: { stream: { id: s.id! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  }) : [{ messages: [], hasMore: false }]
  const [messageState, setMessageState] = useState(messages as unknown as string[]);
  const [createMessageMutation] = useMutation(createMessage);


  const [message, setMessage] = useState("")
  const [messageMap, setMessageMap] = useState<string[]>([])

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket?.connect();
    socket!.on("message", (message) => {
      console.log("NEW MESSAGE FROM WS" + message)
    })
    console.log(
      socket?.emit("message", {
        message: "hello",
        stream: s?.id,
      })
    );

  }, [])
  return (
    s === undefined ?
      <code><Typical steps={[
        "select a stream to begin...", 1500,
      ]}></Typical></code> :
      <div className="w-full h-full transition-all">
        <code><Typical
          steps={[
            `connecting to stream #${s!.id}: "${s!.name}".`, 1000,
            `retrieving messages...`, 1000,
            s!.messageCount === 0 ? `no messages found.` : `${s!.messageCount} messages found.`, 1000,
          ]}
        /></code>
        <div className="w-full h-full rounded-lg">
          <form
            onSubmit={
              async (e) => {
                e.preventDefault();
                socket!.emit("room::message::send", {
                  message: message,
                  stream: s.id,
                  time: new Date().toISOString(),
                });
                const newMessage = await createMessageMutation({ body:message, streamId: s.id! })
                setMessageMap([...messageMap, message])
                setMessage("")
              }
            }
            className="flex w-full justify-center space-x-2"
          >

            <div className="flex flex-col w-full justify-between">
              <div className="flex flex-col w-full justify-between">
              {messageMap.map((message, index) => {
                return index % 2 === 0 ? (
                  <div key={index} className="flex w-full">
                    <div className="dark:text-ixy-100 lowercase text-xs">Jamie</div>
                    <div key={index} className="flex w-max rounded-lg p-2 m-2 bg-ixy-800 lowercase dark:text-ixy-100 flex-col items-left justify-left h-full">
                      <p>{message}</p>
                    </div>
                  </div>) :
                  (
                    <div key={index} className="flex w-full place-content-end">
                      <div className="flex w-max rounded-lg p-2 m-2 bg-ixy-100 lowercase dark:text-ixy-900 flex-col place-content-end items-end h-full">
                        <p>{message}</p>

                      </div>
                      <div className="dark:text-ixy-100 lowercase text-xs">yan</div>
                    </div>
                  )
              })}
              </div>
              <div className="fixed bottom-6 flex w-96 space-x-2.5">
              <input
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                value={
                  message
                }
                className="h-16 p-1 w-11/12 pl-4 dark:text-ixy-900 italic rounded-full dark:bg-ixy-100 placeholder-ixy-900 border-none"
                placeholder={"write your message..."} />
              <button type="submit" className="bg-ixy-800 px-5 py-2 text-sm shadow-sm w-24 font-medium tracking-wider  text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-100">
                <PaperAirplaneIcon className="w-6 h-6 inline-block" /> send
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}

export default MessageBox;
