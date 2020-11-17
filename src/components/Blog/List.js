import React, {Component} from 'react';
import styled from "styled-components";
import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";
import {parseErrorResponse, showAlert} from "../../helpers/helper_functions";
import Link from "@material-ui/core/Link";


const MainDiv = styled.div`
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

/*const ItemDetails = styled.div`
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

const ItemExtraDetails = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
`;*/

const ItemPrice = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1em;
  font-weight: 600;
  color: black;
`;

const MerchantContact = styled.a`
  font-family: Helvetica;
  font-style: normal;
  font-size: 0.9em;
  font-weight: 400;
  color: white;
  text-decoration: none;
`;

class BlogList extends Component {

    state = {
        loading: false,
        blogs: []
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = () => {
        this.setState({
            loading: true
        })
        makeRequest(GET_REQUEST, `${endpoints.blogs}`, {}, response => {
            this.setState({
                blogs: response.data
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
        const {blogs, loading} = this.state;

        return (
            <MainDiv>
                <TopDiv>
                    <InnerDiv>
                        <Title>All Blogs</Title>
                    </InnerDiv>
                    <InnerDiv>
                        {/* <SearchInput type="text" placeholder="Search"></SearchInput> */}
                    </InnerDiv>
                </TopDiv>
                <ItemsDiv>
                    {loading ?
                        <div>
                            Loading blogs...
                        </div> : blogs.length < 1 ?
                            <div>No blogs Yet</div> :
                            blogs.map((blog) => (
                                <Item key={blog.id} className="py-3 px-5 d-flex justify-content-between align-items-center shadow">
                                    <h4>{blog.title}</h4>
                                    <div className="d-flex flex-column">
                                        <Link href={`/blog/${blog.id}`}
                                              className="btn btn-lg bg-success mb-3">
                                            <MerchantContact>Read</MerchantContact>
                                        </Link>
                                        <ItemPrice>{new Date(blog.created_at).toLocaleString()}</ItemPrice>
                                    </div>
                                </Item>
                            ))
                    }
                </ItemsDiv>
            </MainDiv>
        );
    }
}

export default BlogList;