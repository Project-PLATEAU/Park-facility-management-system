import React from "react"
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import TargetImage from "../../../resources/image/location_target.png"

const styles = {
    root: {
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        userSelect: false,
        pointerEvents: "none",
    },
    img: {
        width: '3rem',
        opacity: '0.75',
    }
}

const MainMapMovingView = ({visible}) => {

    return visible ? (
        <Box style={styles.root}>
            <img style={styles.img} src={TargetImage} />
        </Box>
    ): null

}

MainMapMovingView.propTypes = {
    visible: PropTypes.bool,
}

export default MainMapMovingView
