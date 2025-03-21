import PropTypes from "prop-types"
import React, {useContext, useEffect, useMemo, useRef, useState} from "react"
import * as Cesium from "cesium"
import SelectImage from "../../../../resources/map-marker.png"
import {MainDataContext} from "../App";

const MapSelectMarkerLayer = ({viewer, location, visible}) => {

    const { state } = useContext(MainDataContext)
    const billboardRef = useRef()

    useEffect(() => {
        if (!viewer || billboardRef.current) { return }

        let tm = setTimeout(() => {
            let entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(0.0, 0.0),
                billboard: {
                    image: SelectImage,
                    width: 30,
                    height: 30,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 画像の底辺を位置に合わせる
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 地形にクランプ
                }
            })
            billboardRef.current = entity
        }, 100)

        return () => {
            clearTimeout(tm)
            if (billboardRef.current) {
                try {
                    viewer.entities.remove(billboardRef.current)
                } catch(e) {
                }
            }
        }
    }, [viewer]);

    useEffect(() => {
        if (!viewer || !billboardRef.current) { return }

        if (state.mapMarker?.latitude && state.mapMarker?.longitude) {
            billboardRef.current.position = Cesium.Cartesian3.fromDegrees(state.mapMarker.longitude, state.mapMarker.latitude)
        } else {
            billboardRef.current.position = Cesium.Cartesian3.fromDegrees(0,0)
        }
        billboardRef.current.show = visible
    }, [billboardRef.current, viewer, state.mapMarker, visible]);

    return null
}

MapSelectMarkerLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
}

export default MapSelectMarkerLayer
