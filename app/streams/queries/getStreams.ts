import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetStreamsInput
  extends Pick<Prisma.StreamFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetStreamsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: streams,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.stream.count({ where }),
      query: (paginateArgs) => db.stream.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      streams,
      nextPage,
      hasMore,
      count,
    }
  }
)
