
export const STORAGE_KEY= `_${process.env.REACT_APP_PACKAGE_NAME}_map_data_${process.env.REACT_APP_DATA_VERSION}`

export const ActionType = {

}

const MapDataReducer = (state, action) => {

    switch(action.type) {
        case null:
            break
        default:
            return state
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        // 以下に保存の除外を追加
        // foo: null,
    }))

    return state

}

export default MapDataReducer
