import { ChevronDoubleDownIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { SocketContext } from "app/context/socket";
import SideBar from "app/core/components/Sidebar";
import StreamTable from "app/streams/components/StreamTable";
import { Suspense, useContext, useEffect, useState } from "react";
import Layout from "app/core/layouts/Layout";
const messages = [

]
const Yan = () => {


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
            <Suspense
                  fallback={
                    <div>Loading...</div>}
                    >
                  <StreamTable type={'AI'} />
                    </Suspense>

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
