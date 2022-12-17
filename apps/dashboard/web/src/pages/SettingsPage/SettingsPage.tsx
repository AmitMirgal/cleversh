import React, { useEffect } from 'react'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'
import { useLazyQuery } from '@apollo/client'
import { Controller, useForm } from 'react-hook-form'
import { XummPkce } from 'xumm-oauth2-pkce'

type FormValues = {
  project: {
    id: string
    role: string
    name: string
    description: string
    address: string
  }
}

const rolesMethods = [
  { id: 'creator', title: 'Creator' },
  { id: 'merchant', title: 'Merchant' },
]

const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const CREATE_PROJECT = gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`

const GET_PROJECT = gql`
  query userListFromSettings($id: String!) {
    userList(id: $id) {
      id
      roles
      crypto_wallet_address
      Project {
        id
        name
        description
      }
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation updateProject($id: String!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      name
      description
    }
  }
`
const DEFAULT_PROJECT_DETAILS = {
  project: {
    id: '',
    role: 'creator',
    name: '',
    description: '',
    address: '',
  },
}

const xumm = new XummPkce(process.env.XUMM_PKCE, {
  implicit: true,
  redirectUrl: process.env.XUMM_PKCE_REDIRECT_URL,
})

const SettingsPage = () => {
  const { client, isAuthenticated, userMetadata } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...DEFAULT_PROJECT_DETAILS,
    },
  })

  const showProjectId = watch('project.id')
  const showProjectAddress = watch('project.address')

  const [loadProjectDetails, { data: lazyProjectDetails }] = useLazyQuery(
    GET_PROJECT,
    { variables: { id: userMetadata?.id } }
  )
  const { data } = useQuery(GET_PROJECT, {
    variables: { id: userMetadata?.id },
  })

  const [createUserMutation] = useMutation(CREATE_USER)
  const [createProjectMutation] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      toast.success('The project has been created successfully 🎉')
    },
  })
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT)

  useEffect(() => {
    if (data) {
      setValue('project.id', data?.userList[0].Project[0].id)
      setValue('project.role', data?.userList[0].roles)
      setValue('project.name', data?.userList[0].Project[0].name)
      setValue('project.description', data?.userList[0].Project[0].description)
      setValue('project.address', data?.userList[0].crypto_wallet_address)
    }
  }, [data])

  useEffect(() => {
    if (lazyProjectDetails) {
      setValue('project.id', lazyProjectDetails?.userList[0].Project[0].id)
      setValue('project.role', lazyProjectDetails?.userList[0].roles)
      setValue('project.name', lazyProjectDetails?.userList[0].Project[0].name)
      setValue(
        'project.description',
        lazyProjectDetails?.userList[0].Project[0].description
      )
      setValue(
        'project.address',
        lazyProjectDetails?.userList[0].crypto_wallet_address
      )
    }
  }, [lazyProjectDetails])

  /* xumm.on('success', async () => {
    const state = await xumm.state()
    setValue('project.address', state?.me?.sub)
    console.log('inside the xumm success event ', state?.me?.sub)
  }) */

  const clipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success('copied successfully!')
      },
      function (err) {
        toast.error('Could not copy text')
      }
    )
  }

  const updateProject = async (data) => {
    await updateProjectMutation({
      variables: {
        id: getValues('project.id'),
        input: {
          name: data.project.name,
          description: data.project.description,
        },
      },
    })
    toast.success('Updated successfully!')
  }

  const updateUser = async (data) => {
    const {
      data: { createUser },
    } = await createUserMutation({
      variables: {
        input: {
          roles: getValues('project.role'),
          auth_user_id: userMetadata?.id,
          crypto_wallet_address: getValues('project.address'),
        },
      },
    })

    const {
      data: { createProject },
    } = await createProjectMutation({
      variables: {
        input: {
          name: data.project.name,
          description: data.project.description,
          user_id: createUser.id,
        },
      },
    })

    if (isAuthenticated) {
      await client.auth.update({
        data: {
          roles: getValues('project.role'),
          projectId: createProject.id,
        },
      })
    }
  }

  return (
    <>
      <MetaTags title="Settings" description="Settings page" />

      <Toaster />
      <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
        <form
          onSubmit={
            showProjectId
              ? handleSubmit(updateProject)
              : handleSubmit(updateUser)
          }
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-medium leading-6 text-gray-900">
                Project Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Let’s get started by filling in the information below to create
                your new project.
              </p>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Roles
              </label>
              <p className="text-sm leading-5 text-gray-500">
                What kind of role do you prefer?
              </p>
              <fieldset className="mt-4">
                <legend className="sr-only">Role</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {rolesMethods.map((roleMethod) => (
                    <div key={roleMethod.id} className="flex items-center">
                      <Controller
                        control={control}
                        name="project.role"
                        render={({ field: { onChange } }) => (
                          <input
                            disabled={showProjectId ? true : false}
                            id={roleMethod.id}
                            name="role-method"
                            value={roleMethod.id}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange(event.target.value)
                            }}
                            type="radio"
                            checked={
                              roleMethod.id === getValues('project.role')
                            }
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        )}
                      />

                      <label
                        htmlFor={roleMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {roleMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="project-name"
                  id="project-name"
                  {...register('project.name', { required: true })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
                {errors?.project?.name &&
                  errors?.project.name.type === 'required' && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      This is required
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  {...register('project.description', { required: true })}
                />
                {errors?.project?.description &&
                  errors?.project.description.type === 'required' && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      This is required
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Project Id
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  readOnly={true}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm read-only:bg-gray-100 focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                  aria-describedby="project-clipboard"
                  {...register('project.id')}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="project-clipboard"
                  >
                    <ClipboardIcon
                      onClick={() => clipboard(getValues('project.id'))}
                      className="h-6 w-6 cursor-pointer text-green-500"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="wallet-address"
                className="block text-sm font-medium text-gray-700"
              >
                Wallet address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="wallet-address"
                  id="wallet-address"
                  readOnly={true}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm read-only:bg-gray-100 focus:border-sky-500 focus:ring-sky-500  sm:text-sm"
                  {...register('project.address', { required: true })}
                />
                {errors?.project?.address &&
                  errors?.project.address.type === 'required' && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      This is required
                    </p>
                  )}
              </div>
            </div>

            {!showProjectAddress && (
              <button
                type="submit"
                onClick={() => {
                  xumm
                    .authorize()
                    .catch((e) => toast.error('failed to connect to wallet'))
                }}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Connect to wallet
              </button>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={
                  showProjectId ? () => loadProjectDetails() : () => reset()
                }
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Reset
              </button>

              {showProjectId ? (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Update this project
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Create this project
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default SettingsPage
