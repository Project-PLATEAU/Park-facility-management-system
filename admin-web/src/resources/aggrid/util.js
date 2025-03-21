import PropTypes from "prop-types";
import dayjs from "dayjs";
import axios from "axios";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

export const DistinctFilterParamsMode = {
    cartodb_v2: "cartodb_v2",
    api: "api",
}

export const UseDistinctFilterParams = (props) => {

    const CartoV2Query = (sql, params = {}) => {
        return new Promise((resolve, reject) => {
            try {
                let url = `${props.path}/api/v2/sql`

                axios({method: props.method ?? "get", url, data: {
                    api_key: props.apiKey,
                        q: sql,
                        tm: dayjs().unix(),
                }, headers: {"content-type": "application/json"}})
                    .then(res => {
                        resolve(res)
                    })
                    .catch(reject)
            } catch (e) {
                reject(e)
            }
        })
    }

    const CartoV2Rows = (sql, params = {}) => {
        return new Promise((resolve, reject) => {
            CartoV2Query(sql, params)
                .then((ret) => {
                    resolve(ret?.data?.rows)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }

    return {
        values: (params) => {
            if (props.mode === DistinctFilterParamsMode.cartodb_v2) {
                // filter modelはちょっとむずかしいので判断しない

            }
        }
    }
}
UseDistinctFilterParams.propTypes = {
    path: PropTypes.string.isRequired,
    apiKey: PropTypes.string,
    mode: PropTypes.string.isRequired,
    method: PropTypes.string,
    valueFormatter: PropTypes.func,
}

export const TotalRowCountStatusPanel = (props) => {
    const [rowCount, setRowCount] = useState("--")

    useEffect(() => {
        const updateRowCount = () => {
            if (props.api) {
                setRowCount(props.api.getRowCount().toLocaleString())
            }
        }

        props.api.addEventListener('modelUpdated', updateRowCount)


        return () => {
            props.api.removeEventListener('modelUpdated', updateRowCount)
        }
    }, [props.api]);

    return (<Box>合計:{rowCount}</Box>)
}
