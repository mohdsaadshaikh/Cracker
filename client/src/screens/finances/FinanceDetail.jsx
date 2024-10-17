const FinanceDetail = ({ data }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Record Detail</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Description:</span>
          <span>{data.description}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Amount:</span>
          <span>{data.amount.toFixed(2)} $</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Category:</span>
          <span>{data.category}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Payment Method:</span>
          <span>{data.paymentMethod}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Type:</span>
          <span>{data.type}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Recurring:</span>
          <span>{data.recurring ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Created At:</span>
          <span>{new Date(data.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex justify-between  p-3 rounded">
          <span className="font-semibold">Updated At:</span>
          <span>{new Date(data.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceDetail;
