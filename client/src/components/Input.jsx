const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  errors,
  name,
  step,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-base">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered ${errors[name] ? "input-error" : ""}`}
        {...register(name)}
        step={step}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Input;
