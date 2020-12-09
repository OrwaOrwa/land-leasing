import React, { Component } from 'react';
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST, PATCH_REQUEST, POST_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";

export default class test extends Component {

    state = {
        data: {},
    }

    componentDidMount(){
        this.getLandDetails();
    }

    getLandDetails = ()=>{
        const id = this?.props?.match?.params?.id;
        
        if(id)
        makeRequest(GET_REQUEST,`${endpoints.lands}${id}`,{},response=>{
            const data = {...response.data};
            if(data){
                this.setState({
                    data: data
                })
            }
        });
    }

    render() {
        const {data} = this.state;
        console.log("Wagwan");
        console.log(data);
        return (
            <div className="my-5 py-5">
                <h3>Testing 1,2</h3>
                <p>
                    {data.name || ""}
                </p>
                <p>
                    {data.size ||""}
                </p>
            </div>
        )
    }
}
