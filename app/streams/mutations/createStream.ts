import { CreateStream } from "app/auth/validations"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.zod(CreateStream), resolver.authorize(), async (input) => {
  const stream = await db.stream.create({
    data: {
      name: input.name,
      ownerId: input.ownerId,
    }
  })

  return stream
})
