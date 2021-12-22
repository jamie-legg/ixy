import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReplies from "app/replies/queries/getReplies"

const ITEMS_PER_PAGE = 100

export const RepliesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const messageId = useParam("messageId", "number")
  const [{ replies, hasMore }] = usePaginatedQuery(getReplies, {
    where: { message: { id: messageId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
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

const RepliesPage: BlitzPage = () => {
  const messageId = useParam("messageId", "number")

  return (
    <>
      <Head>
        <title>Replies</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewReplyPage({ messageId: messageId! })}>
            <a>Create Reply</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <RepliesList />
        </Suspense>
      </div>
    </>
  )
}

RepliesPage.authenticate = true
RepliesPage.getLayout = (page) => <Layout>{page}</Layout>

export default RepliesPage
