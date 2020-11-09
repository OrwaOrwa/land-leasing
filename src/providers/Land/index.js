import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";

export const getLands = (self) => {
    self.setState({loadingLands: true});
    makeRequest(GET_REQUEST, endpoints.lands, {}, response => {
        const lands = response.data;
        self.setState({
            lands: lands
        })
    }, (error) => {
        self.setState({
            error: error,
        })
    }, () => {
        self.setState({loadingLands: false});
    });
}

export const searchLands = (self, data) => {
    self.setState({loadingLands: true});
    makeRequest(GET_REQUEST, endpoints.lands, data, response => {
        const lands = response.data;
        self.setState({
            lands: lands
        })
    }, (error) => {
        self.setState({
            error: error,
        })
    }, () => {
        self.setState({loadingLands: false});
    });
}