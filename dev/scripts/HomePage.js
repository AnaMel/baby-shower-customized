import React from 'react';
import {
    Link
} from 'react-router-dom';


// This page is completely static
// <Homepage />
const Homepage = (props) => {
    return (
        <main className="homepage">
            <section className="hero">
                <h2 className="heading__hero layout__XYCenter adjustedYPosition">Make your baby shower special with Betsy!</h2>
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


export default Homepage;