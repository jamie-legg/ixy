import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReply from "app/replies/queries/getReply"
import deleteReply from "app/replies/mutations/deleteReply"

export const Reply = () => {
  const router = useRouter()
  const replyId = useParam("replyId", "number")
  const messageId = useParam("messageId", "number")
  const [deleteReplyMutation] = useMutation(deleteReply)
  const [reply] = useQuery(getReply, { id: replyId })

  return (
    <>
      <Head>
        <title>Reply {reply.id}</title>
      </Head>

      <div>
        <h1>Reply {reply.id}</h1>
        <pre>{JSON.stringify(reply, null, 2)}</pre>

        <Link href={Routes.EditReplyPage({ messageId: messageId!, replyId: reply.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteReplyMutation({ id: reply.id })
              router.push(Routes.RepliesPage({ messageId: messageId! }))
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowReplyPage: BlitzPage = () => {
  const messageId = useParam("messageId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.RepliesPage({ messageId: messageId! })}>
          <a>Replies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Reply />
      </Suspense>
    </div>
  )
}

ShowReplyPage.authenticate = true
ShowReplyPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowReplyPage
