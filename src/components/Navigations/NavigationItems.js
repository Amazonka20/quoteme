import React from 'react';
import logo from '../../img/logo.png';
import classes from './NavigationItems.module.css';
import {NavLink} from "react-router-dom";

const NavigationItems = (props) => {
    const activeStyle = {
        backgroundColor: "#d59930",
        boxShadow: "0 0 1px #7e6e86"
    };

    return (
        <nav className={classes.navUl}>
            <NavLink to="/">
                <div className={classes.logo}>
                    <img src={logo} alt="logo"/>
                    <h2 className={classes.title}>QuoteMe</h2>
                </div>
            </NavLink>
            <div className={classes.navLink}>
                {props.isAuth ? <NavLink to="/" exact activeStyle={activeStyle}>Quotes</NavLink> : null}
                {props.isAuth ? <NavLink to="/myQuotes" exact activeStyle={activeStyle}>My quotes</NavLink> : null}
                {props.isAuth ? <NavLink to="/addQuote" exact activeStyle={activeStyle}>Add quote</NavLink> : null}
                {props.isAuth ? <NavLink to="/edit" activeStyle={activeStyle}>Profile</NavLink> : null}
                {props.isAuth ? <NavLink to="/logout" activeStyle={activeStyle}>Log out</NavLink> : null}
                {!props.isAuth ? <NavLink to="/login" exact activeStyle={activeStyle}>Login</NavLink> : null}
            </div>

        </nav>
    );
};

export default NavigationItems;
