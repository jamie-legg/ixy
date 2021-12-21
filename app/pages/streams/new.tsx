import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createStream from "app/streams/mutations/createStream"
import { StreamForm } from "app/streams/components/StreamForm"
import { CreateStream } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"

const NewStreamPage: BlitzPage = () => {
  const router = useRouter()


  return (

    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <h1>Create New Stream</h1>

      <StreamForm
        submitText="Create Stream"
      />

      <p>
        <Link href={Routes.StreamsPage()}>
          <a>Streams</a>
        </Link>
      </p>
      </Suspense>
    </div>
  )
}

NewStreamPage.authenticate = true
NewStreamPage.getLayout = (page) => <Layout title={"Create New Stream"}>{page}</Layout>

export default NewStreamPage
