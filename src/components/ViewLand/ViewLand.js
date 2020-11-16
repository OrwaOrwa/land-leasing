import React, {Component} from "react";
import {withFirebase} from "../Firebase";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";
import {parseErrorResponse, showAlert} from "../../helpers/helper_functions";
import noImage from '../../assets/img/404.png';
import AddImageModal from "./add_land_images_modal";

const $ = window.$;

const ItemsContainer = styled.div`
  margin-top: 1.3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const ItemsName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  color: #3d9a04;
`;

const ItemsDiv = styled.div`
  width: 80%;
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Item = styled.div`
  width: 326px;
  height: 341px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1em;
`;

const ItemImageDiv = styled.div`
  height: 200px;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemDetailsDiv = styled.div`
  height: 140px;
  width: 100%;
  padding-left: 1em;
  padding-top: 0.5em;
`;

const ItemName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2em;
`;

const Crops = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
`;

const Button = styled.button`
  font-size: 1em;
  background-color: #3d9a04;
  color: white;
  height: 1.6em;
  width: 80%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

class ListedHouses extends Component {
    state = {
        loading: false,
        lands: []
    }

    componentDidMount() {
        this.getLands()
    }

    getLands = () => {
        this.setState({
            loading: true
        })
        makeRequest(GET_REQUEST, `${endpoints.farmers_lands}`, {}, response => {
            this.setState({
                lands: response.data
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
        const {loading, lands} = this.state;
        return (
            loading ?
                <div className="text-center">
                    <h5>Loading....</h5>
                </div> :
                lands.length < 1 ?
                    <div className="text-center">
                        <h5>You haven't yet uploaded any lands</h5>
                    </div> :
                    <div className="listed-land-page">
                        <AddImageModal/>
                        <ItemsContainer>
                            <ItemsName>Land Available</ItemsName>
                            <ItemsDiv>
                                {lands.map((land) => (
                                    <Link
                                        to={`edit-land/${land.id}`}
                                        style={{textDecoration: "none", color: "black"}}
                                        key={land.id}
                                    >
                                        <Item>
                                            <ItemImageDiv>
                                                <Image src={land.image.length > 0 ? land.image[0].image : noImage}
                                                       alt={land.name}/>
                                            </ItemImageDiv>
                                            <ItemDetailsDiv>
                                                <ItemName>{land.name}</ItemName>
                                                <Crops>{land.crops}</Crops>
                                                <Link
                                                    to={`/lands/${land.id}`}
                                                    style={{textDecoration: "none", color: "black"}}
                                                >
                                                    <Button>View</Button>
                                                </Link>
                                                <Button onClick={e => {
                                                    e.preventDefault();
                                                    $('#addImageModal').modal('show');
                                                }} className="my-2 bg-info" style={{textDecoration: "none"}}>
                                                    Add Images
                                                </Button>
                                            </ItemDetailsDiv>
                                        </Item>
                                    </Link>
                                ))}
                            </ItemsDiv>
                        </ItemsContainer>
                    </div>
        );
    }
}

export default withFirebase(ListedHouses);
