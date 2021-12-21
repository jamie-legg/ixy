import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReply from "app/replies/queries/getReply"
import updateReply from "app/replies/mutations/updateReply"
import { ReplyForm, FORM_ERROR } from "app/replies/components/ReplyForm"

export const EditReply = () => {
  const router = useRouter()
  const replyId = useParam("replyId", "number")
  const messageId = useParam("messageId", "number")
  const [reply, { setQueryData }] = useQuery(
    getReply,
    { id: replyId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateReplyMutation] = useMutation(updateReply)

  return (
    <>
      <Head>
        <title>Edit Reply {reply.id}</title>
      </Head>

      <div>
        <h1>Edit Reply {reply.id}</h1>
        <pre>{JSON.stringify(reply, null, 2)}</pre>

        <ReplyForm
          submitText="Update Reply"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateReply}
          initialValues={reply}
          onSubmit={async (values) => {
            try {
              const updated = await updateReplyMutation({
                id: reply.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowReplyPage({ messageId: messageId!, replyId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditReplyPage: BlitzPage = () => {
  const messageId = useParam("messageId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditReply />
      </Suspense>

      <p>
        <Link href={Routes.RepliesPage({ messageId: messageId! })}>
          <a>Replies</a>
        </Link>
      </p>
    </div>
  )
}

EditReplyPage.authenticate = true
EditReplyPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditReplyPage
