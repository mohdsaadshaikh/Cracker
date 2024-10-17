const Modal = ({ open, setOpenModal, children, theme }) => {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        theme === "light" ? "bg-black bg-opacity-50" : "bg-black bg-opacity-80"
      } z-50`}
    >
      <div className="modal-box relative p-6 shadow-lg rounded-sm z-50">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setOpenModal(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
