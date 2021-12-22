import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { LockClosedIcon } from "@heroicons/react/solid"

const SignupPage: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <div className="min-h-full bg-ixy-100 dark:bg-ixy-900 text-ixy-900 dark:text-ixy-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-ixy-800 text-center text-6xl font-extrabold">ixy<span className="text-ixy-900 font-thin dark:text-ixy-100">.chat</span>:)</h1>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              and{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 7-day free trial. no payment info required.
              </a>
            </p>
          </div>
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
          
        </div>
      </div>
    </>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
