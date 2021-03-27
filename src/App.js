import React, {useEffect} from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faCertificate,
    faEnvelope,
    faUser,
    faTrash,
    faQuoteRight,
    faSearch,
    faEdit,
    faFingerprint,
} from '@fortawesome/free-solid-svg-icons'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Login from './containers/Users/Login/Login';
import EditUserProfile from "./containers/Users/EditProfile/EditProfile";
import Quotes from './containers/Quotes/ViewQuotes/Quotes';
import Logout from "./containers/Users/Login/Logout/Logout";
import {authCheckState} from "./store/actions/authActions";
import {connect} from 'react-redux';
import Register from "./containers/Users/Register/Register";
import CreateQuote from "./containers/Quotes/CreateQuote/CreateQuote";
import MyQuotes from "./containers/Quotes/ViewQuotes/MyQuotes";
import EditQuote from "./containers/Quotes/EditQuote/EditQuote";

library.add(faUser, faCertificate, faEnvelope, faTrash, faQuoteRight, faSearch, faEdit, faFingerprint);


function App(props) {
    const {onTryAutoSignup} = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup])

    let routes = (
        <Switch>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Quotes}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/edit" component={EditUserProfile}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/myQuotes" component={MyQuotes}/>
                <Route path="/addQuote" component={CreateQuote}/>
                <Route path="/editQuote/:quoteId" component={EditQuote}/>
                <Route path="/" component={Quotes}/>
            </Switch>
        );
    }
    return (
        <div className="App">
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        isAuth: state.login.token != null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));