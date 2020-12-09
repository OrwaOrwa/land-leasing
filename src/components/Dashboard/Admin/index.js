import React, {Component} from 'react';
import {getUserObject} from "../../../helpers/login";
import {
    ActionDiv, DescInput,
    FormDiv,
    Input,
    InputDiv,
    Label,
    Links,
    MainDiv,
    Name,
    ProfileDiv,
    Title,
    TopDiv, UploadButton
} from "../Dashboard";
import SignOut from "../../SignOut";
import {handleChangeData} from "../../../helpers/helper_functions";
import {makeRequest} from "../../../helpers/network_utils";
import {POST_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import Swal from "sweetalert2";
import Transactions from './transactions';

const pages = {
    blog: "blog",
    transactions:"transactions"
}
class AdminDashboard extends Component {

    state = {
        data: {},
        current_page: pages.blog,
        loading: false,
        errors: {},
    }

    componentDidMount() {
        window.$("#body").summernote({
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ],
            height: 300,
            callbacks: {
                onChange: body => {
                    this.setState({data: {...this.state.data, body: body}});
                }
            }
        });
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
        makeRequest(POST_REQUEST, `${endpoints.admin_blogs}`, formData, () => {
            Swal.fire(
                'Success!',
                'Blog added successfully!',
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
        const {loading, data, errors,current_page} = this.state;
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
                            <Links onClick={e=>{
                                e.preventDefault();
                               window.location.reload();
                            }}>Add Blog</Links>
                            {/*  <Links>Edit Product/Service</Links>*/}
                           <Links onClick={e=>{
                               e.preventDefault();
                                this.setState({
                                    current_page: pages.transactions
                                })
                            }}>Transactions</Links>
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>
                    {
                        current_page === pages.blog && 
                        <FormDiv>
                        <InputDiv>
                            <Label>Blog Title</Label>
                            <Input
                                type="text"
                                value={data?.title}
                                name="title"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.title && (
                                <p className="mb-0 small text-danger">{errors.title[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Body</Label>
                            <textarea id="body" required/>
                            {errors.body && (
                                <p className="mb-0 small text-danger">{errors.body[0]}</p>
                            )}
                        </InputDiv>
                        <UploadButton disabled={loading} onClick={this.handleSubmit}>
                            {loading ? "Loading" : "Upload"}
                        </UploadButton>
                    </FormDiv>
                    }
                    {
                        current_page === pages.transactions && <Transactions/>
                    }
                  
                </TopDiv>
            </MainDiv>
        );
    }
}

export default AdminDashboard;