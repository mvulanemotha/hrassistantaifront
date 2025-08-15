import chargeServise from "../../services/chargeService";

const ConfirmChargeModal = ({ actionKey, onConfirm, onCancel }) => {
  const userUnits = Number(localStorage.getItem("credits") || 0);

  // use chargeservice to get the price
  const price = chargeServise(actionKey);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Confirm Action</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p>
          <strong>Cost:</strong> {price} units
        </p>
        <p>
          <strong>Your balance:</strong> {userUnits} units
        </p>
        {userUnits < price && (
          <p className="text-red-500 mt-2">
            You don’t have enough units to perform this action.
          </p>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(actionKey, price)}
            disabled={userUnits < price}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChargeModal;
