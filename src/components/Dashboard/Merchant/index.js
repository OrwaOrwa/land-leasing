import React, {Component} from 'react';
import SignOut from "../../SignOut";
import LinearProgress from "@material-ui/core/LinearProgress";
import renderIf from "render-if";
import {
    ActionDiv, Alert, DescInput,
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

class MerchantDashboard extends Component {
    render() {
        return (
            <MainDiv>
                <Title>Dashboard</Title>
                <TopDiv>
                    <ProfileDiv>
                        <Name>
                            {this.state.userDetails.firstName}{" "}
                            {this.state.userDetails.lastName}
                        </Name>
                        <ActionDiv>
                            <Links>Add Product/Service</Links>
                            <Links>Edit Product/Service</Links>
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>
                    <FormDiv>
                        <InputDiv>
                            <Label>Product/Service</Label>
                            <Input
                                type="text"
                                value={this.state.productName}
                                name="productName"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Name of Organization/Individual</Label>
                            <Input
                                type="text"
                                value={this.state.merchantName}
                                name="merchantName"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Price</Label>
                            <Input
                                type="text"
                                value={this.state.productPrice}
                                name="productPrice"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Contact</Label>
                            <Input
                                type="text"
                                value={this.state.merchantContact}
                                name="merchantContact"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Brief Description</Label>
                            <DescInput
                                type="text"
                                value={this.state.productDescription}
                                name="productDescription"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Upload Product Image</Label>
                            {/*<FileUploader
                    className="file-uploader"
                    accept="image/*"
                    name="productImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addProductImage()}
                    onUploadStart={this.handleUploadProductStart}
                    onUploadError={this.handleUploadProductError}
                    onUploadSuccess={this.handleUploadProductSuccess}
                    onProgress={this.handleProductProgress}
                  />*/}
                            {this.state.isUploadingProduct && (
                                <p className="progress">
                                    Progress:{" "}
                                    <LinearProgress
                                        className=""
                                        valueBuffer={this.state.productProgress}
                                    />
                                </p>
                            )}
                        </InputDiv>
                        <UploadButton type="submit" onClick={this.handleProductUpload}>
                            Upload
                        </UploadButton>
                        {renderIf(this.state.landFinished === true)(
                            <Alert>Product Uploaded successfully!</Alert>
                        )}
                    </FormDiv>
                </TopDiv>
            </MainDiv>
        );
    }
}

export default MerchantDashboard;