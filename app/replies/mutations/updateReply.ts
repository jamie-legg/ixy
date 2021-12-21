import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateReply = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateReply),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reply = await db.reply.update({ where: { id }, data })

    return reply
  }
)
