import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createReply from "app/replies/mutations/createReply"
import { ReplyForm, FORM_ERROR } from "app/replies/components/ReplyForm"

const NewReplyPage: BlitzPage = () => {
  const router = useRouter()
  const messageId = useParam("messageId", "number")
  const [createReplyMutation] = useMutation(createReply)

  return (
    <div>
      <h1>Create New Reply</h1>

      <ReplyForm
        submitText="Create Reply"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateReply}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const reply = await createReplyMutation({ ...values, messageId: messageId! })
            router.push(Routes.ShowReplyPage({ messageId: messageId!, replyId: reply.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RepliesPage({ messageId: messageId! })}>
          <a>Replies</a>
        </Link>
      </p>
    </div>
  )
}

NewReplyPage.authenticate = true
NewReplyPage.getLayout = (page) => <Layout title={"Create New Reply"}>{page}</Layout>

export default NewReplyPage
