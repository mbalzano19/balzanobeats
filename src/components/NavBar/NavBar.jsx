import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
    // console.log('this is setUser in nav', setUser)
    function handleLogOut() {
        // delete the token from storage
        userService.logOut()
        // set the user to null
        setUser(null)
    }
    return(
        <nav>
            <Link to='/beats'>Beats</Link>
            &nbsp; | &nbsp;
            <Link to='/beats/new'>Add Beats</Link>
            &nbsp; | &nbsp;
            <Link to='/orders/new'>Cart</Link>
            &nbsp;&nbsp;<span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}