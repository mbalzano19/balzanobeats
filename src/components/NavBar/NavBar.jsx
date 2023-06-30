import { NavLink } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className="navcontainer">
      <nav className="navbar navbar-expand-md" style={{}}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact to="/" className="navbar-brand" activeClassName="active-link">
              BalzanoBeats
            </NavLink>
          </li>
        </ul>
        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/beats" className="nav-link" activeClassName="active-link">
                Beats
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link"> | </span>
            </li>
            <li className="nav-item">
              <NavLink to="/new" className="nav-link" activeClassName="active-link">
                Add Beats
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link"> | </span>
            </li>
            <li className="nav-item">
              <NavLink to="/orders/new" className="nav-link" activeClassName="active-link">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link"> | </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Welcome, {user.name}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <NavLink to="" onClick={handleLogOut}>
                  Log Out
                </NavLink>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
