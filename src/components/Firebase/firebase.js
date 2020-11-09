/*
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDDSIhiCDKQe08nYp6LprqIhIe0HeWfBaA",
  authDomain: "land-website-fc967.firebaseapp.com",
  databaseURL: "https://land-website-fc967.firebaseio.com",
  projectId: "land-website-fc967",
  storageBucket: "land-website-fc967.appspot.com",
  messagingSenderId: "783040368429",
};

// const config = {
//   apiKey: "AIzaSyChzOK52YYgIIQ3dX1YnJzT8RGzdMhp1vs",
//   authDomain: "agricultural-land-leasing.firebaseapp.com",
//   databaseURL: "https://agricultural-land-leasing.firebaseio.com",
//   projectId: "agricultural-land-leasing",
//   storageBucket: "agricultural-land-leasing.appspot.com",
//   messagingSenderId: "203735485726",
//   appId: "1:203735485726:web:8dd1ad47a97f9db86b8d0f",
//   measurementId: "G-QHQJXJC2BD",
// };
class Firebase {
  constructor() {
    app.initializeApp(config);
    // instantiating the auth package
    this.auth = app.auth();
    this.db = app.database();
    this.store = app.storage();
  }

  // AUTH API

  //sign up function
  doRegister = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // sign in function
  doLogin = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // sign out
  doSignOut = () => this.auth.signOut();

  // password reset
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // password update
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // all land
  land = () => this.db.ref("items/land");

  // all payments
  payments = () => this.db.ref("payments");

  // single land
  findLand = (landID) => this.db.ref(`items/land/${landID}`);

  //search
  searchLand = () => this.db.ref("items/land");

  addLandImage = () => this.store.ref("items/land/images");

  // all products
  products = () => this.db.ref("items/products");

  addProductImage = () => this.store.ref("items/products/images");
}
export default Firebase;
*/
