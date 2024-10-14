/* eslint-disable */
import {
  PAYMENT_METHOD,
  EXPENSE_TYPE,
  CATEGORY,
} from "../utils/filteringConstants";

const filterOptions = {
  Category: CATEGORY,
  "Payment Method": PAYMENT_METHOD,
  Type: EXPENSE_TYPE,
  Recurring: ["Yes", "No"],
};

const TableHeader = ({ displayName, column, setFilters }) => {
  const handleFilterChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      [column.getColId()]: value,
    }));

    column.getColDef().filter = value;
    column.gridOptions.api.onFilterChanged();
  };

  const options = filterOptions[displayName] || [];

  return (
    <div className="flex flex-col items-center">
      <select onChange={handleFilterChange} className="border rounded p-1">
        <option value="">Select {displayName}</option>
        {options.map((option, i) => (
          <option
            key={i}
            value={
              option === "Yes" ? "true" : option === "No" ? "false" : option
            }
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableHeader;
