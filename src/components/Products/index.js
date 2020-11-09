import React, {Component} from "react";
import "./index.css";
import styled from "styled-components";
import {getProducts} from "../../providers/Products";

const MainDiv = styled.div`
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e5e5e5;
`;

const InnerDiv = styled.div`
  height: auto;
  width: 40%;
`;

const Title = styled.h2`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.3em;
  font-weight: 700;
  color: #3d9a04;
  padding-left: 2em;
`;

// const SearchInput = styled.input`
//   height: 2.3em;
//   width: 80%;
//   border: none;
//   border-radius: 8px;
//   background-color: white;
//   padding-left: 1em;
// `;

const ItemsDiv = styled.div`
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Item = styled.div`
  height: 12rem;
  width: 85%;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
  background-color: white;
  margin-top: 1.3em;
`;

const ItemImageDiv = styled.div`
  height: 100%;
  width: 30%;
  border-radius-left: 8px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  height: 100%;
  width: 40%;
  padding-left: 1.5em;
`;

const ItemName = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.4em;
  font-weight: 400;
  color: black;
`;

const ItemProvider = styled.h5`
  font-family: Helvetica;
  font-style: italics;
  font-size: 0.8em;
  font-wight: 300;
  color: #3d9a04;
`;

const ItemDescription = styled.p`
  margin-top: 0.5em;
  font-family: Helvetica;
  font-style: italics;
  font-size: 0.8em;
  font-wight: 400;
  color: black;
`;

const ItemExtraDetails = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
`;

const ItemPrice = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1em;
  font-weight: 600;
  color: black;
`;

const ContactButton = styled.button`
  height: 2.3em;
  width: 40%;
  background-color: #3d9a04;
  color: white;
  margin-bottom: 1.5em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MerchantContact = styled.a`
  font-family: Helvetica;
  font-style: normal;
  font-size: 0.9em;
  font-weight: 400;
  color: white;
  text-decoration: none;
`;

class Products extends Component {
    state = {
        loadingProducts: false,
        products: [],
    };

    componentDidMount() {
        getProducts(this);
    }

    render() {
        const {products, loadingProducts} = this.state;
        return (
            <MainDiv>
                <TopDiv>
                    <InnerDiv>
                        <Title>All Products/Services</Title>
                    </InnerDiv>
                    <InnerDiv>
                        {/* <SearchInput type="text" placeholder="Search"></SearchInput> */}
                    </InnerDiv>
                </TopDiv>
                <ItemsDiv>
                    {loadingProducts ?
                        <div>
                            Loading products...
                        </div> : products.length < 1 ?
                            <div>No Products Yet</div> :
                            products.map((product) => (
                                <Item key={product.id} className="p-3">
                                    <ItemImageDiv>
                                        <Image src={product.image} alt={product.name}/>
                                    </ItemImageDiv>
                                    <ItemDetails>
                                        <ItemName>{product.name}</ItemName>
                                        <ItemProvider>{product.merchant.name}</ItemProvider>
                                        <ItemDescription>{product.description}</ItemDescription>
                                    </ItemDetails>
                                    <ItemExtraDetails>
                                        <ItemPrice>Ksh. {product.price}</ItemPrice>
                                        <ContactButton>
                                            <MerchantContact>Contact Merchant</MerchantContact>
                                        </ContactButton>
                                    </ItemExtraDetails>
                                </Item>
                            ))
                    }
                </ItemsDiv>
            </MainDiv>
        );
    }
}

// const condition = (authUser) => !!authUser;

// export default withAuthorization(condition)(Products);
export default Products;
