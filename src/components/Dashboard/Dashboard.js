import React, {Component} from "react";
import "./Dashboard.css";
import styled from "styled-components";
/*import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";*/
import renderIf from "render-if";
import {getUserObject} from "../../helpers/login";
import FarmerDashboard from "./Farmer";
import MerchantDashboard from "./Merchant";
import {Roles} from "../../values/globals";
import UserDashboard from "./User";
import AdminDashboard from "./Admin";

export const MainDiv = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 34px;
  color: #3d9a04;
`;

export const TopDiv = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
`;

export const ProfileDiv = styled.div`
  height: 40vh;
  width: 30%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #e5e5e5;
  border: none;
  border-radius: 10px;
`;

export const Name = styled.p`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.2em;
  font-weight: 300;
`;

export const ActionDiv = styled.div`
  margin-top: 1em;
  width: 80%;
  height: auto;
  border-radius: 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-bottom: 1.5em;
  padding-left: 2.5em;
`;

export const Links = styled.p`
  text-decoration: none;
  color: black;
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.2em;
  margin-top: 0.1em;
  cursor: pointer;
  height: 1.5em;
  width: 12em;
  background-color: white;
  border-radius: 8px;
  padding-top: 0.1em;
  padding-left: 0.5em;
`;

export const FormDiv = styled.div`
  height: auto;
  width: 50%;
`;

export const InputDiv = styled.div``;

export const Label = styled.p`
  font-family: Helvetica;
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: -0.1em;
`;

export const Input = styled.input`
  height: 2.3em;
  width: 70%;
  border: none;
  border-radius: 8px;
  background-color: #e5e5e5;
  padding-left: 0.5em;
`;

export const DescInput = styled.textarea`
  height: 6em;
  width: 70%;
  border: none;
  border-radius: 8px;
  background-color: #e5e5e5;
`;

export const LeaseDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin-top: 1.5em;
`;

export const LeaseInputDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;

export const UploadButton = styled.button`
  height: 2.4em;
  width: 60%;
  color: white;
  background-color: #3d9a04;
  border: none;
  border-radius: 8px;
  margin-top: 1.5em;
  cursor: pointer;
`;

export const Alert = styled.p`
  margin-top: 0.2em;
  color: #3d94a0;
`;

class Dashboard extends Component {
    state = {
        pageLoading: false,
        landName: "",
        landPrice: "",
        landSize: "",
        landDescription: "",
        landLocation: "",
        landImageUrl: "",
        suitableCrop: "",
        landProgress: 0,
        isUploadingLand: false,
        productName: "",
        productPrice: "",
        productDescription: "",
        productImageUrl: "",
        productProgress: 0,
        merchantName: "",
        merchantContact: "",
        isUploadingProduct: false,
        userDetails: {},
        userRole: "",
        isUploading: false,
        deedProgress: 0,
        lessorName: "",
        expiryDate: "",
        lessorContact: "",
        landFinished: false,
        productFinished: false,
    };

    componentDidMount() {
        this.setState({pageLoading: true});
    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    // checks the upload progress.
    handleUploadLandStart = () =>
        this.setState({isUploadingLand: true, landProgress: 0});
    handleLandProgress = (landProgress) => this.setState({landProgress});

    // checks for errors while uploading
    handleUploadLandError = (error) => {
        this.setState({isUploadingLand: false});
        console.error(error);
    };

    // uploads the image to firebase storage.
    handleUploadLandSuccess = (filename) => {
        this.setState({
            landImageUrl: filename,
            landProgress: 100,
            isUploadingLand: false,
        });
    };

    // checks the upload progress.
    handleUploadTitleDeedStart = () =>
        this.setState({isUploadingDeed: true, deedProgress: 0});
    handleTitleDeedProgress = (deedProgress) => this.setState({deedProgress});

    // checks for errors while uploading
    handleUploadTitleDeedError = (error) => {
        this.setState({isUploadingDeed: false});
        console.error(error);
    };

    // uploads the image to firebase storage.
    handleUploadTitleDeedSuccess = (filename) => {
        this.setState({
            deedImageUrl: filename,
            deedProgress: 100,
            isUploadingDeed: false,
        });
        /*this.props.firebase
          .addLandImage()
          .child(filename)
          .getDownloadURL()
          .then((url) => this.setState({ deedImageUrl: url }));*/
    };

    handleLandUpload = (event) => {
        event.preventDefault();
        const {
            landName,
            landPrice,
            landSize,
            landDescription,
            landLocation,
            suitableCrop,
            landImageUrl,
            deedImageUrl,
            lessorName,
            lessorContact,
            expiryDate,
        } = this.state;

        this.setState({landFinished: true});
    };

    // methods to handle the product upload

    // checks the upload progress.
    handleUploadProductStart = () =>
        this.setState({isUploadingProduct: true, productProgress: 0});
    handleProductProgress = (productProgress) =>
        this.setState({productProgress});

    // checks for errors while uploading
    handleUploadProductError = (error) => {
        this.setState({isUploadingProduct: false});
        console.error(error);
    };

    // uploads the image to firebase storage.
    handleUploadProductSuccess = (filename) => {
        this.setState({
            productImageUrl: filename,
            productProgress: 100,
            isUploadingProduct: false,
        });
    };

    handleProductUpload = (event) => {
        event.preventDefault();
        const {
            productName,
            productPrice,
            productDescription,
            productImageUrl,
            merchantName,
            merchantContact,
        } = this.state;

        this.setState({productFinished: true});
    };

    render() {
        const user = getUserObject();
        return (
            <>
                {renderIf(user.role === Roles.farmer)(
                    <FarmerDashboard/>
                )}
                {renderIf(user.role === Roles.merchant)(
                    <MerchantDashboard/>
                )}
                {renderIf(user.role === Roles.user)(
                    <UserDashboard/>
                )}
                {renderIf(user.role === Roles.admin)(
                    <AdminDashboard/>
                )}
            </>
        );
    }
}

export default Dashboard;
