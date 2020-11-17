import React, {Component} from 'react';
import {getUserObject} from "../../../helpers/login";
import {
    ActionDiv,
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
import SignOut from "../../SignOut";
import {handleChangeData, parseErrorResponse, showAlert} from "../../../helpers/helper_functions";
import {makeRequest} from "../../../helpers/network_utils";
import {GET_REQUEST, PATCH_REQUEST} from "../../../values/globals";
import endpoints from "../../../constants/endpoints";
import Swal from "sweetalert2";

class EditBlog extends Component {

    state = {
        data: {},
        loading: false,
        errors: {},
    }

    componentDidMount() {
        this.instantiateSummerNote();
        this.getBlog();
    }

    instantiateSummerNote = () => {
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

    getBlog = () => {
        const {id} = this.props.match.params;
        this.setState({
            loading: true
        })
        makeRequest(GET_REQUEST, `${endpoints.blogs}${id}`, {}, response => {
            let data = {...response.data};
            //data.body = data.body.replace(/(<([^>]+)>)/gi, "");
            this.setState({
                    data: data
                }, () => {
                    window.$("#body").summernote('code', data.body);
                }
            )
        }, error => {
            showAlert('error', 'Blog Error', parseErrorResponse(error))
        }, () => {
            this.setState({
                loading: false
            })
        })
    }

    handleSubmit = () => {
        const {id} = this.props.match.params;
        this.setState({
            loading: true
        })
        const {data} = this.state;
        /*let formData = new FormData();

        let keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            formData.append(key, data[key]);
        }*/
        makeRequest(PATCH_REQUEST, `${endpoints.admin_blogs}${id}`, data, () => {
            Swal.fire(
                'Success!',
                'Blog edited successfully!',
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
                            <Links>Edit Blog</Links>
                            {/*  <Links>Edit Product/Service</Links>*/}
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>
                    <FormDiv>
                        <InputDiv>
                            <Label>Blog Title</Label>
                            <Input
                                type="text"
                                value={data?.title ?? ""}
                                name="title"
                                onChange={e => handleChangeData(e, this)}
                            />
                            {errors.title && (
                                <p className="mb-0 small text-danger">{errors.title[0]}</p>
                            )}
                        </InputDiv>
                        <InputDiv>
                            <Label>Body</Label>
                            <textarea id="body" value={data?.body ?? ""} required/>
                            {errors.body && (
                                <p className="mb-0 small text-danger">{errors.body[0]}</p>
                            )}
                        </InputDiv>
                        <UploadButton disabled={loading} onClick={this.handleSubmit}>
                            {loading ? "Loading" : "Update"}
                        </UploadButton>
                    </FormDiv>
                </TopDiv>
            </MainDiv>
        );
    }
}

export default EditBlog;