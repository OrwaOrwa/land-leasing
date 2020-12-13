import React, {Component} from 'react';
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import {numberWithCommas, parseErrorResponse, showAlert} from "../../../helpers/helper_functions";
import {FormDiv} from "../Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

class Products extends Component {
    state = {
        products: [],
        loading: false,
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        this.setState({
            loading: true
        });
        makeRequest(GET_REQUEST, endpoints.merchants_products, {}, response => {
            this.setState({
                products: response.data
            })
        }, error => {
            showAlert('error', 'Error', parseErrorResponse(error))
        }, () => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const {products, loading} = this.state;
        return (
            <FormDiv>
                {loading ?
                    <div className="text-center my-5 py-5">
                        <CircularProgress/>
                    </div> :
                    <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Organization Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map((product, index) =>
                                    <tr key={product.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.name}</td>
                                        <td>{product.organization_name}</td>
                                        <td>Ksh. {numberWithCommas(product.price || "-")}</td>
                                        <td>{product.description || "-"}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>}
            </FormDiv>
        )
    }
}

export default Products;