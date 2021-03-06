import { resolver } from "blitz"
import db from "db"
import OpenAI from "integrations/openai"
import { z } from "zod"

const CreateMessage = z.object({
  body: z.string(),
  streamId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateMessage), resolver.authorize(), async (input) => {
  const message = db.message.create({ data: input }).then(
    async m => {
    //! VAR - S: STREAM
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const s = await db.stream.findUnique({ where: { id: input.streamId } })
      if(s) {
        const messageCount = s.messageCount + 1;
        const updatedStream = await db.stream.update({
          where: { id: s.id },
          data: { messageCount }
        })
        // CHECK IF STREAM IS AI
        if(s.type === "AI") {
          //GENERATE AN AI RESPONSE IF MESSAGE COUNT MEETS THRESHOLD
          if(messageCount % 3 === 0) {
            const { getResponse } = OpenAI();
            const response = await getResponse(input.body);
            const reply = await db.reply.create({ data: { body: response, streamId: s.id }});
          }
        }
    }})

  return message
})
