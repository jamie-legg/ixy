import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getStream from "app/streams/queries/getStream"
import deleteStream from "app/streams/mutations/deleteStream"
import getMessages from "app/messages/queries/getMessages"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import createMessage from "app/messages/mutations/createMessage"
import { MessageForm } from "app/messages/components/MessageForm"
import { MessageBox } from "app/core/components/MessageBox"
import { FORM_ERROR } from "app/messages/components/MessageForm"

const ITEMS_PER_PAGE = 100

export const Stream = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const streamId = useParam("streamId", "number")
  const [deleteStreamMutation] = useMutation(deleteStream)
  const [stream] = useQuery(getStream, { id: streamId })
  const [{ messages, hasMore }] = usePaginatedQuery(getMessages, {
    where: { stream: { id: streamId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [createMessageMutation] = useMutation(createMessage)

  const [composingMessage, setComposingMessage] = useState("")
  const [messageState, setMessageState] = useState(messages as unknown as string[]);

  return (
    <>
      <Head>
        <title>Stream {stream.id}</title>
      </Head>

      <div>
        <h1>Stream {stream.id}</h1>
        <pre>{JSON.stringify(stream, null, 2)}</pre>

        <Link href={Routes.EditStreamPage({ streamId: stream.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteStreamMutation({ id: stream.id })
              router.push(Routes.StreamsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>

        <h2 className="text-2xl font-bold">
          messages
        </h2>
        <ul>
        <Suspense fallback={<div>Loading...</div>}>
          <MessageBox messages={messages} />
        </Suspense>
              <MessageForm
        submitText="Create Message"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateMessage}
        // initialValues={{}}
        onSubmit={async (values) => {
          console.log(values);

          try {
            const message = await createMessageMutation({ body:values.body, streamId: streamId! })
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      </ul>
      </div>
    </>
  )
}

const ShowStreamPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.StreamsPage()}>
          <a>Streams</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Stream />
      </Suspense>
    </div>
  )
}

ShowStreamPage.authenticate = true
ShowStreamPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStreamPage
