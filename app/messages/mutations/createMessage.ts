import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateMessage = z.object({
  body: z.string(),
  streamId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateMessage), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const pStream = await db.stream.findUnique({ where: { id: input.streamId } })
  if(pStream) {
    const messageCount = pStream.messageCount + 1;
    console.log("UPDATING MESSAGE COUNT", messageCount);
    const updatedStream = await db.stream.update({
      where: { id: input.streamId },
      data: { messageCount }
    })
  }

  const message = await db.message.create({ data: input })

  return message
})
