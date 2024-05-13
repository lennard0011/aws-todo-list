import Status from './components/status'
import AuthProvider from './providers/auth-provider'

function App() {
  return (
    <>
      <AuthProvider>
        <Status />
      </AuthProvider>
    </>
  )
}

export default App
