import React, { Component } from "react";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import renderIf from "render-if";

const MainDiv = styled.div`
  height: auto;
  padding: 2em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 1.3em;
  color: #3d9a04;
`;

const PaymentDetailsDiv = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
`;

const Detail = styled.div`
  width: 40%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Option = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1em;
`;

const MakePaymentButton = styled.button`
  height: 2.4em;
  width: 12em;
  color: white;
  background-color: #3d9a04;
  border: none;
  border-radius: 7px;
  margin-top: 1em;
  cursor: pointer;
`;

const MpesaDiv = styled.div`
  margin-top: 3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Inputs = styled.input`
  height: 2.3em;
  width: 70%;
  border: none;
  border-radius: 8px;
  background-color: #e5e5e5;
  padding-left: 0.5em;
`;

const Input = styled.input`
  margin-top: 0.5em;
  height: 2.3em;
  width: 100%;
  background-color: #e5e5e5;
  border: none;
  border-radius: 8px;
`;

const Alert = styled.p`
  margin-top: 0.2em;
  color: #3d94a0;
`;

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessorName: "",
      amount: "",
      mpesaCode: "",
      finished: false,
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handlePaymentUpload = (event) => {
    event.preventDefault();

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateUploaded = date + " " + time;
    const { lessorName, amount, mpesaCode } = this.state;

    /*firebase
      .database()
      .ref(`payments/${Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}/`)
      .set({
        userID: this.props.firebase.auth.currentUser.uid,
        lessorName: lessorName,
        amount: amount,
        mpesaCode: mpesaCode,
        datePaid: dateUploaded,
      });*/
    this.setState({ finished: true });
  };
  render() {
    return (
      <MainDiv>
        <Title>Payments</Title>
        <PaymentDetailsDiv>
          <Detail>
            <Option>Lessor Name : </Option>
            <Inputs
              type="text"
              value={this.state.lessorName}
              name="lessorName"
              onChange={this.handleChange}
            />
          </Detail>
          <Detail>
            <Option>Amount : </Option>
            <Inputs
              type="text"
              value={this.state.amount}
              name="amount"
              onChange={this.handleChange}
            />
          </Detail>
        </PaymentDetailsDiv>
        {/* <MakePaymentButton>Make Payment</MakePaymentButton> */}

        <MpesaDiv>
          <Title>Enter Mpesa Code</Title>
          <Input
            type="text"
            value={this.state.mpesaCode}
            name="mpesaCode"
            onChange={this.handleChange}
          />
          <MakePaymentButton type="submit" onClick={this.handlePaymentUpload}>
            Make Payment
          </MakePaymentButton>
          {renderIf(this.state.finished === true)(
            <Alert>Payment submitted successfully!</Alert>
          )}
        </MpesaDiv>
      </MainDiv>
    );
  }
}

export default withFirebase(Payments);
