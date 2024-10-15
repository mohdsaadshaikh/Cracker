import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useGetAllFinancesQuery } from "../../redux/apis/financeApi";
import { useOutletContext } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import TableHeader from "../../components/TableHeader";

const FinancesTable = () => {
  const [rowData, setRowData] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    type: "",
    recurring: "",
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data } = useGetAllFinancesQuery(filters);
  const theme = useOutletContext();

  const columnDefs = [
    { headerName: "Description", field: "description", filter: true },
    { headerName: "Amount", field: "amount", filter: true },
    {
      headerName: "Category",
      field: "category",
      headerComponent: (params) => (
        <TableHeader
          displayName="Category"
          column={params.column}
          setFilters={setFilters}
        />
      ),
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Payment Method",
      field: "paymentMethod",
      headerComponent: (params) => (
        <TableHeader
          displayName="Payment Method"
          column={params.column}
          setFilters={setFilters}
        />
      ),
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Type",
      field: "type",
      headerComponent: (params) => (
        <TableHeader
          displayName="Type"
          column={params.column}
          setFilters={setFilters}
        />
      ),
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Recurring",
      field: "recurring",
      headerComponent: (params) => (
        <TableHeader
          displayName="Recurring"
          column={params.column}
          setFilters={setFilters}
        />
      ),
      filter: "agSetColumnFilter",
      valueGetter: (params) => {
        return params.node.rowPinned ? null : params.data.recurring;
      },
    },
    {
      headerName: "Created At",
      field: "createdAt",
      cellRenderer: (params) => {
        return params.node.rowPinned ? null : formatDate(params.value);
      },
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      cellRenderer: (params) => {
        return params.node.rowPinned ? null : formatDate(params.value);
      },
    },
  ];

  useEffect(() => {
    if (data && data.finances) {
      setRowData(data.finances);
    }
  }, [data]);

  const pinnedBottomRowData = useMemo(() => {
    return [{ description: "Total", amount: parseInt(data?.total || 0) }];
  }, [data?.total]);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const gridTheme =
    theme === "forest" ? "ag-theme-alpine-dark" : "ag-theme-alpine";

  const onRowContextMenu = (event) => {
    event.preventDefault(); // Prevent default context menu
    console.log("Context menu opened for row:", event.data); // Check event data

    if (event.data) {
      // Ensure there is data
      setSelectedRow(event.data);
      setContextMenu({ x: event.clientX, y: event.clientY });
    } else {
      console.warn("No data available for the selected row");
    }
  };

  return (
    <div className="w-full h-full my-4 mx-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl">Total Record : {data?.count}</h2>
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={columnDefs}
          pinnedBottomRowData={pinnedBottomRowData}
          className={gridTheme}
          contextMenu={onRowContextMenu}
          suppressContextMenu={true}
        />
      </div>
      {contextMenu && (
        <div
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <div
            style={{ padding: "10px", cursor: "pointer" }}
            // onClick={handleEdit}
          >
            Edit
          </div>
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              borderTop: "1px solid #ccc",
            }}
            // onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancesTable;
