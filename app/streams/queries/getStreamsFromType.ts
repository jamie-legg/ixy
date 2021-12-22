import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUserStreamCategory = z.object({
  // This accepts type of undefined, but is required at runtime
  type: z.enum(["PUBLIC", "PRIVATE", "AI", "FRIENDS"]),
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUserStreamCategory),

resolver.authorize(), async ({ type, id })  => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log("FIND STREAM FROM TYPE", type, id);

  const stream = await db.stream.findMany({ where: { type, ownerId: id } })
  if (!stream) throw new NotFoundError()
  console.log("FIND STREAM FROM TYPE RETURN", stream, type, id);

  return stream
})
