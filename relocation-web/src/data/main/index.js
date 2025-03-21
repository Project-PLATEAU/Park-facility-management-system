import {useReducer} from "react";
import reducer, {ActionType, STORAGE_KEY} from "./reducer";
import initialState from "./state"
import dayjs from "dayjs";

const UseMainData = () => {

    const [ state, dispatch ] = useReducer(reducer, initialState, d => {
        console.log("[UserMainData]", "initializer", d)
        return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : d
    })

    const setUser = value => dispatch({type: ActionType.SetUser, value})
    const setSelectedFacility = value => dispatch({type: ActionType.SetSelectedFacility, value})
    const setMovingFacility = value => dispatch({type: ActionType.SetMovingFacility, value})
    const setVisibleFacilities = value => dispatch({type: ActionType.SetVisibleFacilities, value})
    const setFacilityVisible = (facilityCode, value) => dispatch({type: ActionType.SetFacilityVisible, facilityCode, value})
    const toggleFacilityVisible = value => dispatch({type: ActionType.ToggleFacilityVisible, value})
    const refreshList = () => dispatch({type: ActionType.SetListRefreshTime, value: dayjs().unix()})
    const setAssetsData = value => dispatch({type: ActionType.SetAssetsData, value})

    return {
        state,
        setUser,
        setSelectedFacility,
        setMovingFacility,
        setVisibleFacilities,
        setFacilityVisible,
        toggleFacilityVisible,
        refreshList,
        setAssetsData,
    }
}

export default UseMainData
