import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRepliesInput
  extends Pick<Prisma.ReplyFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRepliesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: replies,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.reply.count({ where }),
      query: (paginateArgs) => db.reply.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      replies,
      nextPage,
      hasMore,
      count,
    }
  }
)
