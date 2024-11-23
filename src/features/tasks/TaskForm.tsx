import { useForm } from "react-hook-form";

import { tTaskEditableFields } from "../../app.types";

import FormRow from "../../ui/FormRow";
import RippleLoader from "../../ui/RippleLoader";

export default function TaskForm({
  submitting,
  onSubmit,
  defaultValues,
}: {
  submitting: boolean;
  onSubmit: (payload: tTaskEditableFields) => void;
  defaultValues?: tTaskEditableFields;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<tTaskEditableFields>({ defaultValues });

  return (
    <form className="modal__body" onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors.title?.message}>
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          className="input"
          placeholder="Enter title"
          id="title"
          disabled={submitting}
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.description?.message}>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          className="input"
          placeholder="Enter description"
          id="description"
          disabled={submitting}
          rows={7}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.startDate?.message}>
        <label htmlFor="startDate" className="label">
          Start Date
        </label>
        <input
          type="date"
          className="input"
          placeholder="Enter start date"
          id="startDate"
          disabled={submitting}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.dueDate?.message}>
        <label htmlFor="dueDate" className="label">
          Start Date
        </label>
        <input
          type="date"
          className="input"
          placeholder="Enter due date"
          id="dueDate"
          disabled={submitting}
          {...register("dueDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.priority?.message}>
        <label className="label">Priority</label>
        <select
          className="input"
          id="priority"
          disabled={submitting}
          {...register("priority", {
            required: "This field is required",
          })}
        >
          <option value="">-- Select Option --</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </FormRow>
      <button className="button mt-sm" disabled={submitting}>
        {submitting ? <RippleLoader /> : "Save"}
      </button>
    </form>
  );
}
