import {
    DELETE_REQUEST,
    DOMAIN,
    GET_REQUEST, PATCH_REQUEST,
    POST_REQUEST,
    PUT_REQUEST,
} from "../values/globals";
import {getRefreshToken, getToken, isUserLoggedIn, logout, saveToken} from "./login";

const axios = require('axios');

const refreshRoute = '/auth/jwt/refresh/';
//Let's set our base URL:
//This is based on the assumption that the URL might vary in future when we add a module that allows drivers to track their
//packages??

axios.defaults.baseURL = DOMAIN;
//axios.defaults.withCredentials = true;

/**
 * Attach the authorization header to every Axios request as long as
 * there will be an authorization token saved to session storage
 * This raises a dilemma though, since drivers will only be logged in in a single Tab,
 * So a new Tab won't have the authorization token, hence the individual won't be logged in.
 * So Again, we could use local storage and CSRF protection (stored in a cookie).
 *
 * Meanwhile, we'll use axios interceptors to inject the CSRF token and the Authorization token.
 */
axios.interceptors.request.use(
    config => {
        const token = getToken();
        console.log("interceptor running..");
        //Inject Authorization header
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        //Inject CSRF token
        const csrfToken = getCookie('XSRF-TOKEN');
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    });

/**
 * We'll use axios interceptors to intercept the response and in cases where the error is 401, we request
 * for a new token from the server. If that also fails, then we redirect the user to the login page.
 * This is primarily because of the fact that as much as the token is still being refreshed, there might be a situation where
 * the request being currently made runs at the same time as when the refresh token request is also running.
 * This therefore means that when the refresh token request finishes and the authorization token has been updated, the server
 * will read this new authorization token as the valid token. In this same time frame, the other request is being made now
 * with a token that has been invalidated by the server and therefore the server will return with a 401 error.
 * We should therefore try to re-refresh the token again and if that fails, now we send the user to the login page.
 */
axios.interceptors.response.use((response) => {
        return response
    },
    function (error) {
      //  const originalRequest = error.config;
        if (error.response !== null && error.response !== undefined) {
           /* if (error.response.status === 401 && !originalRequest._retry) {
                console.log("Refreshing...");
                originalRequest._retry = true;
                if (!getRefreshToken()) {
                    logout();
                    return Promise.reject(error);
                }
                return axios.post(refreshRoute, {refresh: getRefreshToken()}, originalRequest)
                    .then(res => {
                        if (res !== null && res !== undefined) {
                            if (res.status === 201 || res.status === 200) {
                                saveToken(res.data.access);
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
                                return axios(originalRequest);
                            }
                        }
                    })
            }*/
            //Redirect only if error was 401 unauthorised.
            if (error.response.status === 401 && window.location.pathname !== "/signin") {
                logout();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    });


export const scheduleTokenRefreshes = function () {
    //Called every time document loads. Only runs if the user was already logged in.
    if (isUserLoggedIn()) {
        window.setInterval(function () {
            console.log("Refreshing token..");
            makeRequest(POST_REQUEST, refreshRoute, {refresh: getRefreshToken()}, function (res) {
                saveToken(res.data.access);
            }, function (error) {
                if (error && error.response) {
                    if (error.response.status === 401 || error.response.status === 400) {
                        //User is unauthorised. Let's send them to the logout page.
                        logout();
                    }
                }
                //Otherwise, we keep on retrying until connectivity is restored.
            })
        }, 90000);//Equivalent to 1 minute, 30 seconds.
    }
};

//const CancelToken = axios.CancelToken;
//const source = CancelToken.source();

//make request with a different domain:
//TODO: You can delete this.
export const makeRequestDiffDomain = function (domain, method, url, data, successFunction, errorFunction, finallyFunction) {
    const axiosInstance = axios.create();
    axiosInstance.defaults.baseURL = domain;
    //make sure url starts with "/"
    if (!url.startsWith("/")) {
        url = `/${url}`;
    }
    switch (method) {
        case GET_REQUEST:
            axiosInstance.get(url, {params: data}).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case POST_REQUEST:
            axiosInstance.post(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case DELETE_REQUEST:
            axiosInstance.delete(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case PUT_REQUEST:
            axiosInstance.put(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case PATCH_REQUEST:
            axiosInstance.patch(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        default:
            throw Error("Invalid request method supplied");
    }


};

//Set access headers necessary for accessing authorized routes.
export const makeRequest = function (method, url, data, successFunction, errorFunction, finallyFunction) {
    //make sure url starts with "/"
    if (!url.startsWith("/")) {
        url = `/${url}`;
    }
    switch (method) {
        case GET_REQUEST:
            axios.get(url, {params: data}).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case POST_REQUEST:
            axios.post(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case DELETE_REQUEST:
            axios.delete(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case PUT_REQUEST:
            axios.put(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        case PATCH_REQUEST:
            axios.patch(url, data).then(function (response) {
                if (successFunction) {
                    successFunction(response);
                }

            })
                .catch(function (error) {
                    if (errorFunction) {
                        errorFunction(error)
                    }

                })
                .finally(function () {
                    if (finallyFunction) {
                        finallyFunction();
                    }

                });
            break;
        default:
            throw Error("Invalid request method supplied");
    }


};


export const getCookie = function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue || "";
};
