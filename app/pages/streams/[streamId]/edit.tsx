import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStream from "app/streams/queries/getStream"
import updateStream from "app/streams/mutations/updateStream"
import { StreamForm, FORM_ERROR } from "app/streams/components/StreamForm"

export const EditStream = () => {
  const router = useRouter()
  const streamId = useParam("streamId", "number")
  const [stream, { setQueryData }] = useQuery(
    getStream,
    { id: streamId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateStreamMutation] = useMutation(updateStream)

  return (
    <>
      <Head>
        <title>Edit Stream {stream.id}</title>
      </Head>

      <div>
        <h1>Edit Stream {stream.id}</h1>
        <pre>{JSON.stringify(stream, null, 2)}</pre>

        <StreamForm
          submitText="Update Stream"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateStream}
          initialValues={stream}
          onSubmit={async (values) => {
            try {
              const updated = await updateStreamMutation({
                id: stream.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowStreamPage({ streamId: updated.id }))
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

const EditStreamPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditStream />
      </Suspense>

      <p>
        <Link href={Routes.StreamsPage()}>
          <a>Streams</a>
        </Link>
      </p>
    </div>
  )
}

EditStreamPage.authenticate = true
EditStreamPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditStreamPage
