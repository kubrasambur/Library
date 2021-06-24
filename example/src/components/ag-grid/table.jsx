import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

export const Table = ({field1,field2,field3}) => {
    
        const rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
        return (
                <div className="ag-theme-alpine" style={{ height: 400, width: 600,marginLeft:400}}>
                <AgGridReact
                    rowData={rowData}>
                    <AgGridColumn field={field1}></AgGridColumn>
                    <AgGridColumn field={field2}></AgGridColumn>
                    <AgGridColumn field={field3}></AgGridColumn>
                </AgGridReact>
            </div>
            
        )
    
}