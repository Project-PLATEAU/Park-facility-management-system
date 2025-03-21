import React, {useEffect, useMemo, useState} from "react"
import {Box, Drawer, Typography} from "@mui/material"
import UseRootData from "./data"
import HeaderView from "./header"
import ListView from "./list"
import MapView from "./map"
import ReportView from "./report"
import DetailView from "./detail"
import {WindowMode} from "./data/state"
import { getAuth } from "firebase/auth"
import LoginView from "./login";

const styles = {
    root: {
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        position: "relative",
        overflow: "hidden",
    }
}

export const RootDataContext = React.createContext()

const RootView = (props) => {

    const useRootData = UseRootData()
    const { state , setUser} = useRootData
    const drawerWidth = 360
    const [initializing, setInitializing] = useState(true)
    const auth = useMemo(() => getAuth(), [])

    useEffect(() => {
        if (!auth) { return }

        if (auth.currentUser) {
            setUser(auth.currentUser)
        } else {
            setUser(null)
        }
        setInitializing(false)
    }, [auth]);

    return (
        <RootDataContext.Provider value={useRootData}>
            {initializing && <Box><Typography>初期化中...</Typography></Box>}
            {!initializing && !state.user && <LoginView />}
            {!initializing && state.user && (<Box style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                <Box sx={styles.root}>
                    <HeaderView />
                    {(state.windowMode === WindowMode.Both || state.windowMode === WindowMode.List) && (
                        <Box sx={styles.content}>
                            <ListView />
                        </Box>)}
                    {(state.windowMode === WindowMode.Both || state.windowMode === WindowMode.Map) && (
                        <Box sx={styles.content} style={{height: state.windowMode === WindowMode.Both ? "80px" : "inherit"}}>
                            <MapView />
                        </Box>)}
                    {state.windowMode === WindowMode.Report && (
                        <Box sx={styles.content}>
                            <ReportView />
                        </Box>
                    )}
                </Box>
                {state.detail && <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={!!state.detail}
                >
                    <DetailView />
                </Drawer>}
            </Box>)}
        </RootDataContext.Provider>
    )
}

export default RootView
