import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const User = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(User), resolver.authorize(), async ({ id }) => {
  const user = await db.user.findFirst({ where: { id } })

  if (!user) throw new NotFoundError()

  return user
})
