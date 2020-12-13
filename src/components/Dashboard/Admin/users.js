import React, {Component} from 'react'
import endpoints from '../../../constants/endpoints';
import {parseErrorResponse, showAlert} from '../../../helpers/helper_functions';
import {makeRequest} from '../../../helpers/network_utils';
import {GET_REQUEST} from '../../../values/globals';
import {FormDiv} from "../Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import SingleUser from "./single_user";

export default class Users extends Component {

    state = {
        users: [],
        loading: false,
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        this.setState({
            loading: true
        });
        makeRequest(GET_REQUEST, endpoints.admin_users, {}, response => {
            this.setState({
                users: response.data
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
        const {users, loading} = this.state;
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Role</th>
                                <th scope="col">Active</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user, index) =>
                                    <SingleUser user={user} index={index} callback={this.getUsers}/>
                                )
                            }
                            </tbody>
                        </table>
                    </div>}
            </FormDiv>
        )
    }
}
