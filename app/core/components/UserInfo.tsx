import { Suspense, useContext, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SocketContext } from "../../context/socket"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Sidebar from "./Sidebar"
import { MenuIcon } from "@heroicons/react/outline"
import { AdjustmentsIcon, AtSymbolIcon, BackspaceIcon, ChatIcon, CheckCircleIcon, CogIcon, IdentificationIcon, LogoutIcon, MailIcon, RefreshIcon, RewindIcon, TagIcon, UserIcon } from "@heroicons/react/solid"
import Typical from "react-typical";

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="text-left flex">
          <div className="rounded-full border-ixy-800 border-2 p-2.5 w-12 h-12 mr-3">
            <Image className="ml-3 mt-3" src={currentUser.imageUrl} width="40" height="40" />
          </div>
          <div className="w-full flex flex-col">
          <span className="text-bold text-ixy-800">
            <AtSymbolIcon className="w-6 h-6 inline-block" />
            <code className="text-ixy-100 text-xl">{currentUser.username === "user" ? `${currentUser.username}${currentUser.id}` : currentUser.username}</code>
          </span>
      <div className="flex flex-row justify-start space-x-2.5">
          <div
            className="bg-ixy-100 cursor-pointer font-bold w-max rounded-lg px-2.5 py-1 flex text-ixy-900"
            onClick={() => logoutMutation()}>
            <CogIcon className="w-6 h-6 mx-2"></CogIcon>
          </div>

          <div
            className="bg-ixy-800 cursor-pointer font-bold w-max rounded-lg px-2.5 py-1 flex text-white"
            onClick={() => logoutMutation()}>
            <LogoutIcon className="w-6 h-6 mx-2"></LogoutIcon>
          </div>
          </div>
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
