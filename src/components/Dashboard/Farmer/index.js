import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SignOut from "../../SignOut";
import {
    ActionDiv,
    DescInput,
    FormDiv,
    Input,
    InputDiv,
    Label,
    Links,
    MainDiv,
    Name,
    ProfileDiv,
    Title,
    TopDiv,
    UploadButton
} from "../Dashboard";
import {getUserObject} from "../../../helpers/login";
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST, POST_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import Swal from "sweetalert2";
import {handleChangeData} from "../../../helpers/helper_functions";
import debounce from "@material-ui/core/utils/debounce";

class FarmerDashboard extends Component {

    state = {
        data: {},
        loading: false,
        loadingSearch: false,
        errors: {},
        search_results: []
    }

    handleSubmit = () => {
        this.setState({
            loading: true
        })
        const {data} = this.state;
        makeRequest(POST_REQUEST, `${endpoints.farmers_lands}`, data, () => {
            Swal.fire(
                'Success!',
                'Land added successfully!',
                'success'
            ).then();
        }, (error) => {
            this.setState({
                errors: error.response.data
            })
        }, () => {
            this.setState({loading: false})
        })
    }

    handleSearch = e => {
        let searchQuery = e.target.value;
        this.searchFunc(searchQuery);
    }

    searchFunc = debounce((searchQuery) => {
        this.setState({
            loadingSearch: true
        })
        makeRequest(GET_REQUEST, `${endpoints.location_search}?search_query=${searchQuery}`, {}, response => {
            this.setState({
                search_results: response.data.results
            })
        }, (error) => {
            this.setState({
                errors: error.response.data
            })
        }, () => {
            this.setState({loadingSearch: false})
        })
    }, 1000);

    saveLocation = location => {
        let data = {...this.state.data};
        data["lon"] = location.geometry.location.lng;
        data["lat"] = location.geometry.location.lat;
        this.setState({data: data});
    }

    render() {
        const user = getUserObject();
        const {data, errors, loading, loadingSearch, search_results} = this.state;
        return (
            <MainDiv>
                <Title>Dashboard</Title>
                <TopDiv>
                    <ProfileDiv>
                        <Name>
                            {user.name}
                        </Name>
                        <ActionDiv>
                            <Links>Add Land</Links>
                            <Link to={ROUTES.VIEWLAND}>
                                <Links>View Land</Links>
                            </Link>
                            <Links>Chats</Links>
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>
                    <FormDiv>
                        <InputDiv>
                            <Label>Land Name</Label>
                            <Input
                                type="text"
                                value={data.name}
                                name="name"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.name && (
                                <p className="mb-0 small text-danger">{errors.name[0]}</p>
                            )}
                        </InputDiv>

                        <InputDiv>
                            <div className="row mx-auto align-items-center">
                                <Label>Location</Label>
                                {loadingSearch && <div className="spinner-border spinner-border-sm ml-3" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>}
                            </div>

                            <div className="dropdown">
                                <Input
                                    autocomplete="off"
                                    data-toggle="dropdown"
                                    type="text"
                                    name="location"
                                    placeholder="Search your location"
                                    onChange={this.handleSearch}
                                />
                                <div className="dropdown-menu w-75" aria-labelledby="dropdownMenuButton">
                                    {
                                        search_results.map(location =>
                                            <a key={location.id} onClick={() => this.saveLocation(location)}
                                               className="dropdown-item"
                                               href="#">
                                                <i className="fas fa-location-arrow mr-2"/>
                                                {location.name + " - " + location.formatted_address}
                                            </a>
                                        )
                                    }
                                </div>
                                {errors.lon && (
                                    <p className="mb-0 small text-danger">{errors.lon[0]}</p>
                                )}
                                {errors.lat && (
                                    <p className="mb-0 small text-danger">{errors.lat[0]}</p>
                                )}
                            </div>
                        </InputDiv>
                        <InputDiv>
                            <Label>Suitable crop(s)</Label>
                            <Input
                                type="text"
                                value={data.crops}
                                name="crops"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.crops && (
                                <p className="mb-0 small text-danger">{errors.crops[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Size</Label>
                            <Input
                                type="text"
                                value={data.size}
                                name="size"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.size && (
                                <p className="mb-0 small text-danger">{errors.size[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                value={data.price}
                                name="price"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.price && (
                                <p className="mb-0 small text-danger">{errors.price[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Lease Period</Label>
                            <Input
                                type="text"
                                value={data.lease_period}
                                name="lease_period"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.lease_period && (
                                <p className="mb-0 small text-danger">{errors.lease_period[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Brief Description</Label>
                            <DescInput
                                type="text"
                                value={data.description}
                                name="description"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.description && (
                                <p className="mb-0 small text-danger">{errors.description[0]}</p>
                            )}
                        </InputDiv>
                        <UploadButton disabled={loading} type="submit" onClick={this.handleSubmit}>
                            {loading ? "Loading" : "Upload"}
                        </UploadButton>
                    </FormDiv>
                </TopDiv>
            </MainDiv>
        );
    }
}

export default FarmerDashboard;