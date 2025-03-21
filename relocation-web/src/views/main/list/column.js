import React from "react"
import {Checkbox} from "@mui/material";


export const columnDefs = [
    {
        field: "status",
        headerName: "状況",
        filterParams: "distinctFilter",
        valueGetter: (params, value) => {
            if (params.data.error) {
                return "変換エラー"
            }
            switch(params.data.status) {
                case "requested":
                    return "移設変換中"
                case "done":
                    return "移設完了"
                default:
                    break
            }
            return params.data.status
        }
    },
    {
        field: "facility_code",
        headerName: "施設ID",
        filter: "agNumberColumnFilter",
        sort: "asc",
    },
    {
        field: "facility_name",
        headerName: "施設名",
        filter: "agTextColumnFilter",
    },
    {
        field: "facility_type",
        headerName: "種別",
        filterParams: "distinctFilter",
    },
    {
        field: "visible_flag",
        headerName: "可視化対象",
        filterParams: "boolFilter",
        cellRenderer: "visibleCellRenderer",
    }
]

export const defaultColDef = {
    filter: true,
    floatingFilter: true,
}
