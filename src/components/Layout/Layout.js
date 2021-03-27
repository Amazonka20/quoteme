import React from 'react';
import {connect} from 'react-redux';
import NavigationItems from "../Navigations/NavigationItems";

const Layout = (props) => {
    return (
        <React.Fragment>
            <NavigationItems isAuth={props.isAuthenticated}/>
            <main>{props.children}</main>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.token != null,
    }
}

export default connect(mapStateToProps)(Layout);
