import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import './NavBar.css'

export default function NavBar({ user, setUser }) {
    // console.log('this is setUser in nav', setUser)
    function handleLogOut() {
        // delete the token from storage
        userService.logOut()
        // set the user to null
        setUser(null)
    }
    return(
        <div className='navcontainer'>
<nav className="navbar navbar-expand-md bg-body-tertiary" style={{ background: "linear-gradient(180deg, #1F4066 0%, rgba(36, 122, 222, 0.00) 100%" }}>
    

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="navbar-brand">BalzanoBeats</Link>
          </li>
          </ul>
            <div className="navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/beats" className="nav-link">Beats</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link"> | </span>
          </li>
          <li className="nav-item">
            <Link to="/beats/new" className="nav-link">Add Beats</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link"> | </span>
          </li>
          <li className="nav-item">
            <Link to="/orders/new" className="nav-link">Cart</Link>
          </li>
          <li className="nav-item">
            <span className="nav-link"> | </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">Welcome, {user.name}</span>
          </li>
          <li className="nav-item">
            <span className="nav-link"><Link to="" onClick={handleLogOut}>Log Out</Link></span>
          </li>
        </ul>
      </div>
        </nav>
        </div>
    )
}