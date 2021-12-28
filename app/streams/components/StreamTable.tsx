import { ChartBarIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import { Routes, usePaginatedQuery, useRouter } from "blitz"
import getStreamCategory from "../queries/getStreamsFromType";
import getStreams from "../queries/getStreams";
import { ChatAlt2Icon, ChatIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, CodeIcon, EyeIcon, EyeOffIcon, GlobeAltIcon, QuestionMarkCircleIcon, SearchCircleIcon } from "@heroicons/react/solid";
import MessageBox from "app/messages/components/MessageBox";
import { useState } from "react";
import Typical from "react-typical";
import { Stream } from "@prisma/client";


const StreamTable = ({ type }) => {
  const [ streamSelected, setStreamSelected ] = useState<Stream>()
  const headings = [
    "id",
    "name",
    "owner",
    "type",
    "created",
    "updated"
  ]
  let tableHeadings = headings.map((heading, index) => {
    return (
      <th key={index}
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {heading}
      </th>
    )
  })
  const router = useRouter();
  const currentUser = useCurrentUser();
  const page = Number(router.query.page) || 0;
  console.log("RETRIEVING STREAMS", currentUser, type);
  const [streams] = usePaginatedQuery(getStreamCategory, {
    type,
    id: currentUser?.id
  })
  return (
    <div className="flex flex-row">
    <div className="flex flex-col space-y-6 h-max bg-gradient-to-br from-ixy-700 to-ixy-900 p-12 rounded-2xl w-max">
      {streams.map((stream, index) => (
        <div
        onClick={() => {
        setStreamSelected(stream)}}
        className="cursor-pointer flex group hover:bg-ixy-800 flex-col w-96 h-max p-6 border-ixy-800 border-2 rounded-lg">
          <div className="flex justify-between">
          <div className="w-full">
            <h2 className="text-xl w-max flex flex-row h-6 font-bold text-gray-900 dark:text-ixy-100 mx-2">
              #{stream.id}
              {stream.type === "PRIVATE" ? <EyeOffIcon className="inline-block text-ixy-800 w-6 h-6" />
                : stream.type === "PUBLIC" ? <GlobeAltIcon className="inline-block w-6 h-6" />
                  : stream.type === "AI" ? <CodeIcon className="inline-block w-6 h-6" />
                    : <ChatIcon />}
                          <span className="italic ml-6 inline-block">
                &nbsp;
            </span>
              <span className="w-36 -ml-3 break-all italic">"{stream.name}"</span>
            </h2>

          </div>


          <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.updatedAt.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}
            </h2>
            </div>
          <div className="flex justify-between w-full">
            <div
              className="
          border-ixy-100 border-2 text-xl rounded-lg px-2 pb-2 mt-2 text-ixy-100
          "><ChartBarIcon className="inline-block w-6 h-6 mr-2" />
          <span className="mt-2">{stream.messageCount}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                router.push(Routes.ShowStreamPage({ streamId: stream.id }))
              }}
              className="
          bg-ixy-800 text-2xl font-bold rounded-lg px-2 pb-2 mt-2 text-ixy-100
          "><EyeIcon className="inline-block w-6 h-6" /></button>
            <button
              onClick={() => {
                router.push(Routes.ShowStreamPage({ streamId: stream.id }))
              }}
              className="
          bg-ixy-100 text-2xl font-bold rounded-lg px-2 pb-2 mt-2 text-ixy-900
          "><ChevronDoubleRightIcon className="inline-block w-6 h-6" /></button>
          </div>
          </div>
        </div>
      ))}
          </div>

      <div className="h-screen w-full">
        <MessageBox s={streamSelected} />
      </div>


    </div>
  )
}
export default StreamTable;





