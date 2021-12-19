import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "app/users/queries/getUser"
import deleteStream from "app/streams/mutations/deleteStream"
import getMessages from "app/messages/queries/getMessages"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import createMessage from "app/messages/mutations/createMessage"
import { MessageForm } from "app/messages/components/MessageForm"
import { MessageBox } from "app/core/components/MessageBox"
import { FORM_ERROR } from "app/messages/components/MessageForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"


export const User = () => {
  const userId = useParam("userId", "number")!
  const [user] = useQuery(getUser, { id: userId })

  return (
    <>
      <Head>
        <title>{user.name || user.email.split('@')[0]} on IXY:)</title>
      </Head>

      <div className="dark:bg-ixy-900">
        <h1 className="text-3xl w-96 text-ixy-900 dark:text-ixy-100 font-bold"><span
        className="text-ixy-800">
        {user.name || user.email.split("@")[0]}&nbsp;
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
