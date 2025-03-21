import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-enterprise"
import {Box, Checkbox} from "@mui/material";
import {columnDefs, defaultColDef} from "./column";
import useApiManager from "../../../manager/api2";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.min.css"
import _ from "lodash";
import {MainDataContext} from "../../../App";

const styles = {
    root: {
        flexGrow: 1,
    }
}

const MainListView = ({onSelect}) => {

    const { state, setFacilityVisible, setAssetsData, setSelectedFacility } = useContext(MainDataContext)
    /**
     * @type {React.MutableRefObject<import('ag-grid-community').GridApi | null>}
     */
    const apiRef = useRef()
//    const [rowData, setRowData] = useState()

    const { Get, Post } = useApiManager()

    const onUpdateVisible = (uuid, visible_flag) => {
//        setFacilityVisible(facilityCode, event.target.checked)
        Post("management_3d_assets/visible_flag", {
            uuid,
            visible_flag
        }).then(setAssetsData).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
    }, [state.visibleFacilities])

    const visibleCellRenderer = useCallback((params) => {
        return (
            <Checkbox checked={params.data.visible_flag} size="small" style={{marginTop: "-4px"}} onClick={(e) => onUpdateVisible(params.data.uuid, e.target.checked)} />
        )
    }, [state.visibleFacilities])


    useEffect(() => {
//        setSelectedFacility(null)
        Get("management_3d_assets/assets_list")
            .then(setAssetsData)
            .catch(e => {
                console.log(e)
            })
    }, [state.listRefreshTime])

    const onGridReady = (e) => {
        apiRef.current= e.api

    }

    const onRowSelected = () => {
        console.log(apiRef.current.getSelectedRows())
        setSelectedFacility(_.first(apiRef.current.getSelectedRows()))
    }

    return (
        <Box style={styles.root}>
            <AgGridReact
                onGridReady={onGridReady}
                className={'ag-theme-balham'}
                rowData={state.assetsData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                cellSelection={false}
                rowSelection="single"
                onRowSelected={onRowSelected}
                components={{
                    visibleCellRenderer,
                }}
            />
        </Box>
    )

}

MainListView.propTypes = {
    onSelect: PropTypes.func
}

export default MainListView
