import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import MediaQuery from 'react-responsive';
import {
    Link
} from 'react-router-dom';

// <Header user={this.state.user} signOutUser={this.signOutUser} />
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <header className='layout__opposite'>
                    <div className="headerContent clearfix">
                        {/* <div className="logo">
                            <p>betsy</p>
                        </div> */}

                        {/* Display different items on the right of header if logged in) */}
                        {this.props.user  ?
                            <div className="headerControls">
                            {/* user is logged in, show user's email, link to dashboard, sign out button */}
                                <Link to="/dashboard">
                                    <button>Go to Dashboard</button>
                                </Link>
                                <SignOut signOutUser={this.props.signOutUser} />
                            </div>
                        : 
                            <div className="headerControls">
                            {/* (user is logged out, show log in button and sign up button) */}
                                <button className="btn" onClick={this.props.showLogin}>Log In</button>
                                <button className="btn" onClick={this.props.showSignUp}>Sign Up</button>
                            </div>
                        }
                    </div>
                </header>  
                
                
            </React.Fragment> 
        )
    }
}

export default Header;