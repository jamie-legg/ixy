import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMessage = z.object({
  body: z.string(),
  streamId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateMessage), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const message = await db.message.create({ data: input })

  return message
})
