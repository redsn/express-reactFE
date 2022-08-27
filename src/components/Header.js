import React from 'react';
import {Link } from 'react-router-dom';
import {login, logout} from '../firebase';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: ${props => props.user ? 'rebeccapurple' : 'black' };
    color: white;
    a{
        text-decoration: none;
        color: inherit;
    }
    div:first-of-type{
        display:flex;
        align-items: center;
        div{
            margin-left: 1 rem;
        }
    }
    @media (min-width: 768px) {
        justify-content: space-between;
        padding: 0 1rem;
    }
`;

export default function Header (props) {
    return(
        <>
        <StyledHeader user={props.user}>
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
        </StyledHeader>

        </>
    )
}