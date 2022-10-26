import { useAuthContext } from "../../hooks/useAuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

export default function Profile() {
  const { user } = useAuthContext()
  let navigate = useNavigate()

  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <div>
      {user && <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', paddingTop: "200px", paddingBottom: "280px"}}>
      <span>{user.email}</span>
      <button onClick={handleClick}>Logout</button>
      </div>
      </>
      }
      {!user && 
      <div style={{paddingTop: "200px", paddingBottom: "280px", display: 'grid', textAlign: 'center'}}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      }
    </div>
  )
}
