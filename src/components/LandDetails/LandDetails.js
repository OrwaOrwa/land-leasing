import React, {Component} from "react";
import {withFirebase} from "../Firebase";
import "./LandDetails.css";
// import Map from "../Map";
import styled from "styled-components";
import ReactModal from "react-modal";
import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST, POST_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";
import {parseErrorResponse, showAlert} from "../../helpers/helper_functions";
import noImage from '../../assets/img/404.png';
import MapContainer from "../Map";
import AddImageModal from "../ViewLand/add_land_images_modal";
import Swal from "sweetalert2";
import {getUserObject} from "../../helpers/login";
import {Link} from 'react-router-dom';
import {numberWithCommas} from '../../helpers/helper_functions';

const $ = window.$;

const MainDiv = styled.div`
  padding: 1.5em;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-size: 1.5em;
  font-weight: 700;
  padding:30px;
  color: #3d9a04;
`;

const TopDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  height: auto;
  width: 100%;
`;

const ImageContainer = styled.div`
  height: auto;
  width: 60%;
`;

const ImageDiv = styled.div`
  height: 50vh;
  width: 50vw;
`;

/*const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const LandName = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1em;
  color: black;
`;*/

const LandDetail = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
`;

const Detail = styled.div`
  width: 80%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Option = styled.h3`
  font-family: Montserrat;
  color:#3D9A04;
  font-weight: 500;
  margin-right: 20px;
  font-size: 1.2em;
`;

const Value = styled.h3`
  font-family: montserrat;
  font-style; normal;
  font-weight:500;
  font-size: 1em;
  padding: 1em;
`;
/*

const CertificateDiv = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const CertificateImages = styled.div`
  width: 80%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const CertImage = styled.div`
  height: 15em;
  width: 15em;
  border: none;
  border-radius: 8px;
`;
*/

const ButtonDiv = styled.div`
  width: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5em;
`;

const Button = styled.button`
  height: 3em;
  width: 12em;
  margin-right: 1rem;
  background-color: #3d9a04;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

class LandDetails extends Component {
    state = {
        land: null,
        loading: false,
        showModal: false,
        showChatModal: false,
        lease_agreed: false,
        land_bought: false
    };

    componentDidMount() {
        this.getLand()
    }

    getLand = () => {
        const {id} = this.props.match.params;
        this.setState({
            loading: true
        })
        makeRequest(GET_REQUEST, `${endpoints.lands}${id}`, {}, response => {
            this.setState({
                land: response.data
            })
        }, error => {
            showAlert('error', 'Error', parseErrorResponse(error))
        }, () => {
            this.setState({
                loading: false
            })
        })
    }

    handleOpenModal = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    handleOpenChatModal = () => {
        this.setState({showChatModal: true});
    };

    handleCloseChatModal = () => {
        this.setState({showChatModal: false});
    };

    handleAcceptLease = () => {
        this.setState({
            lease_agreed: true
        })
        this.handleCloseModal();
    }

    handleBuyLand = () => {
        const {lease_agreed} = this.state;
        const {id} = this.props.match.params;
        if (!lease_agreed) {
            Swal.fire({
                title: 'Error!',
                text: `You have to agree to the lease agreement before proceeding.`,
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then()
            return;
        }

        
        makeRequest(POST_REQUEST, `${endpoints.user_lands}buy`, {land_id: id}, response => {
            const res = response.data;
            const {history} = this.props;
            const {land} = this.state;
            Swal.fire({
                title: `Mpesa Payment Confirmation for KES ${numberWithCommas(land.price || "-")}`,
                text: `Please check your mobile phone for a prompt and click "Confirm" after submitting.`,
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                allowOutsideClick: () => !Swal.isLoading()
            }).then(result => {
                if (result.isDismissed) return;
                Swal.fire({
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    title: 'Validating transaction',
                    text: 'Validating Transaction',
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: () => !Swal.isLoading()
                }).then();
                makeRequest(POST_REQUEST, endpoints.validate_mpesa, {
                    request_id: res.CheckoutRequestID,
                    land_id: id
                }, () => {
                    showAlert('success', 'Success!', 'Your transaction completed successfully');
                }, error => {
                    showAlert('error', 'Error!', parseErrorResponse(error));
                }, () => {
                    Swal.hideLoading();
                })
            })
        }, error => {
            showAlert('error', 'Error', parseErrorResponse(error))
        }, () => {
            this.setState({loadingCheckout: false})
        })

    }

    render() {
        const {loading, land} = this.state;
        const {match} = this.props;
        const user = getUserObject();
        return (
            loading ?
                <div className="text-center">
                    Loading....
                </div> :
                land ?
                    <MainDiv>
                        <AddImageModal callback={this.getLand} match={match}/>
                        <Title>Land Description  {
                            user.id === land.farmer.id && <Link to={`/dashboard/${land.id}`} className="btn btn-info my-2 bg-info" style={{textDecoration: "none"}}>
                                Edit
                            </Link>
                        }
                        </Title>
                        <TopDiv>
                            <ImageContainer>
                                <ImageDiv>
                                    <div style={{height: "30vh"}} id="carousel"
                                         className="carousel slide bg-gray text-center"
                                         data-ride="carousel">
                                        <div className="carousel-inner">
                                            {
                                                land.image.length < 1 ?
                                                    <img style={{objectFit: "contain", height: "40vh"}}
                                                         className="imi d-inline-block mb-3 mb-lg-0 img-fluid"
                                                         src={noImage} alt="car"/> :
                                                    land.image.map((image, index) =>
                                                        <div key={image.id}
                                                             className={`carousel-item ${index === 0 && "active"}`}>
                                                            <img style={{
                                                                objectFit: "cover",
                                                                height: "40vh",
                                                                width: "100%"
                                                            }}
                                                                 className="imi d-inline-block mb-3 mb-lg-0 img-fluid"
                                                                 src={image.image} srcSet={image.image} alt="car"/>
                                                        </div>)
                                            }
                                        </div>
                                        <a className="carousel-control-prev" href="#carousel" role="button"
                                           data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carousel" role="button"
                                           data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </ImageDiv>
                            </ImageContainer>
                            <LandDetail>
                                <Detail>
                                    <Option>Size: </Option>
                                    <Value>{land.size}</Value>
                                </Detail>
                                <Detail>
                                    <Option>Price: </Option>
                                    <Value>{land.price}</Value>
                                </Detail>
                                <Detail>
                                    <Option>Brief Description: </Option>
                                    <Value>{land.description}</Value>
                                </Detail>
                            </LandDetail>
                        </TopDiv>
                        {
                            user.id === land.farmer.id && <Button onClick={e => {
                                e.preventDefault();
                                $('#addImageModal').modal('show');
                            }} className="my-2 bg-info" style={{textDecoration: "none"}}>
                                Add Images
                            </Button>
                        }


                        <div style={{marginBottom: "60vh"}} className="w-100">
                            <div className="col-12 position-relative">
                               <Title>Location:</Title>
                                <MapContainer initialCenter={{lat: land.lat, lng: land.lon}}/>
                            </div>
                        </div>
                        <ButtonDiv>
                          
                            <Button onClick={this.handleOpenModal}>Lease Agreement</Button>
                            {user.role === "user" &&  <Button onClick={()=>{
                                window.open(`https://api.whatsapp.com/send?phone=${land.farmer.phone_number}`)
                            }}>Chat with Seller</Button>} 
                            {user.role === "user" && <Button onClick={this.handleBuyLand}>Proceed To Payment</Button>}
                        
                            <ReactModal
                                isOpen={this.state.showChatModal}
                                contentLabel="Chat">
                                <div className="d-flex flex-column h-100">
                                    <iframe style={{width: "100%", height: "100%"}}
                                            src="https://go-chat.netlify.app/"
                                            title="description"/>
                                    <Button className="bg-danger my-2" onClick={this.handleCloseChatModal}>
                                        Cancel
                                    </Button>
                                </div>

                            </ReactModal>
                            <ReactModal
                                isOpen={this.state.showModal}
                                contentLabel="Lease Agreement"
                            ><h2>Lease Agreement</h2>
                                <p>
                                    This agreement is from <b>{land.farmer.name}</b>(
                                    landowner) to <b> {user.name} </b>, for the lease of
                                    certain parcels of land for the purpose of Agricultural practice
                                    (Farming )
                                </p>
                                <p>
                                    1.The parcel(s) contained in this agreement are is/described as
                                    follows: location, Size.
                                </p>
                                <p>
                                    2. The term of this lease shall be Expire in 
                                     <b> {land.lease_period}</b> Years {" "}
                                    except as terminated earlier according to a consensus Agreement.{" "}
                                </p>

                                <p>
                                    3. The tenant agrees to pay a lease fee to the landowner of<b> Ksh. 
                                    {land.price}</b> per <b>{land.size}</b>.
                                    The tenant agrees to pay such sum at the beginning of the lease
                                    term and on the anniversary thereof unless otherwise mutually
                                    agreed. This lease fee may be renegotiated annually.
                                </p>

                                <p>
                                    4. Permitted Uses: The tenant is permitted all normal activities
                                    associated with the above purposes, including but not limited to:
                                    The tenant agrees to employ standard best management practices. It
                                    shall not be considered a default of this Lease if weather or
                                    other circumstance prevents timely practices or harvesting.<b>{" "}</b>
                                </p>

                                <p>
                                    5. Prohibited Uses: The tenant shall not, unless by mutual
                                    agreement to the contrary, engage in any of the following
                                    activities on said parcel(s):{" "}
                                </p>
                                <p>
                                    6. The tenant agrees to prepare an annual management plan for
                                    review by the landlord, complete annual soil testing, and apply
                                    amendments as indicated at his/her own expense. The tenant agrees
                                    to proper disposal of trash and waste. The tenant further agrees:{" "}
                                </p>
                                <p>
                                    7. The land owner <b>{land.farmer.name}</b> agrees to pay all taxes and assessments
                                    associated with this parcel, that accrued before leasing it out.{" "}
                                </p>
                                <p>
                                    8. The farmer agrees to provide the landowner with evidence of
                                    liability insurance coverage.{" "}
                                </p>
                                <p>
                                    9. Either party may terminate this lease at any time with 3 month
                                    notice to the other party. The tenant agrees not to assign or
                                    sublease his/her interest.{" "}
                                </p>
                                <p>
                                    10. The terms of this lease may be amended by mutual consent.{" "}
                                </p>
                                <p>
                                    11. A default in any of these provisions by either party may be
                                    cured upon written notice by the other party within 30 days of
                                    receipt of such notice. Any disputes occurring from this lease may
                                    be resolved by standard mediation practices, if necessary.{" "}
                                </p>
                                <p>
                                    12. Landowner retains his/her right to access the parcel(s) for
                                    the purposes of inspection with prior notification to the tenant.
                                </p>
                                <div className="row align-items-center justify-content-between">
                                    <Button onClick={this.handleAcceptLease}>
                                        I agree to the terms of the agreement
                                    </Button>
                                    <Button className="bg-danger" onClick={this.handleCloseModal}>
                                        Cancel
                                    </Button>
                                </div>

                            </ReactModal>
                        </ButtonDiv>
                    </MainDiv>
                    :
                    <div className="text-center">
                        <h5>
                            Could not load land
                        </h5>
                    </div>
        );
    }
}

export default withFirebase(LandDetails);
