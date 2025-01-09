import { useContext } from 'react'

import { AuthContext } from '../../providers/auth-provider'

const Status = () => {
  const { isAuthenticated, logIn, logOut } = useContext(AuthContext)

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logOut}> Logout </button>
      ) : (
        <button onClick={logIn}> Login </button>
      )}
    </div>
  )
}

export default Status
