import PropTypes from "prop-types"
import React, {useContext, useEffect, useRef, useState} from "react"
import * as Cesium from "cesium"
import {MainDataContext} from "../App";
import useApiManager from "../manager/api2";

const MapTreeBillboardLayer = ({viewer, visible}) => {

    const { state } = useContext(MainDataContext)
    const [entities, setEntities] = useState([])

    const {Get} = useApiManager()

    useEffect(() => {
        if (!viewer) { return }

        Cesium.IonResource.fromAssetId(2428790)
            .then(async res => {
                let ds = await Cesium.CzmlDataSource.load(res)
                let ent = await viewer.dataSources.add(ds)
                setEntities(ent.entities.values)
            })
    }, [viewer]);

    useEffect(() => {
        //
        // if (state.viewItem !== ViewItem.Tree) {
        //     for(let entity of entities) {
        //         entity.show = false
        //     }
        // } else if (!state.treeSelectedData) {
        //     for(let entity of entities) {
        //         entity.show = state.showMapPoi
        //     }
        // } else if(!state.treeSelectedData.colId || state.treeSelectedData.colId === "facility_code") {
        //     for(let entity of entities) {
        //         entity.show = state.treeSelectedData.facility_code === entity.id
        //     }
        // } else {
        //     Get("list/tree_codes", {
        //         selected: {
        //             colId: state.treeSelectedData?.colId,
        //             colValue: state.treeSelectedData?.colValue,
        //         },
        //         filterModel: state.treeFilterModel,
        //     }).then(rows => {
        //         let ids = rows.map(v => v.facility_code)
        //         for(let entity of entities) {
        //             entity.show = ids.includes(entity.id)
        //         }
        //     })
        // }

    }, [viewer, entities, state.viewItem, state.showMapPoi, state.treeSelectedData, state.treeFilterModel])

    return null
}

MapTreeBillboardLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
    showAll: PropTypes.bool,
}

export default MapTreeBillboardLayer
