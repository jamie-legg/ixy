import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStreams from "app/streams/queries/getStreams"

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
      <ul>
        {streams.map((stream) => (
          <li key={stream.id}>
            <Link href={Routes.ShowStreamPage({ streamId: stream.id })}>
              <a>{stream.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
          <Link href={Routes.NewStreamPage()}>
            <a>Create Stream</a>
          </Link>
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
