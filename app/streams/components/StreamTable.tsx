import { PlusCircleIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import { usePaginatedQuery, useRouter } from "blitz"
import getStreamCategory from "../queries/getStreamsFromType";
import getStreams from "../queries/getStreams";

const StreamTable = ({ type }) => {
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
  return(
    <div className="flex flex-col bg-ixy-900 p-12 rounded-2xl w-max">
          <div className="w-full h-screen bg-ixy-700">
      <div className="w-full flex lowercase text-2xl text-ixy-100 text-center">
      <button className="bg-transparent flex hover:bg-ixy-800 text-ixy-800 font-semibold hover:text-ixy-100 py-2 px-4 border border-ixy-800 hover:border-transparent rounded">
        <PlusCircleIcon className={`w-6 h-6 mr-2`} />
        <a href="/streams/new">new</a>
      </button>

    </div>
    {streams.map((stream, index) => (
        <div className="flex flex-col w-96 bg-ixy-900">
          <div className="flex justify-between w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-ixy-100 mx-2">#{stream.id}: <span className="font-normal">{stream.name} ({stream.messageCount} messages)</span></h2>
            <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.updatedAt.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}</h2>
          </div>
          <h2 className="text-2xl lowercase font-bold rounded-lg px-2 h-max bg-ixy-800 text-gray-900 dark:text-ixy-900">{stream.type}</h2>
        </div>
    ))}
    </div>


    <div className="fixed right-0 bottom-0">
      <div className="w-full h-full bg-ixy-100">
        <input className="w-full h-full bg-transparent text-2xl text-ixy-900 text-center" type="text" placeholder="Chat"/>
      </div>
    </div>

    </div>
  )
}
export default StreamTable;





