import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStream from "app/streams/mutations/createStream"
import { StreamForm, FORM_ERROR } from "app/streams/components/StreamForm"

const NewStreamPage: BlitzPage = () => {
  const router = useRouter()
  const [createStreamMutation] = useMutation(createStream)

  return (
    <div>
      <h1>Create New Stream</h1>

      <StreamForm
        submitText="Create Stream"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateStream}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const stream = await createStreamMutation(values)
            router.push(Routes.ShowStreamPage({ streamId: stream.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.StreamsPage()}>
          <a>Streams</a>
        </Link>
      </p>
    </div>
  )
}

NewStreamPage.authenticate = true
NewStreamPage.getLayout = (page) => <Layout title={"Create New Stream"}>{page}</Layout>

export default NewStreamPage
