import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './logIn';
import SignUp from './signUp';
import SignOut from './signOut';
import Dashboard from './dashboard';
import { 
  BrowserRouter as Router, 
  Route, Link, Redirect } from 'react-router-dom';
import variables from "./config.js";
import axios from "axios";
import RegistryPage from "./registryPage.js";
import InviteLandingPage from "./inviteLandingPage";
import Header from "./Header";
import Homepage from "./HomePage";
import Footer from "./Footer";

var config = {
  apiKey: "AIzaSyAM9y_Sds3i1NylgyF688cpeJavLulYuG0",
  authDomain: "baby-registry-custom.firebaseapp.com",
  databaseURL: "https://baby-registry-custom.firebaseio.com",
  projectId: "baby-registry-custom",
  storageBucket: "",
  messagingSenderId: "159268780955"
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    let user = firebase.auth().currentUser;
  } else {
    // No user is signed in.
  }
});

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        loggedIn: false,
        user: {},
        loginEmail: '',
        loginPassword: '',
        showLogin: false,
        showSignUp: false,
        userHostEvents: [],
        userEvents: [],
        directLink: true
      }
      this.logInUser = this.logInUser.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
      this.showLogin = this.showLogin.bind(this);
      this.showSignUp = this.showSignUp.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.googleSignIn = this.googleSignIn.bind(this);
      this.joinUsingDirectLink = this.joinUsingDirectLink.bind(this);
    }

    logInUser(event) {
      event.preventDefault();
      const email = this.state.loginEmail;
      const password = this.state.loginPassword;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          // close modal after login
          this.setState({
             showLogin: false,
          });
        }), (error) => {
          console.log(error);
        }
    }

    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: 'select_account'
      });

      firebase.auth().signInWithPopup(provider)
        .then((user) => {
          this.closeModal();
        }), (error) => {
          alert(error);
        }

    }
    
    handleChange(event, field) {
      const newState = Object.assign({}, this.state);
      newState[field] = event.target.value;
      this.setState(newState);
    }

    signOutUser() {
      firebase.auth().signOut().then(function(res) {
      }, function(error) {
        console.log(error);
      });

      this.setState({
          user: {},
          loggedIn: false
      })
    }

    // 3 methods for showing/hiding the log in /sign up modals
    showLogin() {
      this.setState({ showLogin: true });
    }

    showSignUp() {
      this.setState({ showSignUp: true });
    }

    //need to pass this to SignOut and LogIn
    closeModal() {
      this.setState({ showLogin: false, showSignUp: false, });
    }

    joinUsingDirectLink() {
      this.setState({directLink: false});
    }

    render() {
      return (
        <Router>
          <React.Fragment>
            {/* always show/toggle log in or sign out modals */}
            {/* render in the HTML ABOVE header so that modal can cover header */}
            {this.state.showLogin ?
              <LogIn logIn={this.logInUser} handleChange={this.handleChange} closeModal={this.closeModal} googleSignIn={this.googleSignIn}/>
            : null}
  
            {this.state.showSignUp ?
              <SignUp closeModal={this.closeModal} googleSignIn={this.googleSignIn}/>
            : null }

            {this.state.loggedIn ? null : <Redirect to="/"/>}

            {/* always show header */}
            <Header user={this.state.user} signOutUser={this.signOutUser} showLogin={this.showLogin} showSignUp={this.showSignUp} closeModal={this.closeModal} googleSignIn={this.googleSignIn} />

            <Route path="/dashboard/:eventid" exact component={RegistryPage} />
            <Route path="/invite/:eventid" exact component={InviteLandingPage} />


            <Route
              path="/invite/:eventid" exact
              render={(props) => (
              this.state.directLink?
              <InviteLandingPage {...this.state.user} 
              {...props}
              showLogin= { this.showLogin }
              showSignUp = { this.showSignUp }
              closeModal = { this.closeModal }
              /> 
              :null
              )} 
            />
            
            {/* Changes: passing down userHostEvents and userEvents */}
            <Route
              path="/dashboard" exact
              render={(props) => (
                <Dashboard 
                  user={this.state.user}
                  loggedIn={this.state.loggedIn}
                  userHostEvents={this.state.userHostEvents}
                  userEvents={this.state.userEvents}
                />)}
            />

            <Route path="/" exact render={(props) => (
      
              this.state.loggedIn===true?
                <Redirect to={{pathname:`/dashboard`, user:this.state.user,
                loggedIn:this.state.loggedIn,
                userHostEvents:this.state.userHostEvents,
                userEvents:this.state.userEvents}}/>
              :<Homepage loggedIn={this.state.loggedIn} showLogin={this.showLogin} showSignUp={this.showSignUp} joinUsingDirectLink={this.joinUsingDirectLink} user={this.state.user} />
            )} 
            />
            
            
          {/* Always render: footer */}
          {/* <Footer /> */}
          </React.Fragment>
        </Router>
      )
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged((res) => {
        if (res) {
          this.setState({
            loggedIn: true,
            user: res
          }, () => {
          });
        // code below grabs the user's event objects (userEvents) and array of ids where they are hosts for (userHostEvents) and sets it in state. It will be passed down to dashboard.
          const dbref = firebase.database().ref(`/Users/${res.uid}/events`);
          dbref.on('value', (snapshot) => {

            const eventsData = snapshot.val();
            const copyOfDB = [];
            const hostedEvents = [];
            for (let key in eventsData) {
              eventsData[key].key = key;
              copyOfDB.push(eventsData[key]);
            }
            for (let key in eventsData) {
              eventsData[key].key = key;
              if (eventsData[key].isHost === true) {
                hostedEvents.push(eventsData[key].key);
              }
            }
            this.setState({
              userEvents: copyOfDB,
              userHostEvents: hostedEvents
            });
          });
        } 
        
        else {
          this.setState({
            loggedIn: false,
            user: res,
            redirectToDashboard: false
          });
        }
      })
    }
  }

ReactDOM.render(<App />, document.getElementById('app'));
