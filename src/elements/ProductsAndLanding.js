import styled from "styled-components";
import HomeImage from "../resources/images/home_farmland.png";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopDiv = styled.div`
  height: 60vh;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${HomeImage});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const SearchDiv = styled.div`
  position: absolute;
  width: 60vw;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const SearchTitle = styled.h3`
  font-family: Helvetica;
  font-weight: 700;
  font-style: normal;
  font-size: 2.3em;
  line-height: 41.4px;
  color: white;
`;

export const SearchInputs = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
`;

export const Input = styled.input`
  height: 2.5em;
  width: 11em;
  border-radius: 8px;
  border: none;
  padding-left: 1em;
  margin: 0.4em;

  :focus {
    border: none;
  }
`;

export const SearchButton = styled.button`
  height: 2.5em;
  width: 40%;
  background-color: #3d9a04;
  color: white;
  border-radius: 8px;
  margin-top: 1.5em;
  border: none;
  cursor: pointer;
`;

export const ItemsContainer = styled.div`
  margin-top: 1.3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const ItemsName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2em;
  color: #3d9a04;
`;

export const ItemsDiv = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const Item = styled.div`
  width: 326px;
  height: 341px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1em;
`;

export const ItemImageDiv = styled.div`
  height: 200px;
  width: 100%;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const ItemDetailsDiv = styled.div`
  height: 140px;
  width: 100%;
  padding-left: 1em;
  padding-top: 0.5em;
`;

export const ItemName = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2em;
`;

export const Crops = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
`;

export const Price = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 1.3em;
  color: #3d9a04;
`;
