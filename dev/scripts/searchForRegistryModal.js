import React from 'react';
import { Redirect } from 'react-router';
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';
import SearchBar from './searchBar';

class SearchForRegistryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            eventKey: '',
            eventHostId: ''
        }
        this.redirectTrigger = this.redirectTrigger.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
    }

    redirectTrigger() {
        this.setState({redirect: true});
    }

    joinEvent(event, eventKey, eventName, eventHost, eventHostId, eventDate, eventLocation) {
        event.preventDefault();
        const userevent ={
            hostName: eventHost,
            hostId: eventHostId,
            eventName: eventName,
            isHost: false,
            eventDate: eventDate,
            eventLocation: eventLocation
        }
        const dbref = firebase.database().ref(`/Users/${this.props.user.uid}/events`).child(eventKey).set(userevent);
        this.setState({eventKey: eventKey});
        this.setState({eventHostId:eventHostId});
        this.setState({
            redirect: true
        });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={{pathname: `/dashboard/${this.state.eventKey}`, eventId: this.state.eventKey, userId: this.props.user.uid, isHost: false, hostId:this.state.eventHostId}}/>}
        return(
            <div className="modal">
                <div className="layout__XYCenter eventForm">
                    <a href="#" onClick={(event) => this.props.handleSearchClick(event)}><i className="fas fa-times eventFormControl link__black"></i></a>
                    <SearchBar joinEvent={this.joinEvent} userHostEvents = {this.props.userHostEvents} loggedIn={this.props.loggedIn} />
                </div>
            </div>
        )
    }
}

export default SearchForRegistryModal;