import { useAuthContext } from "../../hooks/useAuthContext"
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user } = useAuthContext()

  return (
    <div>
      {user && <span style={{paddingTop: "200px", paddingBottom: "280px", display: 'grid', textAlign: 'center'}}>{user.email}</span>}
      {!user && 
      <div style={{paddingTop: "200px", paddingBottom: "280px", display: 'grid', textAlign: 'center'}}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      }
    </div>
  )
}
