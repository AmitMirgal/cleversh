import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useParams } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GET_NFTOUPON = gql`
  query userListFromPhotos($id: String!) {
    userList(id: $id) {
      id
      Project {
        Nftoupon {
          name
          description
          imageUrl
        }
      }
    }
  }
`

export default function PhotosPage() {
  const { userMetadata } = useAuth()
  const { loading, error, data } = useQuery(GET_NFTOUPON, {
    variables: { id: userMetadata?.id },
  })

  return (
    <section className="mt-8 p-12" aria-labelledby="gallery-heading">
      {userMetadata.user_metadata?.roles ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {!loading && data?.userList[0].Project[0].Nftoupon.length > 0 ? (
            data?.userList[0].Project[0].Nftoupon.map((file) => (
              <li key={file.name} className="relative">
                <div
                  className={classNames(
                    false
                      ? 'ring-2 ring-indigo-500 ring-offset-2'
                      : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                    'group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100'
                  )}
                >
                  <img
                    src={file.image_url}
                    alt=""
                    className={classNames(
                      file.current ? '' : 'group-hover:opacity-75',
                      'pointer-events-none object-cover'
                    )}
                  />
                  <Link
                    className="absolute inset-0 focus:outline-none"
                    to={routes.view({ id: '123' })}
                  ></Link>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {file.name}
                </p>
              </li>
            ))
          ) : (
            <div className="relative block w-max rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No NFTs
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new nfts via widget.
              </p>
            </div>
          )}
        </ul>
      ) : (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Create your project
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>The project is not created yet</p>
            </div>
            <div className="mt-3 text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={routes.settings()}
              >
                {' '}
                Go to Settings <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
