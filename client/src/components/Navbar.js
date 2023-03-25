import {Link} from "react-router-dom";

const x = JSON.parse(localStorage.getItem('user'));
if (x) {
console.log(x.name);
}

const Navbar = () => {
    /* const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    }; */
    return (
      <div className="navbar">
        <span className="logo">
          <Link reloadDocument className="link" to="/">
            CoDrive
          </Link>
        </span>
        <Link reloadDocument to="/Friend_Request"  className="link">
            Search Friend
          </Link>
        <Link reloadDocument to="/View_Friends"  className="link">
            Friends
          </Link>
          <Link reloadDocument className="link" to="/Pending_Requests">
            Requests
          </Link>
          <Link reloadDocument className="link" to="/">
            {x.name}
          </Link>
        {/* <ul className="list">
            <li className="listItem">Friends</li>
            <li className="listItem">Pending Requests</li>
            <li className="listItem">Start Ride</li>
            
        </ul> */}
        {/* {user ? (
          <ul className="list">
            <li className="listItem">{user.displayName}</li>
            <li className="listItem">Chat</li>
            <li className="listItem" onClick={logout}>
              Logout
            </li>
          </ul>
        ) : (
          <Link className="link" to="login">
            Login
          </Link>
        )} */}
        {/* {user ? ("") : (
          <Link className="link" to="register">
            Register
          </Link>
        )} */}
      </div>
    );
  };
  
  export default Navbar;