import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import SignOut from "../../SignOut";
import renderIf from "render-if";
import {
    ActionDiv, Alert, DescInput,
    FormDiv,
    Input,
    InputDiv,
    Label, LeaseDiv, LeaseInputDiv,
    Links,
    MainDiv,
    Name,
    ProfileDiv,
    Title,
    TopDiv, UploadButton
} from "../Dashboard";

class FarmerDashboard extends Component {
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
                                value={this.state.landName}
                                name="landName"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                value={this.state.landLocation}
                                name="landLocation"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Suitable crop</Label>
                            <Input
                                type="text"
                                value={this.state.suitableCrop}
                                name="suitableCrop"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Size</Label>
                            <Input
                                type="text"
                                value={this.state.landSize}
                                name="landSize"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Price</Label>
                            <Input
                                type="text"
                                value={this.state.landPrice}
                                name="landPrice"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Brief Description</Label>
                            <DescInput
                                type="text"
                                value={this.state.landDescription}
                                name="landDescription"
                                onChange={this.handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Upload Land Image</Label>
                            {/* <FileUploader
                    accept="image/*"
                    name="landImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addLandImage()}
                    onUploadStart={this.handleUploadLandStart}
                    onUploadError={this.handleUploadLandError}
                    onUploadSuccess={this.handleUploadLandSuccess}
                    onProgress={this.handleLandProgress}
                  />*/}
                        </InputDiv>
                        <InputDiv>
                            <Label>Upload title deed image</Label>
                            {/* <FileUploader
                    accept="image/*"
                    name="titleDeedImageUrl"
                    randomizeFilename
                    storageRef={this.props.firebase.addLandImage()}
                    onUploadStart={this.handleUploadLandStart}
                    onUploadError={this.handleUploadTitleDeedError}
                    onUploadSuccess={this.handleUploadTitleDeedSuccess}
                    onProgress={this.handleLandProgress}
                  />*/}
                        </InputDiv>
                        {/* {this.state.isUploadingLand && (
                  <p className="progress">
                    Progress:{" "}
                    <LinearProgress
                      className=""
                      valueBuffer={this.state.landProgress}
                    />
                  </p>
                )} */}
                    </FormDiv>
                </TopDiv>
                <LeaseDiv>
                    <Title>Lease Agreement</Title>
                    <LeaseInputDiv>
                        <Label>Lessor Name</Label>
                        <Input
                            type="text"
                            value={this.state.lessorName}
                            name="lessorName"
                            onChange={this.handleChange}
                        />
                    </LeaseInputDiv>

                    <LeaseInputDiv>
                        <Label>Expiry Date</Label>
                        <Input
                            type="text"
                            value={this.state.expiryDate}
                            name="expiryDate"
                            onChange={this.handleChange}
                        />
                    </LeaseInputDiv>
                    <LeaseInputDiv>
                        <Label>Contact</Label>
                        <Input
                            type="text"
                            value={this.state.lessorContact}
                            name="lessorContact"
                            onChange={this.handleChange}
                        />
                    </LeaseInputDiv>
                </LeaseDiv>
                <UploadButton type="submit" onClick={this.handleLandUpload}>
                    Upload
                </UploadButton>
                {renderIf(this.state.landFinished === true)(
                    <Alert>Land Uploaded successfully!</Alert>
                )}
            </MainDiv>
        );
    }
}

export default FarmerDashboard;