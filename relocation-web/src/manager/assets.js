import useApiManager from "./api2";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {MainDataContext} from "../App";

const AssetManager = () => {

    const { refreshList } = useContext(MainDataContext)
    const { GetOne } = useApiManager()
    const lastHash = useRef()
    //const [lastHash, setLashHash] = useState()

    const checkHash = useCallback(() => {
        GetOne("management_3d_assets/hash")
            .then(hash => {
                if (lastHash.current && hash === lastHash.current) { return }
                console.log("[CheckHash]", lastHash.current, hash)
                lastHash.current = hash
                refreshList()
            })
    }, [])

    useEffect(() => {
        const inv = setInterval(checkHash, 10000)

        return () => {
            clearInterval(inv)
        }
    }, [])

    return null

}

export default AssetManager
