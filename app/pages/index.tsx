import { Suspense, useContext, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

import Start from "../core/components/Start"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

function slugify(string) {
  return [...string]
    .map((letter, index) => {
      const code = letter.charCodeAt(0)
      if (code >= 65 && code <= 90 && string[index - 1]) {
        return `-${letter.toLowerCase()}`
      }

      return letter.toLowerCase()
    })
    .join("")
}

function getMessages() {
  return []
}



function Home() {
  return (
    <>
      <div>
        <Start />
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
