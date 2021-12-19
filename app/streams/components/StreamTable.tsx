import { PlusCircleIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import { usePaginatedQuery, useRouter } from "blitz"
import getStreamCategory from "../queries/getStreamCategory";
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
  const [streams] = usePaginatedQuery(getStreamCategory, {
    type,
    id: currentUser?.id
  })
  return(
    <div className="flex flex-col bg-ixy-700 p-12 rounded-2xl w-max">
          <div className="w-full h-screen bg-ixy-900">
      <div className="w-full flex lowercase text-2xl text-ixy-100 text-center">
      {streams.length} {type} stream{streams.length > 1 ? "s" : ""}
      <button className="bg-transparent flex hover:bg-ixy-800 text-ixy-800 font-semibold hover:text-ixy-100 py-2 px-4 border border-ixy-800 hover:border-transparent rounded">
        <PlusCircleIcon className={`w-6 h-6 mr-2`} />
        <a href="/streams/new">new</a>
      </button>
    </div>
    </div>
    {streams.map((stream, index) => (
        <div className="flex w-full bg-ixy-600">
          <h2 className="text-xl text-gray-900 dark:text-ixy-100 mx-2">#{stream.id}:</h2>
          <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.name}</h2>
          <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.ownerId}</h2>
          <h2 className="text-2xl lowercase font-bold rounded-lg px-2 h-max bg-ixy-100 text-gray-900 dark:text-ixy-900">{stream.type}</h2>
          <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.createdAt.toDateString()}</h2>
          <h2 className="text-xl text-gray-900 dark:text-ixy-100">{stream.updatedAt.toDateString()}</h2>
        </div>
    ))}

    <div className="fixed right-0 bottom-0">
      <div className="w-full h-full bg-ixy-100">
        <input className="w-full h-full bg-transparent text-2xl text-ixy-900 text-center" type="text" placeholder="Chat"/>
      </div>
    </div>

    </div>
  )
}
export default StreamTable;





