import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Background from '../components/Background'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default function Home() {
  const router = useRouter()
  const [loginFields, setLogin] = useState({ email: 'fan@starwars.com', password: 'sw123' })
  const [login, { data }] = useMutation(LOGIN)
  const handleFormChange = (e) => {
    setLogin((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ variables: { email: loginFields.email, password: loginFields.password } })
  }

  // Check if user has token
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/overview')
    }
  }, [])

  // Set token to localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.login.token)
      router.push('/overview')
    }
  }, [data])

  return (
    <div>
      <Head className="p-4">
        <title>Star Wars - Login</title>
      </Head>

      <main className="fixed z-10 transform -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
        <form className="text-center relative" onChange={handleFormChange} onSubmit={handleSubmit}>
          <h1>
            <img src="/star_wars_logo_lg.svg" width="400" />
          </h1>

          <div className="mb-2 relative w-3/4 left-2/4 transform -translate-x-2/4">
            <div className="absolute z-50 top-2 left-2">
              <svg height="25" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <input
              className="border-2 rounded p-2 pl-10 w-full"
              type="text"
              name="email"
              value={loginFields.email}
              required
            />
          </div>

          <div className="mb-4 relative w-3/4 left-2/4 transform -translate-x-2/4">
            <div className="absolute z-50 top-2 left-2">
              <svg height="25" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <input
              className="border-2 rounded p-2 pl-10 w-full"
              type="text"
              name="password"
              value={loginFields.password}
              required
            />
          </div>

          <div className="text-center">
            <button className="rounded p-2 ml-2 w-1/4 bg-gradient-to-br from-green-400 to-blue-600 focus:outline-none text-black text-base font-semibold py-2 px-4 shadow-md">
              Login
            </button>
          </div>
        </form>
      </main>

      <footer>powered by stars</footer>

      <Background />
    </div>
  )
}
