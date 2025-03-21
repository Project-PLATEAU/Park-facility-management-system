import {STORAGE_KEY} from "./reducer";
import reducer from "./reducer"
import initialState from "./state"
import {useReducer} from "react";

export const UseMapData = () => {

    const { state, dispatch } = useReducer(reducer, initialState, d =>
        localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : d
    )


    return {
        state,
    }
}
