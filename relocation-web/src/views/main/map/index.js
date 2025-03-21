import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, setRef,
    styled, TextField,
} from "@mui/material";
import MapFacilityLayer from "../../../map_layers/facility";
import MapGateLayer from "../../../map_layers/gate";
import MapBridgeLayer from "../../../map_layers/bridge";
import MapTreeLayer from "../../../map_layers/tree";
import MapWaterLayer from "../../../map_layers/water";
import MapFacilityBillboardLayer from "../../../map_layers/facility_billboard";
import MapBuildingLayer from "../../../map_layers/building";
import MapAssetsLayer from "../../../map_layers/assets";
import MapMonumentPointLayer from "../../../map_layers/monument_point"
import MovingView from "./moving"
import PropTypes from "prop-types";
import useCesium from "../../../manager/cesium";
import basemapDef from "../../../map_layers/basemap";
import _ from "lodash";
import * as Cesium from "cesium";
import {MainDataContext} from "../../../App";
import useApiManager from "../../../manager/api2";

const styles = {
    root: {
        flexGrow: '1',
        position: 'relative',
        flexBasis: '0',
        display: "flex",
        overflow: 'hidden',
    },
    map: {
        width: "100%", // 通常100%にするとcesiumがどんどん広がってしまう。
        height: "100%",
        overflow: "hidden",
        position: "absolute", // 親コンテナをrelativeに、mapコンテナをabsoluteにすることで、位置が絶対的に固定される
    },
    mapControlBox: {
        display: 'flex',
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
    }
}

const DEFAULT_ROTATION = 0


const MainMapView = () => {

    const { state, refreshList, setSelectedFacility} = useContext(MainDataContext)
    const mapRef = useRef()
    const boxRef = useRef()
    const { viewer, layerInitialized} = useCesium({mapRef, basemapDef, layersDef: []})
    const [rotation, setRotation] = useState(DEFAULT_ROTATION)
    const [height, setHeight] = useState()
    const [moveMode, setMoveMode] = useState(false)
    const [openRelocationInputParameter, setOpenRelocationInputParameter] = useState(false)
    const [openConfirmRelocation, setOpenConfirmRelocation] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const { Post } = useApiManager()

    useEffect(() => {
        console.log("[MapView]", "change selected facility", state.selectedFacility)
    }, [state.selectedFacility])


    useEffect(() => {
        if (!viewer) { return }
        // 中心座標の設定
        const center = Cesium.Cartesian3.fromDegrees(
            state.mapCenter?.longitude ?? 138.746397,
            state.mapCenter?.latitude ?? 37.428517, 300.0);

        // カメラの設定
        const cameraHeading = Cesium.Math.toRadians(0);
        const cameraPitch = Cesium.Math.toRadians(-60);

        // カメラの初期位置の指定
        viewer.camera.setView({
            destination: center,
            orientation: {
                heading: cameraHeading,
                pitch: cameraPitch,
                roll: 0.0
            },
            mapProjection: new Cesium.WebMercatorProjection(),
        })
    }, [viewer])

    useEffect(() => {
        console.log("[Map]", "selected facility", state.selectedFacility)
        if (viewer && state.selectedFacility) {
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(state.selectedFacility.longitude, state.selectedFacility.latitude, 200),
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-90),
                    roll: 0.0
                },
                mapProjection: new Cesium.WebMercatorProjection(),
            })
            setHeight(state.selectedFacility.height)
        }
    }, [viewer, state.selectedFacility])

    useEffect(() => {
        if (!viewer) { return }
        if (moveMode) {
            viewer.scene.mode = Cesium.SceneMode.SCENE2D
        } else {
            viewer.scene.mode = Cesium.SceneMode.SCENE3D
        }
    }, [viewer, moveMode])

    const onRelocationSubmit = useCallback(() => {
        setOpenConfirmRelocation(false)


        const center = viewer.camera.pickEllipsoid(
            new Cesium.Cartesian2(
                viewer.canvas.clientWidth / 2,
                viewer.canvas.clientHeight / 2
            )
        );

        // Cartesian3からLatLon（度）に変換
        const cartographic = Cesium.Cartographic.fromCartesian(center);
        const centerLon = Cesium.Math.toDegrees(cartographic.longitude);
        const centerLat = Cesium.Math.toDegrees(cartographic.latitude);

        console.log("[RelocationSubmit]", `${centerLat},${centerLon}`, state.selectedFacility)

        Post("management_3d_assets/request_relocation", {
            uuid: state.selectedFacility.uuid,
            rotation,
            height,
            longitude: centerLon,
            latitude: centerLat,
        }).then(res => {
            setSelectedFacility(null)
            setMoveMode(false)
            setRotation(DEFAULT_ROTATION)
            setHeight(null)
            refreshList()
        })

    }, [viewer, state.selectedFacility, rotation, height])

    const onRelocationCancel = () => {
        setOpenRelocationInputParameter(false)
        setOpenConfirmRelocation(false)
        setRotation(DEFAULT_ROTATION)
        setHeight(null)
    }

    const onDeleteSubmit = useCallback(() => {
        Post("management_3d_assets/request_delete", {
            uuid: state.selectedFacility.uuid
        }).then(() => {
            setSelectedFacility(null)
            setMoveMode(false)
            setOpenConfirmDelete(false)
            refreshList()
        })
    }, [state.selectedFacility])

    const onDeleteCancel = () => {
        setOpenConfirmDelete(false)
    }

    return (
        <Box style={styles.root} ref={boxRef}>
            <Box ref={mapRef} style={styles.map}>
                <MapFacilityLayer viewer={viewer} visibleFacilities={state.visibleFacilities} />
                <MapGateLayer viewer={viewer} visibleFacilities={state.visibleFacilities} />
                <MapBuildingLayer viewer={viewer} visibleFacilities={state.visibleFacilities} />
                <MapBridgeLayer viewer={viewer} visibleFacilities={state.visibleFacilities} />
                <MapMonumentPointLayer viewer={viewer} visible={true} />
                <MapTreeLayer viewer={viewer} />
                <MapWaterLayer viewer={viewer} />
                <MapAssetsLayer viewer={viewer} visible={true} />
                <MapFacilityBillboardLayer visible={!moveMode} viewer={viewer} facilityCode={state.selectedFacility?.facility_code} showAll={false} />
                <MovingView visible={moveMode} />
            </Box>
            <Box style={styles.mapControlBox}>
                <ButtonGroup variant="contained">
                    {!moveMode && state?.selectedFacility && state.selectedFacility.operation_type !== "既設" && <Button variant="contained" style={{background: "red"}} onClick={() => setOpenConfirmDelete(true)}>施設を除去</Button>}
                    {!moveMode && <Button onClick={() => setMoveMode(true)} disabled={!state.selectedFacility}>移設開始</Button>}
                    {moveMode && <Button onClick={() => setOpenRelocationInputParameter(true)}>ここに移設実行</Button>}
                    {moveMode && <Button onClick={() => setMoveMode(false)}>キャンセル</Button>}
                </ButtonGroup>
            </Box>
            <Dialog open={openConfirmDelete}>
                <DialogTitle>本当にこの施設を削除しますか</DialogTitle>
                <DialogContentText>この操作は元に戻せません</DialogContentText>
                <DialogActions>
                    <Button onClick={onDeleteSubmit} style={{color: "white", background: "red"}}>削除</Button>
                    <Button onClick={onDeleteCancel}>キャンセル</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openRelocationInputParameter}>
                <DialogTitle>パラメータの設定</DialogTitle>
                <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField variant="standard" label="回転" value={rotation} onChange={e => setRotation(e.target.value)} />
                    <TextField variant="standard" label="高さ" value={height} onChange={e => setHeight(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button disabled={!height} onClick={() => {
                        setOpenRelocationInputParameter(false)
                        setOpenConfirmRelocation(true)
                    }}>OK</Button>
                    <Button onClick={onRelocationCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openConfirmRelocation}>
                <DialogTitle>移設の変換リクエストを開始します</DialogTitle>
                <DialogContentText style={{textAlign: "center"}}>本当に変換リクエストをしてよろしいですか</DialogContentText>
                <DialogActions>
                    <Button onClick={onRelocationSubmit}>変換開始</Button>
                    <Button onClick={onRelocationCancel}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}

MainMapView.propTypes = {
    onSelect: PropTypes.func,
    onMoveRequested: PropTypes.func,
}

export default MainMapView
