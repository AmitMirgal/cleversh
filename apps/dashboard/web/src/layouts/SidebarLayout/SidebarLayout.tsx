import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  PhotoIcon,
  CogIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const people = [
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
]
const activityItems = [
  {
    id: 1,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 2,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 3,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 4,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 5,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 6,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 7,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 8,
    person: people[0],
    project: 'Workcation',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
]

type SidebarLayoutProps = {
  children?: React.ReactNode
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { client, logOut } = useAuth()

  console.log(client)

  useEffect(() => {
    const socket = client.realtime
    socket.connect()
    const channel = socket.channel('public:Nftoupon')
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'Nftoupon' },
      (e) => console.log('payload ==>>> ', e)
    )
    channel.subscribe()
  }, [])

  const navigation = [
    {
      name: 'NFTs',
      to: routes.photos(),
      icon: PhotoIcon,
      current: false,
    },
    { name: 'Settings', to: routes.settings(), icon: CogIcon, current: false },
  ]

  return (
    <>
      <div className="flex h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <button
                      type="button"
                      onClick={() => logOut()}
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Logout
                      <UserGroupIcon
                        className="ml-2 -mr-0.5 h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex border-t border-gray-200 p-4">
                <button
                  type="button"
                  onClick={() => logOut()}
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Logout
                  <UserGroupIcon
                    className="ml-2 -mr-0.5 h-4 w-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              {children}
            </main>
            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
              <div className="mt-8 p-8">
                <h1 className="font-semibold">Activities</h1>
                <ul role="list" className="divide-y divide-gray-200">
                  {activityItems.map((activityItem) => (
                    <li key={activityItem.id} className="py-4">
                      <div className="flex space-x-3">
                        <img
                          className="h-6 w-6 rounded-full"
                          src={activityItem.person.imageUrl}
                          alt=""
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              {activityItem.person.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {activityItem.time}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Deployed {activityItem.project} (
                            {activityItem.commit} in master) to{' '}
                            {activityItem.environment}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
