import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteStream = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteStream), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const stream = await db.stream.deleteMany({ where: { id } })

  return stream
})
