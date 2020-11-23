import React, {Component} from "react";
import "./Landing.css";

import {
    Input,
    MainDiv,
    SearchButton,
    SearchDiv,
    SearchInputs,
    SearchTitle,
    TopDiv
} from "../../elements/ProductsAndLanding";
import {getLands, searchLands} from "../../providers/Land";
import LandsList from "./Lands";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingLands: false,
            lands: [],
            productsLoading: false,
            products: [],
            crop: "",
            location: "",
            price: "",
            error: "",
        };
    }

    componentDidMount() {
        getLands(this);
        /*this.setState({productsLoading: true});
        // fetching all available products*/

    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    handleSearch = async (e) => {
        e.preventDefault();
        const {location, price, crop} = this.state;
        const data = {location, price, crop};
        searchLands(this, data);
    };

    render() {
        const {lands, loadingLands, location, crop, price} = this.state;
        return (
            <MainDiv>
                <TopDiv>
                    <SearchDiv>
                        <SearchTitle>Search for Land</SearchTitle>
                        <SearchInputs>
                            <Input
                                type="text"
                                placeholder="Crop"
                                value={crop}
                                name="crop"
                                onChange={this.handleChange}
                            />
                            <Input
                                type="text"
                                placeholder="Location"
                                value={location}
                                name="location"
                                onChange={this.handleChange}
                            />
                            <Input
                                type="text"
                                placeholder="Price"
                                value={price}
                                name="price"
                                onChange={this.handleChange}
                            />
                        </SearchInputs>
                        <SearchButton onClick={this.handleSearch}>Find Land</SearchButton>
                    </SearchDiv>
                </TopDiv>
                {/*<ProductsList products={products} loading={productsLoading}/>*/}
                <LandsList lands={lands} loading={loadingLands} location={location}/>
            </MainDiv>
        );
    }
}

export default Landing;
