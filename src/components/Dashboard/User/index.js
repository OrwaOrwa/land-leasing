import React, {Component} from 'react';
import {ActionDiv, FormDiv, Links, MainDiv, Name, ProfileDiv, Title, TopDiv} from "../Dashboard";
import SignOut from "../../SignOut";
import {getUserObject} from "../../../helpers/login";
import UserLands from "./lands";
import UserProfile from "./profile";

const pages = {
    user_profile: "user_profile",
    lands: "lands"
}

class UserDashboard extends Component {

    state = {
        current_page: pages.user_profile,
    }

    render() {
        const {current_page} = this.state;
        const user = getUserObject();
        return (
            <MainDiv>
                <Title>Dashboard</Title>
                <TopDiv>
                    <ProfileDiv>
                        <Name>
                            {user.name}
                        </Name>
                        <ActionDiv>
                            <Links onClick={() => this.setState({
                                current_page: pages.user_profile
                            })}>User Profile</Links>
                            <Links onClick={() => this.setState({
                                current_page: pages.lands
                            })}>Leased Lands</Links>
                        </ActionDiv>
                        <SignOut/>
                    </ProfileDiv>

                    <FormDiv>
                        {current_page === pages.user_profile && <UserProfile/>}
                        {current_page === pages.lands && <UserLands/>}
                    </FormDiv>
                </TopDiv>
            </MainDiv>
        );
    }
}

export default UserDashboard;