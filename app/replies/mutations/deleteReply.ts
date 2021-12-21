import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteReply = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteReply), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const reply = await db.reply.deleteMany({ where: { id } })

  return reply
})
