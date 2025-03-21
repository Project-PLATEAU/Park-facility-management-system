import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import * as Cesium from "cesium";

const MapMonumentPointLayer = ({viewer, visible}) => {

    const tileset = useRef()

    useEffect(() => {
        if (!viewer) { return }

        Cesium.IonResource.fromAssetId(2929755)
            .then(res => {
                Cesium.Cesium3DTileset.fromUrl(res).then(async ts => {
                    if (!viewer?.scene) {return }
                    tileset.current = ts
                    ts.style = new Cesium.Cesium3DTileStyle({
                        filter: getFilter(),
                    })
                    viewer.scene.primitives.add(ts)
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

    const getFilter = () => {
        return null
    }
}

MapMonumentPointLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
}

export default MapMonumentPointLayer
