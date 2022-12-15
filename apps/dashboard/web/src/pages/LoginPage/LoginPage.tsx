import { MetaTags } from '@redwoodjs/web'

import { useAuth } from '@redwoodjs/auth'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import Login from 'src/components/Login/Login'

const Notification = (email) => (
  <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">Check your email!</p>
          <p className="mt-1 text-sm text-gray-500">{`we emailed a magic link to ${email}, you can close this tab`}</p>
        </div>
      </div>
    </div>
  </div>
)

type FormValues = {
  email: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()
  const { logIn, loading } = useAuth()

  const submit = () => {
    logIn({
      email: getValues('email'),
      redirectTo: 'http://localhost:8910/photos',
    })
    toast.custom(Notification(getValues('email')), {
      duration: 8000,
    })
  }

  return (
    <>
      <MetaTags title="Login" description="Login page" />
      <Toaster />

      <Login
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        loading={loading}
        submit={submit}
      />
    </>
  )
}
