import { useForm } from "react-hook-form";
import { useUpdateFinanceMutation } from "../../redux/apis/financeApi";
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
import { useEffect } from "react";

const updateFinanceSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup.number().required("Amount is required"),
  category: yup.string().required("Category is required"),
  paymentMethod: yup.string().required("Payment Method is required"),
  type: yup.string().required("Type is required"),
  recurring: yup.boolean(),
});

const EditFinance = ({ setOpenModal, refetch, data }) => {
  const [updateFinance, { isLoading: isEditing }] = useUpdateFinanceMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateFinanceSchema),
  });

  console.log(data);

  useEffect(() => {
    setValue("description", data.description);
    setValue("amount", data.amount);
    setValue("category", data.category);
    setValue("paymentMethod", data.paymentMethod);
    setValue("type", data.type);
    setValue("recurring", data.recurring);
  }, [setValue, data]);

  const onSubmit = async (finance) => {
    try {
      await updateFinance({
        id: data.id,
        finance,
      }).unwrap();
      toast.success("Finance edifted successfully");
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
          step="0.01"
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
            className="checkbox"
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
            className={`btn bg-[#a66dd4] hover:bg-[#000000] text-white transition-all duration-300 w-full `}
            disabled={isEditing}
          >
            {isEditing ? "Editing..." : "Edit Finance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFinance;
