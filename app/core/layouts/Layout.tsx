import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{title?: string}> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "ixy"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dark:bg-ixy-900">
      {children}
      </div>
    </>
  )
}

export default Layout
