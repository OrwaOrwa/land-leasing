const userId = localStorage.getItem("uid");

export const LANDING = "/";
export const SIGN_UP = "/signup";
export const SIGN_IN = "/signin";
export const PRODUCTS = "/products";
export const ACCOUNT = "/account";
export const PASSWORD_FORGET = "/pw-forget";
export const LANDDETAILS = "/land-details/:id";
// export const DASHBOARD = "/dashboard/:id";
export const DASHBOARD = `/dashboard`;
export const BLOG = "/agricultural-blog";
export const PAYMENTS = "/payments";
export const VIEWLAND = `/${userId}/view-land`;
export const EDITLAND = `/${userId}/edit-land/:id`;
export const ADMIN = "/admin";
