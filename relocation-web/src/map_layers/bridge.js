import PropTypes from "prop-types"
import {useCallback, useEffect, useRef, useState} from "react"
import * as Cesium from "cesium"

const MapBridgeLayer = ({viewer, visible, visibleFacilities}) => {

    const tileset = useRef()
    const [layerInitialized, setLayerInitialized] = useState()

    useEffect(() => {
        if (!viewer) { return }

        Cesium.IonResource.fromAssetId(2428711)
            .then(res => {
                Cesium.Cesium3DTileset.fromUrl(res).then(async ts => {
                    if (!viewer?.scene) { return }
                    tileset.current = ts
                    ts.name = "bridge"
                    ts.style = new Cesium.Cesium3DTileStyle({
                        filter: getFilter(),
                    })
                    viewer.scene.primitives.add(ts)

                    setTimeout(() => {
                        setLayerInitialized(true)
                    }, 1000)
                })
            })
    }, [viewer]);

    const getFilter = useCallback(() => {
        return {
            show: {
                conditions: [
                    ...(visibleFacilities ?? []).map(code => [`\${facility_code} === "${code}"`, true]),
                    [true, false]
                ]
            },
            translate: {
                conditions: [
                ]
            }
        }
    }, [visibleFacilities])

    useEffect(() => {
        if (tileset.current && layerInitialized) {
            let filter = getFilter()
            console.log(filter)
            tileset.current.style = new Cesium.Cesium3DTileStyle(getFilter())
        }
    }, [visibleFacilities, layerInitialized])

    return null
}

MapBridgeLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
    visibleFacilities: PropTypes.array,
}

export default MapBridgeLayer
