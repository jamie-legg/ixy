import { Suspense, useContext, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { SocketContext } from "../context/socket"
import ChatInput from "../components/ChatInput"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Sidebar from "../components/Sidebar"
import { MenuIcon } from "@heroicons/react/outline"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small rounded-2xl">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small rounded-2xl">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}
