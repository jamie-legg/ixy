import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateReply = z.object({
  name: z.string(),
  streamId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateReply), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const reply = await db.reply.create({ data: input })

  return reply
})
