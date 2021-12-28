import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"


export const User = () => {
  const userId = useParam("userId", "number")!
  const [user] = useQuery(getUser, { id: userId })

  return (
    <>
      <Head>
        <title>{user.username || user.email.split('@')[0]} on IXY:)</title>
      </Head>

      <div className="dark:bg-ixy-900">
        <h1 className="text-3xl w-96 text-ixy-900 dark:text-ixy-100 font-bold"><span
        className="text-ixy-800">
        {user.username || user.email.split("@")[0]}&nbsp;
        </span>
         is on IXY
         <span className="text-ixy-800">:)</span></h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link href={'/me'}>
          <a>Edit</a>
        </Link>

      </div>
    </>
  )
}

export const ChangeUserStatus = () => {

}

export const CurrentUser = () => {
  const currentUser = useCurrentUser()!;
    return (
      <div>
      <h1>logged in as {currentUser.id}</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>

      <Link href={'/me'}>
        <a>Edit</a>
      </Link>

    </div>
    )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
        <CurrentUser />
        {/* <ChangeUserStatus /> */

        }
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
