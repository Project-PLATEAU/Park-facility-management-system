import React, {useContext, useMemo, useState} from "react"
import {Box, Button, TextField, Typography} from "@mui/material";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {RootDataContext} from "../index";

const LoginView = (props) => {

    const { setUser } = useContext(RootDataContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const auth = useMemo(() => getAuth(), [])
    const [isError, setIsError] = useState()

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setIsError(null)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setIsError(null)
    }

    const onLoginClick = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                setUser(user)
            })
            .catch(e  => {
                setIsError(e)
            })
    }

    return (
        <Box style={{display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh'}}>
            <Box style={{display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '40%',
                maxWidth: '350px', alignItems: "center"}}>
                <Typography variant="h5">越後丘陵公園　施設管理</Typography>
                <TextField style={{width: "100%"}} label="メールアドレス" variant="outlined" size="small" type="email" value={email} onChange={onChangeEmail} />
                <TextField style={{width: "100%"}} label="パスワード" variant="outlined" size="small" type="password" value={password} onChange={onChangePassword} />
                {isError && <Typography style={{color: "red"}}>メールアドレスまたはパスワードが違います</Typography>}
                <Button style={{margin: '8px',
                    width: '160px'}} variant="contained" onClick={onLoginClick}>ログイン</Button>
            </Box>
        </Box>
    )

}

LoginView.propTypes = {

}

export default LoginView
