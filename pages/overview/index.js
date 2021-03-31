import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Card from '../../components/Card'
import Background from '../../components/Background'

const ALL_PEOPLE = gql`
  query allPeople {
    allPeople {
      id
      name
      species {
        name
      }
      image
      films {
        title
      }
    }
  }
`

function overview() {
  const [filter, setFilter] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showAll, setShowAll] = useState(true)
  const { loading, error, data } = useQuery(ALL_PEOPLE)
  const router = useRouter()

  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  const handleSetFavorite = (id) => {
    setFavorites((state) => {
      let newState = [...state]

      if (newState.includes(id)) {
        newState = newState.filter((s) => s !== id)
      } else {
        newState.push(id)
      }

      return newState
    })
  }

  // Initial page load
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }

    if (localStorage.getItem('favorites')) {
      setFavorites(localStorage.getItem('favorites').split(',') || [])
    }
  }, [])

  // Setting favorites
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem('favorites', favorites)
    }
  }, [favorites])

  const visible = () => {
    if (showAll) {
      return data?.allPeople
    }

    return favorites.map((fav) => {
      return data?.allPeople.find((data) => data.id === fav)
    })
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="fixed transform -translate-x-2/4 top-2/4 left-2/4">
          <div className="text-white font-semibold text-4xl">Loading ...</div>
        </div>
      )
    }

    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 py-5 z-0">
        {(visible() || [])
          .filter((item) => {
            if (filter) {
              return item?.name?.toLowerCase().includes(filter)
            }

            return item
          })
          .map((item) => {
            return (
              <Card
                key={item.id}
                isFavorite={favorites.includes(item.id)}
                species={item.species?.name}
                name={item.name}
                imageSrc={item.image}
                onClick={() => handleSetFavorite(item.id)}
              />
            )
          })}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Star Wars - Overview</title>
      </Head>

      <div className="p-2 h-auto relative z-10">
        <div className="fixed mx-2 top-0 right-0 flex bg-gray-900 p-4 rounded-bl-md z-50">
          <div className="flex-1">
            <div className="absolute top-6 left-6">
              <svg height="25" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              onChange={handleChange}
              className="border-2 rounded p-2 pl-10 w-full"
              placeholder="Search characters"
            />
          </div>

          <button
            className="rounded p-2 ml-2 w-auto bg-gradient-to-br from-gray-500 to-gray-500 disabled:from-green-400 disabled:to-blue-600 text-black text-base font-semibold py-2 px-4 shadow-md"
            onClick={() => setShowAll(true)}
            disabled={showAll}
          >
            Show all {showAll}
          </button>
          <button
            className="rounded p-2 ml-2 w-auto bg-gradient-to-br from-gray-500 to-gray-500 text-black text-base font-semibold py-2 px-4 shadow-md disabled:from-yellow-500 disabled:to-white  disabled:cursor-default"
            onClick={() => setShowAll(false)}
            disabled={!showAll}
          >
            Show only favorites
          </button>
        </div>

        {renderContent()}
      </div>

      <Background />
    </>
  )
}

export default overview
