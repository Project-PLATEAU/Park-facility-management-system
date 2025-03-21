import dayjs from "dayjs";

export const STORAGE_KEY = `_${process.env.REACT_APP_PACKAGE_NAME}_main_data_${process.env.REACT_APP_DATA_VERSION}`

export const ActionType = {
    SetUser: "SET_USER",
    SetMovingFacility: "SET_MOVING_FACILITY",
    SetVisibleFacilities: "SET_VISIBLE_FACILITIES",
    SetFacilityVisible: "SET_FACILITY_VISIBLE",
    SetSelectedFacility: "SET_SELECTED_FACILITY",
    ToggleFacilityVisible: "TOGGLE_FACILITY_VISIBLE",
    SetListRefreshTime: "SET_LIST_REFRESH_TIME",
    SetAssetsData: "SET_ASSETS_DATA",
}

const MainDataReducer = (state, action) => {

//    console.log("[StateReducer]", "change state", action.type, state.selectedFacility, state, action)
    switch(action.type) {
        case ActionType.SetUser:
            state = {...state, user: action.value}
            break
        case ActionType.SetMovingFacility:
            return {...state, movingFacility: action.value}
        case ActionType.SetVisibleFacilities:
            state = {...state, visibleFacilities: action.value}
            break
        case ActionType.SetFacilityVisible:
            console.log(action)
            if (state.visibleFacilities?.includes(action.facilityCode) && !action.value) {
                console.log("removed")
                state = {...state, visibleFacilities: [...state.visibleFacilities.filter(v => v !== action.facilityCode)]}
            } else if (!state.visibleFacilities?.includes(action.facilityCode) && action.value) {
                console.log("added")
                state = {...state, visibleFacilities: [...(state.visibleFacilities ?? []), action.facilityCode]}
            } else { return state }
            break
        case ActionType.ToggleFacilityVisible:
            if (state.visibleFacilities?.includes(action.value)) {
                state = {...state, visibleFacilities: [...state.visibleFacilities.filter(v => v !== action.value)]}
            } else {
                state = {...state, visibleFacilities: [...(state.visibleFacilities ?? []), action.value]}
            }
            break
        case ActionType.SetSelectedFacility:
            return {...state, selectedFacility: action.value}
        case ActionType.SetListRefreshTime:
            return {...state, listRefreshTime: action.value}
        case ActionType.SetAssetsData:
            return {...state, assetsData: action.value, listRefreshTime: dayjs().unix()}
        default:
            return state
    }


    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        // 以下に除外を追加
        movingFacility: null,
        selectedFacility: null,
        listRefreshTime: null,
        assetsData: [],
    }))

    return state

}

export default MainDataReducer
