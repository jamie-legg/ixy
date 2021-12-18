import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStream from "app/streams/mutations/createStream"
import { StreamForm, FORM_ERROR } from "app/streams/components/StreamForm"
import { CreateStream } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewStreamPage: BlitzPage = () => {
  const currentUser = useCurrentUser();
  const router = useRouter()
  const [createStreamMutation] = useMutation(createStream)

  return (
    <div>
      <h1>Create New Stream</h1>

      <StreamForm
        submitText="Create Stream"
        onSubmit={async (values) => {
          try {
            const stream = await createStreamMutation({
              name: values.name,
              owner: { id: currentUser!.id, role: currentUser!.role },
              ownerId: currentUser!.id,
            })
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
