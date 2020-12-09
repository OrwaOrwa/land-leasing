import React, { Component } from 'react'
import endpoints from '../../../constants/endpoints';
import { numberWithCommas, parseErrorResponse, showAlert } from '../../../helpers/helper_functions';
import { makeRequest } from '../../../helpers/network_utils';
import { GET_REQUEST } from '../../../values/globals';
import {FormDiv} from "../Dashboard";
export default class Transactions extends Component {

    state = {
        lands: [],
        loading: false,
    }
    componentDidMount(){
        this.getLands();
    }

    getLands = ()=>{
        this.setState({
            loading:true
        });
        makeRequest(GET_REQUEST,endpoints.admin_lands, {} ,response=>{
            this.setState({
                lands: response.data
            })
        },error=>{
            showAlert('error','Error',parseErrorResponse(error))
        },()=>{
            this.setState({
                loading:false
            })
        })
    }

    render() {
        const {lands,loading} = this.state;
        return (
            <FormDiv>
                {loading ? <div>Loading...
                
                </div> : 
                
                <div>
                <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Land Name</th>
      <th scope="col">Price</th>
      <th scope="col">Lease Period</th>
      <th scope="col">Farmer</th>
    </tr>
  </thead>
  <tbody>
      {
          lands.map((land,index)=>
            <tr>
      <th scope="row">{index + 1}</th>
      <td>{land.name}</td>
      <td>Ksh. {numberWithCommas(land.price || "-")}</td>
      <td>{land.lease_period}</td>
      <td>{land.farmer.name}</td>
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
