import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";

export const getProducts = (self) => {
    self.setState({loadingProducts: true});
    makeRequest(GET_REQUEST, endpoints.products, {}, response => {
        const products = response.data;
        self.setState({
            products: products
        })
    }, (error) => {
        self.setState({
            error: error,
        })
    }, () => {
        self.setState({loadingProducts: false});
    });
}