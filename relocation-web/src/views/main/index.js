import React, {useCallback, useContext, useState} from "react"
import {Box, Button, Typography} from "@mui/material";
import ListView from "./list"
import MapView from "./map"
import MovingView from "./map/moving"
import {MainDataContext} from "../../App";

const styles = {
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column'
    },
    headerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 1rem',
        height: '50px',
        alignItems: 'center',
        background: '#68c663',
        boxShadow: '#999 1px 1px 6px',
    },
    logoutButton: {
        background: 'white',
        color: '#656464',
        width: '120px',
    },
    title: {
        color: '#232323',
        fontWeight: 'bold',
    },
    mainBox: {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'row',
    },
    footerBox: {

    },
    footerSubmitButton: {

    },
    footerCancelButton: {

    },
}

const MainView = () => {

    const { state } = useContext(MainDataContext)
    const [movingPosition ,setMovingPosition] = useState()

    const onMovingEnd = useCallback((position) => {
        if (!state.movingFacility) {
            setMovingPosition(null)
            return
        }
        setMovingPosition(position)
    }, [state.movingFacility])

    const onSelectFacility = () => {

    }

    return (
        <Box style={styles.root}>
            <Box style={styles.headerBox}>
                <Typography style={styles.title}>越後丘陵公園 施設配置シミュレーション</Typography>
                <Box style={styles.headerRightContent}>
                    <Button style={styles.logoutButton} variant="contained" size="small">ログアウト</Button>
                </Box>
            </Box>
            <Box style={styles.mainBox}>
                <ListView onSelect={onSelectFacility} />
                <MapView onSelect={onSelectFacility} onMoveEnd={onMovingEnd} />
                {state.movingFacility && <MovingView />}
            </Box>
        </Box>
    )

}

export default MainView
