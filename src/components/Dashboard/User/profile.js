import React from "react";
import {getUserObject} from "../../../helpers/login";

function UserProfile() {
    const user = getUserObject();
    return (
        <div className="col-12">
            <h5>Names</h5>
            <p>{user.name}</p>
            <h5>Email</h5>
            <p>{user.email}</p>
            <h5>Phone</h5>
            <p>{user.phone_number}</p>
        </div>
    )
}

export default UserProfile;