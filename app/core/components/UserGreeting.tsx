import { IdentificationIcon } from "@heroicons/react/solid";
import { Suspense } from "react"
import Username from "./Username"

const UserGreeting =  () => {
  return (
    <div className="flex">
    <h1 className="text-4xl font-bold text-right">
    <Suspense
      fallback={<div>Loading...</div>}
    >
      👋 welcome back <Username />
    </Suspense>
  </h1>
  <button className="ml-2 bg-ixy-100 hover:bg-ixy-200 text-ixy-900 h-max w-max font-bold py-2 px-4 rounded flex my-auto">
    <IdentificationIcon className="w-6 h-6 mr-2 " /> change username
  </button>
  </div>
  )
}
export default UserGreeting;
