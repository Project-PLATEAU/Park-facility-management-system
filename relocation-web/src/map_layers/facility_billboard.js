import PropTypes from "prop-types";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import * as Cesium from "cesium";
import {MainDataContext} from "../App";

const MapFacilityBillboardLayer = ({viewer, visible, showAll, facilityCode}) => {

    const { state } = useContext(MainDataContext)
    const [entities, setEntities] = useState([])

    useEffect(() => {
        if (!viewer) { return }

        Cesium.IonResource.fromAssetId(2428824)
            .then(async res => {
                let ds = await Cesium.CzmlDataSource.load(res)
                console.log('[Map]', 'billboard data source', ds)
                let ent = await viewer.dataSources.add(ds)
                setEntities(ent.entities.values)
            })
    }, [viewer]);

    useEffect(() => {
        updateVisible()
    }, [entities, visible, facilityCode, showAll])

    const updateVisible = useCallback(() => {
        //console.log("[Update Faiclity Billboard]", entities, visible)
        let v = false
        if ((!visible || !facilityCode) && !showAll) {
            entities?.forEach(entity => entity.show = false)
        } else {
            entities?.forEach(entity => {
                //console.log(facilityCode, entity.properties?.facility_code?.getValue())
                entity.show = showAll || facilityCode === entity.properties?.facility_code?.getValue()
            })
        }


        //
        //
        // if (!entities) { return }
        //
        //
        // if (!visible) {
        //     for (let entity of entities) {
        //         entity.show = false
        //     }
        // }
        //
        // for(let entity of entities) {
        //     entity.show = true
        // }
    }, [entities, visible, showAll, facilityCode])

    // useEffect(() => {
    //     updateVisible()
    // }, [viewer, entities, visible])
    //

    return null
}

MapFacilityBillboardLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
    showAll: PropTypes.bool,
    facilityCode: PropTypes.string,
}

export default MapFacilityBillboardLayer
