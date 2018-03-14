import React from "react";
import variables from "./config.js";
import axios from "axios";
import Qs from 'qs';

class RegistryList extends React.Component {
    constructor() {
        super();
        this.state = {
            imgURL:""
        }
    }
    componentDidMount () {
        axios({
            method: 'GET',
            url: 'https://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `${variables.apiURL}/listings/${this.props.selection.listing_id}/images`,
                params: {
                    api_key: `${variables.apiKey}`
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            const results = data;
            this.setState({
                imageURL:data.results[0].url_170x135
            })
        })
    }
    render () {
        return (
            <div className="savedRegistryList">
                <img src={this.state.imageURL} alt="" />
                {/* <h4>{this.props.selection.title}</h4> */}
                {/* <h4>{`Price: ${this.props.selection.currency_code} ${this.props.selection.price}`}</h4> */}
                {/* <h4>{`Quantity: ${this.props.selection.quantity} remaining`}</h4> */}
                {/* <a href={`${this.props.selection.url}`}>More Details</a> */}
                <button onClick={() => this.props.remove(this.props.selection.listing_id)}>Remove Item</button>
                {this.props.selection.purchase ? 
                    <h3>This has been purchased by a guest</h3>
                    :
                    null
                }
            </div>
        )
    }
}

export default RegistryList;