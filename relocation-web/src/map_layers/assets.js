import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {MainDataContext} from "../App";
import * as Cesium from "cesium"

const MapAssetsLayer = ({viewer, visible}) => {

    const { state } = useContext(MainDataContext)
    const [tileUrls, setTileUrls] = useState()
    const [tileSets, setTileSets] = useState([])

    useEffect(() => {
        // 更新がないなら再描画しないようにする
        let urls = state.assetsData?.map(s => s.tiles_url).filter(v => !!v)
        setTileUrls(prev =>
            _.isEqual(_.sortBy(prev ?? []), _.sortBy(urls ?? [])) ? prev: urls
        )
    }, [state.assetsData, state.listRefreshTime])

    const clearTileset = useCallback(() => {
        const tiles = [...tileSets]
        setTileSets([])
        tiles?.forEach(t => {
            t.show = false
            viewer.scene.primitives.remove(t)
        })

    }, [viewer, tileSets])

    useEffect(() => {
        if (!viewer || _.isEmpty(tileUrls)) { return }

        console.log(tileUrls)

        clearTileset()

        Promise.all(tileUrls.map(async (url) => {
            const tileset = await Cesium.Cesium3DTileset.fromUrl(url)
            viewer.scene.primitives.add(tileset)
            return tileset
        })).then(set => {
            setTileSets(set)
            setVisible(set)
        })

        return () => {
            clearTileset()
        }
    }, [viewer, tileUrls])

    const setVisible = useCallback((_tiles = null) => {
        _tiles = _.isEmpty(_tiles) ? tileSets : _tiles
        if (!viewer || _.isEmpty(_tiles)) { return }

        _tiles.forEach(t => t.show = !!visible)
    }, [viewer, visible, tileSets])

    useEffect(() => {
        setVisible()
    }, [viewer, visible])

}

MapAssetsLayer.propTypes = {
    viewer: PropTypes.any,
    visible: PropTypes.bool,
}

export default MapAssetsLayer
