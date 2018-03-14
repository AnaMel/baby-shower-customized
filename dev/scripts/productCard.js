import React from "react";
import axios from "axios";
import variables from "./config.js";
import Qs from 'qs';

class ProductCard extends React.Component {
    constructor () {
        super();
        this.state = {
            imageURL:""
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
                reqUrl: `${variables.apiURL}/listings/${this.props.data.listing_id}/images`,
            params: {
            api_key: `${variables.apiKey}`
            },
            xmlToJSON: false
            }}).then(({ data }) => {
                this.setState({
                    imageURL:data.results[0].url_170x135
                })
            })
        }

    render() {
        return (
            <div className="productCard">
                <div className="productCardImage">
                    <img src={this.state.imageURL} alt=""/>
                </div>
                <div className="productCardDesc">
                    <h3>{this.props.data.title}</h3>
                    <h4>{`${this.props.data.quantity} remaining`}</h4>
                    <button onClick={() => this.props.add(this.props.data)}>Select Item</button>
                </div>
            </div>
        )
    }
}

export default ProductCard;