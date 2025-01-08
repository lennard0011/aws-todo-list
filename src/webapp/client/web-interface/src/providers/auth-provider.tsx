import { useNavigate } from '@tanstack/react-router'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

type Token = {
  idToken: string
  accessToken: string
  refreshToken: string
}

type AuthContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchFromBackend: (
    url: string,
    method: string,
    body?: Record<string, any>
  ) => Promise<any>
  isAuthenticated: boolean
  logIn: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  fetchFromBackend: async () => {},
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {}
})

const WEBAPP_URL = import.meta.env['VITE_WEBAPP_URL']
const BACKEND_URL = import.meta.env['VITE_BACKEND_URL']
const AUTH_URL = import.meta.env['VITE_AUTH_URL']
const USER_POOL_CLIENT_ID = import.meta.env['VITE_USER_POOL_CLIENT_ID']

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(undefined as Token | undefined)
  const navigate = useNavigate()

  function getTokenFromCookie() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    return token
  }

  function deleteTokenFromCookie() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  // First check if user has a token, if so, set isAuthenticated to true
  // If no token, check if code in URL, if so, fetch token and set isAuthenticated to true
  // If no token or code, set isAuthenticated to false and redirect to login page

  useEffect(() => {
    async function fetchToken(code: string) {
      const grantType = 'authorization_code'

      const body = `grant_type=${grantType}&client_id=${USER_POOL_CLIENT_ID}&redirect_uri=${WEBAPP_URL}/to-do-list&code=${code}`
      const response = await fetch(
        `https://auth.lennardvanderplas.com/oauth2/token/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        }
      )

      if (!response.ok) {
        console.error('Failed to fetch token')
        //setToken(undefined);
        return
      }

      const responseJson = await response.json()
      const token: Token = {
        idToken: responseJson.id_token,
        accessToken: responseJson.access_token,
        refreshToken: responseJson.refresh_token
      }
      document.cookie = `token=${JSON.stringify(token)}`
      setToken(token)
    }

    if (token) return

    const cookieTokenString = getTokenFromCookie()

    if (cookieTokenString) {
      const cookieToken = JSON.parse(cookieTokenString)
      setToken(cookieToken)
      return
    }

    // Check if code is in URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      fetchToken(code)
      navigate({ to: '/to-do-list', params: '' })
    }
  }, [navigate, token])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchFromBackend = async (
    url: string,
    method: string,
    body?: Record<string, any>
  ) => {
    const response = await fetch(`${BACKEND_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.idToken}`
      },

      body: body ? JSON.stringify(body) : undefined
    })

    console.log(`response.status: ${response.status}`)

    if (response.status === 401) {
      console.error('Unauthorized')
      deleteTokenFromCookie()
      setToken(undefined)
      return
    }

    // if (!response.ok) {
    //     console.error('Failed to fetch from backend');
    //     deleteTokenFromCookie();
    //     setToken(undefined);
    //     return;
    // }

    return await response.json()
  }

  const logIn = () => {
    const loginUrl = `${AUTH_URL}/login?client_id=${USER_POOL_CLIENT_ID}&response_type=code&scope=email+openid+profile&redirect_uri=${WEBAPP_URL}/to-do-list`
    window.location.href = loginUrl
  }

  const logOut = () => {
    deleteTokenFromCookie()
    setToken(undefined)
  }

  const isAuthenticated = typeof token !== 'undefined'

  return (
    <AuthContext.Provider
      value={{ fetchFromBackend, isAuthenticated, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
