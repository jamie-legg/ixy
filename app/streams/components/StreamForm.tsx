import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Routes, useMutation, useRouter } from "blitz"
import { Suspense } from "react"
import { z } from "zod"
import createStream from "../mutations/createStream"



export function StreamForm<S extends z.ZodType<any, any>>(props: any) {
  const router = useRouter();
  const [createStreamMutation] = useMutation(createStream)
  const currentUser = useCurrentUser();

  const newStream = async (values) => {
    try {
      const stream = await createStreamMutation({
        name: values.name,
        owner: { id: currentUser!.id, role: currentUser!.role },
        ownerId: currentUser!.id,
        type: 'PUBLIC'
      })
      router.push(Routes.ShowStreamPage({ streamId: stream.id }))
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Form<S> onSubmit={newStream} {...props}>
        <LabeledTextField name="name" label="Name" placeholder="Name" />
    </Form>
    </Suspense>
  )
}
