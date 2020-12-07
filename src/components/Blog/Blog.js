import React from "react";
import styled from "styled-components";
import {makeRequest} from "../../helpers/network_utils";
import {GET_REQUEST} from "../../values/globals";
import endpoints from "../../constants/endpoints";
import {parseErrorResponse, showAlert} from "../../helpers/helper_functions";
import {getUserObject} from "../../helpers/login";
import {Link} from "react-router-dom";

const MainDiv = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const MainBlogDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  jutify-content: center;
  margin-left: 1em;
`;

const Title = styled.div`
    font-family: Montserrat;
    font-style: normal;
    font-size: 1.8em;
    font-weight; 600;
    color: #3D9A04;
`;

const BlogDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  jutify-content: center;
`;

/*const BlogTitle = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.5em;
  font-weight; 500;
  color: black;
`;*/

/*const BlogImage = styled.div`
  height: ${(props) => (props.short ? "20vh" : "40vh")};
  width: ${(props) => (props.thin ? "15vw" : "50vw")};
  border: none;
  border-radius: 8px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const BlogContentDiv = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
`;

const Paragraph = styled.p`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.1em;
  font-weight: 400;
  color: black;
  margin-top: 0.3em;
`;

const OtherBlogs = styled.div`
  height: auto;
  width: 35%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.5em;
  border-left: 1px solid black;
`;

const Heading = styled.h4`
  font-family: Helvetica;
  font-style: normal;
  font-size: 1.1em;
  font-weight: 500;
  color: black;
`;

const OthersDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const OtherBlog = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1.5em;
`;

const OtherBlogInfo = styled.div`
  height: auto;
  margin-left: 1em;
`;*/

const parse = require('html-react-parser');

class Blog extends React.Component {

    state = {
        loading: false,
        blog: []
    }

    componentDidMount() {
        this.getBlog()
    }

    getBlog = () => {
        const {id} = this.props.match.params;
        this.setState({
            loading: true
        })
        makeRequest(GET_REQUEST, `${endpoints.blogs}${id}`, {}, response => {
            this.setState({
                blog: response.data
            })
        }, error => {
            showAlert('error', 'Blog Error', parseErrorResponse(error))
        }, () => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const {blog, loading} = this.state;
        const user = getUserObject();
        return (
            loading ?
                <div className="text-center p-5 m-5">
                    Loading blog...
                </div> :
                <MainDiv>
                    <MainBlogDiv>
                        <div className="d-flex justify-content-between w-100">
                            <Title>{blog?.title ?? "-"}</Title>
                            {
                                user.role === "admin" &&
                                <Link to={`/blog/edit/${blog?.id}`} className="btn btn-success">
                                    Edit
                                </Link>
                            }
                        </div>
                        <BlogDiv className="my-5">
                            {parse(blog?.body || "")}
                        </BlogDiv>
                    </MainBlogDiv>
                    {/*<OtherBlogs>
                        <Heading>Related Information</Heading>
                        <OthersDiv>
                            <OtherBlog>
                                <BlogImage short thin>
                                    <Image src={LandImage} alt="Land Image"></Image>
                                </BlogImage>
                                <OtherBlogInfo>
                                    <h4>Soil Types In Kenya</h4>
                                    <p>By A.L.L</p>
                                </OtherBlogInfo>
                            </OtherBlog>
                            <OtherBlog>
                                <BlogImage short thin>
                                    <Image src={LandImage} alt="Land Image"/>
                                </BlogImage>
                                <OtherBlogInfo>
                                    <h4>Soil Types In Kenya</h4>
                                    <p>By A.L.L</p>
                                </OtherBlogInfo>
                            </OtherBlog>
                        </OthersDiv>
                    </OtherBlogs>*/}
                </MainDiv>
        );
    }
}

export default Blog;
