import React, {useContext} from "react";
import {Box, Button} from "@mui/material";
import {MainDataContext} from "../App";

const styles = {
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        width: '20%',
        maxWidth: '240px',
        background: '#339d33',
    },
}

const LoginView = () => {

    const { setUser } = useContext(MainDataContext)

    const onLogin = () => {
        setUser({name: "管理者"})
    }

    return (
        <Box style={styles.root}>
           <Button style={styles.loginButton} variant="contained" onClick={onLogin}>ツールログイン</Button>
        </Box>
    )

}

export default LoginView
