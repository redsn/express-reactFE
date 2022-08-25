import React from 'react';
import {Link } from 'react-router-dom';
import {login, logout} from '../firebase';


export default function Header (props) {
    return(
        <>
        <nav className="nav">
        <Link to="/">
            <div>People App</div>
        </Link>
        {/* <Link to="/people">
            <div>People</div>
        </Link> */}
        <div className="auth-links">
            {
                props.user?
                <>
                <div>Welcome {props.user.displayName}</div>
                <div onClick={logout}>Log out</div>
            <Link to="/people">
                <div>People</div>
            </Link>
                </>
                :
                <div onClick={login}>Log in</div>
            
            }
            {/* <div onClick={logout}>Log out</div>
            <div onClick={login}>Log in</div> */}
        </div>
        </nav>

        </>
    )
}