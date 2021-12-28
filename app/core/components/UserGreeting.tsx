import { IdentificationIcon } from "@heroicons/react/solid";
import { Suspense } from "react"
import Typical from "react-typical";
import { useCurrentUser } from "../hooks/useCurrentUser"



const UserGreeting =  (user?) => {
  const currentUser = useCurrentUser()
  return (
    <div className="flex w-full justify-between p-2">
    <h1 className="text-4xl font-bold text-right">
    <Suspense
      fallback={<div>Loading...</div>}
    >
      👋 welcome back <>{currentUser?.username || currentUser?.email.split("@")[0]}</>
    </Suspense>
  </h1>

  <button className="ml-2 mr-6 bg-ixy-100 hover:bg-ixy-200 text-ixy-900 h-max w-max font-bold py-2 px-4 rounded flex my-auto">
    <IdentificationIcon className="w-6 h-6 mr-2 " /> set username
  </button>
  </div>
  )
}

const UserGreetingWrapper = () => {
  return (
    <Suspense fallback={
      <div className="flex w-full justify-between p-2">
      <h1 className="text-4xl font-bold text-right flex">
        👋 welcome back <Typical
             steps={[
                     '...', 1000
                ]}
                wrapper="p"
                loop={1}
        />
    </h1>

    <button className="mr-6 bg-ixy-100 hover:bg-ixy-200 text-ixy-900 h-max w-max font-bold py-2 px-4 rounded flex my-auto">
      <IdentificationIcon className="w-6 h-6 mr-2 " /> set username
    </button>
    </div>
    }>
      <UserGreeting />
    </Suspense>
  )
}
export default UserGreetingWrapper;
