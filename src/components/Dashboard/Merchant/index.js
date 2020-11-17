import React, {Component} from 'react';
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
import {POST_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import Swal from "sweetalert2";
import {handleChangeData} from "../../../helpers/helper_functions";

class MerchantDashboard extends Component {

    state = {
        data: {},
        loading: false,
        errors: {},
    }

    handleSubmit = () => {
        this.setState({
            loading: true
        })
        const {data} = this.state;
        let formData = new FormData();

        let keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            formData.append(key, data[key]);
        }
        makeRequest(POST_REQUEST, `${endpoints.merchants_products}`, formData, () => {
            Swal.fire(
                'Success!',
                'Product added successfully!',
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

    render() {
        const user = getUserObject();
        const {loading, data, errors} = this.state;
        return (
            <MainDiv>
                <Title>Dashboard</Title>
                <TopDiv>
                    <ProfileDiv>
                        <Name>
                            {user.firstName}{" "}
                            {user.lastName}
                        </Name>
                        <ActionDiv>
                            <Links>Add Product/Service</Links>
                          {/*  <Links>Edit Product/Service</Links>*/}
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>
                    <FormDiv>
                        <InputDiv>
                            <Label>Product/Service</Label>
                            <Input
                                type="text"
                                value={data?.name}
                                name="name"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.name && (
                                <p className="mb-0 small text-danger">{errors.name[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Name of Organization</Label>
                            <Input
                                type="text"
                                value={data?.organization_name}
                                name="organization_name"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.organization_name && (
                                <p className="mb-0 small text-danger">{errors.organization_name[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                value={data?.price}
                                name="price"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.price && (
                                <p className="mb-0 small text-danger">{errors.price[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Brief Description</Label>
                            <DescInput
                                type="text"
                                value={data?.description}
                                name="description"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.description && (
                                <p className="mb-0 small text-danger">{errors.description[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Upload Product Image</Label>
                            <Input
                                name="image"
                                accept="image/*"
                                onChange={event => this.setState({
                                    data: {
                                        ...data,
                                        image: event.target.files[0]
                                    }
                                })}
                                type="file"
                            />
                            {errors.image && (
                                <p className="mb-0 small text-danger">{errors.image[0]}</p>
                            )}
                        </InputDiv>
                        <UploadButton disabled={loading} onClick={this.handleSubmit}>
                            {loading ? "Loading" : "Upload"}
                        </UploadButton>
                    </FormDiv>
                </TopDiv>
            </MainDiv>
        );
    }
}

export default MerchantDashboard;