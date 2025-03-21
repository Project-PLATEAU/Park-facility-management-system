import React from "react"
import './App.css';
import RootView from "./views";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css"
import UseMainData from "./data/main";

Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_DEFAULT_ACCESS_TOKEN
window.CESIUM_BASE_URL = "./cesium/"

export const MainDataContext = React.createContext()

const App = () => {

    const useMainData = UseMainData()

    return (
        <MainDataContext.Provider value={useMainData}>
            <RootView />
        </MainDataContext.Provider>
    )
}

export default App;
