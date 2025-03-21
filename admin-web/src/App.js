import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Root from "./views/root"
import "ag-grid-enterprise"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { LicenseManager } from "ag-grid-enterprise"
import {useEffect} from "react"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9770AVL7UMxlKrZdwtlyrb6tfN75RPXM",
    authDomain: "echigo-park-oss-sample.firebaseapp.com",
    projectId: "echigo-park-oss-sample",
    storageBucket: "echigo-park-oss-sample.appspot.com",
    messagingSenderId: "225764097488",
    appId: "1:225764097488:web:adf408d515268cc59c0dd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {

    useEffect(() => {
        process.env.REACT_APP_AG_GRID_LICENSE_KEY && LicenseManager.setLicenseKey(process.env.REACT_APP_AG_GRID_LICENSE_KEY)
    }, []);



  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Root />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
