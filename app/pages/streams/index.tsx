import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStreams from "app/streams/queries/getStreams"
import Table from "app/core/components/Table"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/outline"
import { ChevronLeftIcon as ChevronLeftIconSolid, ChevronRightIcon as ChevronRightIconSolid, PlusCircleIcon, PlusIcon as PlusIconSolid } from "@heroicons/react/solid"

const ITEMS_PER_PAGE = 100

export const StreamsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ streams, hasMore }] = usePaginatedQuery(getStreams, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>

    <h1>Page: {page}</h1>
    <div className="w-full h-full flex justify-center place-content-center">
      <button disabled={page === 0} onClick={goToPreviousPage}>
        <ChevronLeftIcon className="w-12 h-12 text-black"/>
      </button>
      <Link href={Routes.NewStreamPage()}>
      <PlusIcon className="w-12 h-12 text-black"/>
          </Link>
      <button disabled={!hasMore} onClick={goToNextPage}>
      <ChevronRightIcon className="w-12 h-12 text-black"/>
      </button>
      </div>
      <Table headings={['name', 'owner', 'status', 'type']} body={streams} />
    </div>
  )
}

const StreamsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Streams</title>
      </Head>

      <div>
        <p>

        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <StreamsList />
        </Suspense>
      </div>
    </>
  )
}

StreamsPage.authenticate = true
StreamsPage.getLayout = (page) => <Layout>{page}</Layout>

export default StreamsPage
