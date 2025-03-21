import PropTypes from "prop-types"
import {useCallback, useEffect, useRef, useState} from "react"
import * as Cesium from "cesium"

// const tilesetVariableDefine = {
//     facility_code: "${feature['facility_code}}",
// }

const MapFacilityLayer = ({viewer, visible, visibleFacilities}) => {

    const tileset = useRef()
    const [layerInitialized, setLayerInitialized] = useState(false)

    useEffect(() => {
        if (!viewer) { return }

        Cesium.IonResource.fromAssetId(2428710)
            .then(res => {
                Cesium.Cesium3DTileset.fromUrl(res).then(async ts => {
                    if (!viewer?.scene) { return }
                    ts.style = new Cesium.Cesium3DTileStyle({
                        filter: getFilter(),
                    })
                    ts.name = "facility"
                    viewer.scene.primitives.add(ts)
                    const extras = ts.asset.extras;
                    if (
                        Cesium.defined(extras) &&
                        Cesium.defined(extras.ion) &&
                        Cesium.defined(extras.ion.defaultStyle)
                    ) {
                        tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
                    }
                    tileset.current = ts
                    setTimeout(() => {
                        setLayerInitialized(true)
                    }, 3000)
                })
            })

        return () => {
            if (tileset.current) {
                try {
                    viewer?.scene?.primitives?.remove(tileset.current)
                } catch(e) {}
            }
        }
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

MapFacilityLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
    visibleFacilities: PropTypes.array,
}

export default MapFacilityLayer
