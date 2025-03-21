import {useContext, useRef} from "react";
import axios from "axios";
import _ from "lodash";
import {MainDataContext} from "../App";

const useApiManager = () => {

    const { state } = useContext(MainDataContext)

    const accessTokenRef = useRef()

    const getAccessToken = async () => {
        if (accessTokenRef.current) {
            return accessTokenRef.current
        }
        return null
    }

    const getHeaders = (token, headers) => {
        if (token) {
            return {AuthorizationToken: `Bearer ${token}`, ...headers}
        }
        return headers
    }

    const getEncodedParams = params => {
        if (!params) { return null }
        return Object.fromEntries(
            Object.entries(params).map(([key, value]) => {
                switch(typeof value) {
                    case "object":
                        return [key, encodeURI(JSON.stringify(value))]
                    default:
                        break
                }
                return [key, encodeURI(value)]
            })
        )
    }

    const Req = (method, path, options = null, headers = null) => {
        return new Promise((resolve, reject) => {
            if (options === null) {
                options = {}
            }
            options.params = {user_id: state.user?.user_id ?? 99, ...options.params}

            if (path.startsWith("/")) {
                path = path.slice(1)
            }
            const url = `${process.env.REACT_APP_API_ENDPOINT}/${path}`

            getAccessToken()
                .then(token => {
                    axios({
                        url,
                        method,
                        headers: getHeaders(token, headers),
                        ...{ ...options, params: getEncodedParams(options.params)}
                    })
                        .then(res => {
                            if (res.status !== 200) {
                                return reject(res.statusText)
                            }
                            if (!res.data) {
                                return resolve(null)
                            }
                            if (!res.data.result) {
                                return reject(res.data.rows)
                            }
                            if (options?.rawResponse) {
                                resolve(res.data)
                            } else {
                                resolve(res.data.rows)
                            }
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    const ReqFirst = async (method, path, options = null, headers = null) => {
        const res = await Req(method, path, options, headers)
        if(_.isEmpty(res)) { return null }
        return res[0]
    }

    const ReqOne = async (method, path, options = null, headers = null) => {
        const row = await ReqFirst(method, path, options, headers)
        if (!row || _.isEmpty(Object.keys(row))) { return null }
        return row[Object.keys(row)[0]]
    }

    const Get = (path, params = null, options = null, headers = null) => Req("get", path, {params, ...options}, headers)
    const GetFirst = (path, params = null, options = null, headers = null) => ReqFirst("get", path, {params, ...options}, headers)
    const GetOne = async (path, params = null, options = null, headers = null) => ReqOne("get", path, {params, ...options}, headers)

    const Post = (path, data = null, options = null, headers = null) => Req("post", path, {data, ...options}, headers)
    const PostFirst = (path, data = null, options = null, headers = null) => ReqFirst("post", path, {data, ...options}, headers)
    const PostOne = (path, data = null, options = null, headers = null) => ReqOne("post", path, {data, ...options}, headers)

    const Put = (path, data = null, options = null, headers = null) => Req("put", path, {data, ...options}, headers)
    const PutFirst = (path, data = null, options = null, headers = null) => ReqFirst("put", path, {data, ...options}, headers)
    const PutOne = (path, data = null, options = null, headers = null) => ReqOne("put", path, {data, ...options}, headers)

    const Delete = (path, data = null, options = null, headers = null) => Req("delete", path, {data, ...options}, headers)
    const DeleteFirst = (path, data = null, options = null, headers = null) => ReqFirst("delete", path, {data, ...options}, headers)
    const DeleteOne = (path, data = null, options = null, headers = null) => ReqOne("delete", path, {data, ...options}, headers)

    return {
        Req,
        ReqFirst,
        ReqOne,
        Get,
        GetFirst,
        GetOne,
        Post,
        PostFirst,
        PostOne,
        Put,
        PutFirst,
        PutOne,
        Delete,
        DeleteFirst,
        DeleteOne,
    }

}

export default useApiManager
