import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, UserType } from "db"

// We use a postgres enum for User Role
export type Role = UserType

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
