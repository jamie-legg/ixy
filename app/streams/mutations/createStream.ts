import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateStream = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateStream), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const stream = await db.stream.create({ data: input })

  return stream
})
