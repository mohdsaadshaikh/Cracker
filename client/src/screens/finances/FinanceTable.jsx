import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useGetAllFinancesQuery } from "../../redux/apis/financeApi";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import TableHeader from "../../components/TableHeader";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getHoverBgTheme } from "../../lib/theme";
import FinanceDetail from "./FinanceDetail";
import AddFinance from "./AddFinance";
import Modal from "../../components/Modal";

const FinancesTable = () => {
  const [rowData, setRowData] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    type: "",
    recurring: "",
  });
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const { data, refetch } = useGetAllFinancesQuery(filters);
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

  const onCellContextMenu = (event) => {
    event.event.preventDefault();
    setSelectedRow(event.node.data);
    setContextMenuPosition({
      x: event.event.clientX,
      y: event.event.clientY,
    });
  };

  const closeContextMenu = () => {
    setContextMenuPosition(null);
  };

  window.addEventListener(`contextmenu`, (e) => e.preventDefault());

  useEffect(() => {
    document.addEventListener("click", closeContextMenu);

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, [contextMenuPosition]);

  const handleEdit = () => {
    alert("Edit: " + JSON.stringify(selectedRow));
    setContextMenuPosition(null);
  };

  const handleDelete = () => {
    alert("Delete: " + JSON.stringify(selectedRow));
    setContextMenuPosition(null);
  };

  const handleView = () => {
    setModalType("detail");
    setOpenModal(true);
    setContextMenuPosition(null);
  };

  const handleAdd = () => {
    setModalType("add");
    setOpenModal(true);
    setContextMenuPosition(null);
  };

  return (
    <div className="w-full h-full my-4 mx-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl">Total Record : {data?.count}</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded text-white bg-[#a66dd4] hover:bg-[#4e1a78] transition-all duration-300"
        >
          Add Finance
        </button>
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
          onCellContextMenu={onCellContextMenu}
        />
      </div>
      {contextMenuPosition && (
        <div
          className="absolute shadow-md"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            zIndex: 1000,
          }}
        >
          <ul className={theme === "light" ? "bg-white" : "bg-[#181d1f]"}>
            <li
              className={`pl-4 pr-12 py-2 cursor-pointer flex items-center gap-3 ${getHoverBgTheme(
                theme
              )}`}
              onClick={handleView}
            >
              <EyeOutlined />
              <span>View</span>
            </li>
            <li
              className={`pl-4 pr-12 py-2 cursor-pointer flex items-center gap-3 ${getHoverBgTheme(
                theme
              )}`}
              onClick={handleDelete}
            >
              <EditOutlined />
              <span>Edit</span>
            </li>
            <li
              className={`pl-4 pr-12 py-2 cursor-pointer flex items-center gap-3 ${getHoverBgTheme(
                theme
              )}`}
              onClick={handleDelete}
            >
              <DeleteOutlined />
              <span>Delete</span>
            </li>
          </ul>
        </div>
      )}
      <Modal open={openModal} setOpenModal={setOpenModal} theme={theme}>
        {(() => {
          switch (modalType) {
            case "detail":
              return <FinanceDetail data={selectedRow} />;
            case "add":
              return (
                <AddFinance setOpenModal={setOpenModal} refetch={refetch} />
              );
            default:
              return null;
          }
        })()}
      </Modal>
    </div>
  );
};

export default FinancesTable;
