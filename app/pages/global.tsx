import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStreams from "app/streams/queries/getStreams"
import Table from "app/core/components/Table"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/outline"
import { ChevronLeftIcon as ChevronLeftIconSolid, ChevronRightIcon as ChevronRightIconSolid, PlusCircleIcon, PlusIcon as PlusIconSolid } from "@heroicons/react/solid"
import { StreamsList } from "./streams"
import SideBar from "app/core/components/Sidebar"

const ITEMS_PER_PAGE = 100

const GlobalPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Streams</title>
      </Head>
      <SideBar currentNav={4}/>
      <div className="lg:pl-64">
        <p>

        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <StreamsList />
        </Suspense>
      </div>
    </>
  )
}

GlobalPage.authenticate = true
GlobalPage.getLayout = (page) => <Layout>{page}</Layout>

export default GlobalPage
