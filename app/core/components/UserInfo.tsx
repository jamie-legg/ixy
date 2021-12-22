import { Suspense, useContext, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SocketContext } from "../../context/socket"
import ChatInput from "./ChatInput"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Sidebar from "./Sidebar"
import { MenuIcon } from "@heroicons/react/outline"
import { AdjustmentsIcon, BackspaceIcon, ChatIcon, CheckCircleIcon, IdentificationIcon, LogoutIcon, MailIcon, RefreshIcon, RewindIcon, TagIcon, UserIcon } from "@heroicons/react/solid"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="text-left">
          <IdentificationIcon className="text-black dark:text-ixy-800 mr-1 inline-block w-6 h-6" />
          User id: <code>{currentUser.id}</code>
          <br />
          <AdjustmentsIcon className="text-black dark:text-ixy-800 mr-1 inline-block w-6 h-6" />
          <span className="bg-ixy-100 rounded-sm text-ixy-900 p-1 lowercase">{currentUser.role} user</span>
          <br />
          <MailIcon className="text-black dark:text-ixy-800 mr-1 inline-block w-6 h-6" />
          User email: <code>{currentUser.email}</code>
          <div
            className="bg-red-500 cursor-pointer font-bold w-max rounded-sm px-4 flex text-white"
            onClick={() => logoutMutation()}>
            <LogoutIcon className="w-6 h-6 mx-2"></LogoutIcon>
            logout
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
      <div className="flex w-full justify-start mt-2">
        <Link href={Routes.SignupPage()}>
          <a className="button small rounded-lg uppercase bg-ixy-500 text-ixy-900 p-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <span className="mx-2 mt-2">or</span>
        <Link href={Routes.LoginPage()}>
          <a className="button small rounded-lg uppercase bg-ixy-800 text-ixy-100 bg-black text-white p-2">
            <strong>Login</strong>
          </a>
        </Link>

      </div>
      <p className="text-left mt-2 lowercase">free, open-source, and lowercase. always</p>
      </>
    )
  }
}
