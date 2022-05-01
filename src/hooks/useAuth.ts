import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function useAuth() {
  const value = useContext(AuthContext)
  return value
}
export default useAuth
