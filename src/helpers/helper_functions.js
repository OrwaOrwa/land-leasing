import swal from "sweetalert2";
import Swal from "sweetalert2";

export const parseTime = (t) => {
    let d = new Date();
    let time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
}
export const parseErrorResponse = function (error) {
    let message;
    if (error.response !== null && error.response !== undefined) {
        //  console.log(error.response.data);
        if (error.response.data.detail) {
            message = error.response.data.detail;
        } else {
            let response = error.response.data;
            if (typeof response === "string") {
                try {
                    message = getStringFromObject(JSON.parse(response));
                } catch (e) {
                    message = "An error occurred. Please try again or contact support";
                }
            } else if (typeof response === 'object') {
                message = getStringFromObject(response);
            } else {
                message = response;
            }
        }


        if (message.length === 0) {
            switch (error.response.status) {
                case 401:
                    message = "Unauthorised. Please log in";
                    break;
                case 404:
                    message = "The requested resource could not be found";
                    break;
                default:
                    message = "An error occurred. Please try again, or contact support";
                    break;
            }
        }
    } else {
        if (typeof error === "string") {
            message = error;
        } else {
            message = "An error occurred. Please try again, or contact support";
        }

    }

    return message;
};

const getStringFromObject = function (obj) {
    let message = "";
    const map = new Map(Object.entries(obj));
    for (const [key, value] of map.entries()) {
        message = `${message} ${key}: ${value}`;
    }
    return message;
};

export const asyncShowAlert = async (type, title) => {
    return swal.fire({
        title,
        timer: 5000,
        icon: type,
        timerProgressBar: true
    });
}

export const handleChange = (e, self) => {
    const name = e.target.name;
    const value = e.target.value;
    self.setState({[name]: value});
}

export const handleChangeData = (e, self) => {
    const name = e.target.name;
    const value = e.target.value;
    let data = {...self.state.data};
    data[name] = value;
    self.setState({data: data});
}

export const showAlert = (type, title, body) => {
    Swal.fire({
        title: title,
        timer: 5000,
        icon: type,
        text: body,
        timerProgressBar: true,
    }).then();
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
