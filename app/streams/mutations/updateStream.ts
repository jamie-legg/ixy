import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateStream = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateStream),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const stream = await db.stream.update({ where: { id }, data })

    return stream
  }
)
