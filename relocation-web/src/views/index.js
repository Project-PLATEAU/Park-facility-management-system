import React, {useContext, useEffect} from "react"
import UseMainData from "../data/main";
import LoginView from "./login";
import MainView from "./main";
import {Box} from "@mui/material";
import {MainDataContext} from "../App";
import AssetManager from "../manager/assets";

const styles = {
    root: {
        padding: '0',
        margin: '0',
        overflow: 'hidden',
    }
}

const RootView = () => {

    const { state } = useContext(MainDataContext)

    useEffect(() => {
        console.log("[UseMainData]", "state", state)
    }, [state])

    return (
            <Box style={styles.root}>
                {state.user && <MainView />}
                {!state.user && <LoginView />}
                <AssetManager />
            </Box>
    )


}

export default RootView
