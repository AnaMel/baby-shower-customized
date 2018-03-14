import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, Redirect } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            foundEvents: [],
            redirect: false,
            searchTriggered: false,
            resultsReturned: false,
            showInvitePage: false,
            eventKey: '',
            existingEvents:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchRegistry = this.searchRegistry.bind(this);
        this.clickJoinEvent = this.clickJoinEvent.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    searchRegistry(event) {
        event.preventDefault();
        let events = [];
        this.state.existingEvents.map((event) => {
            if (event.hostName.toLowerCase() === this.state.search.toLowerCase()) {
                if((this.props.userHostEvents.indexOf(event.key)>=0) === false) {
                        events.push(event);
                }
            }
        })

        this.setState ({
            foundEvents: events,
            searchTriggered: true,
            resultsReturned: true
        }) 
    }

    renderSearchResults() {
        if(this.state.searchTriggered) {
            if(this.state.foundEvents.length > 0) {
                return this.state.foundEvents.map((foundEvent) => {
                    return (
                        <div key={foundEvent.key} className="searchResult">
                            <p><span>Event Name: </span>{foundEvent.eventName}</p>
                            <p><span>Host Name: </span>{foundEvent.hostName}</p>
                            <button onClick={(event) => this.clickJoinEvent(event, foundEvent.key, foundEvent.eventName, foundEvent.hostName, foundEvent.hostId,foundEvent.eventDate, foundEvent.eventLocation)}>JOIN EVENT</button>
                        </div>
                    )
                });
            }
            else {return <p>No results returned for search criteria</p>}
        }

    }

    clickJoinEvent(event, eventKey, eventName, eventHost, eventHostId, eventDate, eventLocation) {
        event.preventDefault();
        if (this.props.loggedIn === true) {
            this.props.joinEvent(event, eventKey, eventName, eventHost, eventHostId, eventDate, eventLocation);
        }
        else if(this.props.loggedIn === false) {
            this.setState({
                showInvitePage:true,
                eventKey: eventKey
            })
            this.props.joinUsingDirectLink();
        }
    }
    render() {
        if (this.state.showInvitePage) {
        return <Redirect to={{pathname:`/invite/${this.state.eventKey}`, showLogin:this.props.showLogin, showSignUp:this.props.showSignUp, user:this.props.user}}/>
        }
        return (
            <div className="centeredContent">
                <p>Search For a Registry</p>
                <form className="searchForm">
                    <input type="text" placeholder="Host Full Name" onChange={(event) => this.handleChange(event, "search")}/>
                    <a href="#" className="searchIcon" onClick={(event) => this.searchRegistry(event)}>
                        <i className="fas fa-search"></i>
                    </a>
                </form>
                {this.renderSearchResults()}
            </div>
        )
    }

    componentDidMount() {
        const dbref = firebase.database().ref(`/events`);
        this.unsubscribe = dbref.on('value', (snapshot) => {
            const allEventsData = snapshot.val();
            // console.log('');
            const copyOfDB = [];
            for (let key in allEventsData) {
                allEventsData[key].key = key;
                copyOfDB.push(allEventsData[key]);
            }
            this.setState({
                existingEvents: copyOfDB
            });
        });
    }

    componentWillUnmount() {
        // this.unsubscribe();
    }
}

export default SearchBar;