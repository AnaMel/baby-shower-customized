import React from 'react';
import {
    Link
} from 'react-router-dom';
import SearchBar from './searchBar';



class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHostEvents: []
        }
    }


    render() {
        return (
            <main className="homepage">
                <section className="hero">
                    <h2 className="heading__hero">Everything for your baby shower.</h2>
                    <div className="searchContainer">
                        <SearchBar userHostEvents = {this.state.userHostEvents} loggedIn={this.props.loggedIn} showLogin={this.props.showLogin} showSignUp={this.props.showSignUp} joinUsingDirectLink={this.props.joinUsingDirectLink} user={this.props.user} />
                    </div>
                </section>
                <section className="homePageInstructions">
                    <div className="home__graphic clearfix wrapper">
                        <ol className="clearfix">
                            <li>Search for Etsy gifts</li>
                            <li>Invite friends & family</li>
                            <li>Keep track of your registry</li>
                        </ol>    
                        <div className="toyCollection">              
                            <img src="/assets/baby-boy.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/toy-train.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/cot.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/doll.png" alt="Graphic of baby girl" className="graphics" />
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}


export default Homepage;