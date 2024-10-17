import { useForm } from "react-hook-form";
import { useCreateFinanceMutation } from "../../redux/apis/financeApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  EXPENSE_TYPE,
  CATEGORY,
  PAYMENT_METHOD,
} from "../../utils/filteringConstants";
import Input from "../../components/Input";

const createFinanceSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup.number().required("Amount is required"),
  category: yup.string().required("Category is required"),
  paymentMethod: yup.string().required("Payment Method is required"),
  type: yup.string().required("Type is required"),
  recurring: yup.boolean(),
});

const AddFinance = ({ setOpenModal, refetch }) => {
  const [createFinance, { isLoading: isAdding }] = useCreateFinanceMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createFinanceSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createFinance(data).unwrap();
      toast.success("Finance added successfully");
      setOpenModal(false);
      refetch();
      navigate("/finances");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          label="Description"
          placeholder="Enter description"
          register={register}
          errors={errors}
          name="description"
        />
        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount"
          register={register}
          errors={errors}
          name="amount"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("category")}
            className={`select select-bordered ${
              errors.category ? "input-error" : ""
            }`}
          >
            <option value="">Select category</option>
            {CATEGORY.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Payment Method</span>
          </label>
          <select
            {...register("paymentMethod")}
            className={`select select-bordered ${
              errors.paymentMethod ? "input-error" : ""
            }`}
          >
            <option value="">Select payment method</option>
            {PAYMENT_METHOD.map((method, i) => (
              <option key={i} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <span className="text-red-500 text-sm">
              {errors.paymentMethod.message}
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            {...register("type")}
            className={`select select-bordered ${
              errors.type ? "input-error" : ""
            }`}
          >
            <option value="">Select Expense Type</option>
            {EXPENSE_TYPE.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("recurring")}
            className="checkbox checkbox-primary"
          />
          <label className="text-sm font-medium">Recurring</label>
        </div>
        <p className="text-sm text-gray-500">
          Tick the box if you want this finance to be automatically added every
          month.
        </p>
        <div>
          <button
            type="submit"
            className={`btn btn-primary w-full ${isAdding ? "loading" : ""}`}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add Finance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFinance;
