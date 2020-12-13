import React, {Component} from 'react';
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import {numberWithCommas, parseErrorResponse, showAlert} from "../../../helpers/helper_functions";
import {FormDiv} from "../Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

class Lands extends Component {

    state = {
        lands: [],
        loading: false,
    }

    componentDidMount() {
        this.getLands();
    }

    getLands = () => {
        this.setState({
            loading: true
        });
        makeRequest(GET_REQUEST, endpoints.admin_lands, {}, response => {
            this.setState({
                lands: response.data
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
        const {lands, loading} = this.state;
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
                                <th scope="col">Land Name</th>
                                <th scope="col">Land Size</th>
                                <th scope="col">Price</th>
                                <th scope="col">Lease Period</th>
                                <th scope="col">Farmer</th>
                                <th scope="col">Lessee</th>
                                <th scope="col">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                lands.map((land, index) =>
                                    <tr key={land.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{land.name}</td>
                                        <td>{land.size}</td>
                                        <td>Ksh. {numberWithCommas(land.price || "-")}</td>
                                        <td>{land.lease_period}</td>
                                        <td>{land.farmer.name} <br/> {land.farmer.phone_number}</td>
                                        <td>{land.user?.name || "-"} <br/> {land.user?.phone_number || "-"}</td>
                                        <td>{new Date(land.created).toLocaleString()}</td>
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

export default Lands;