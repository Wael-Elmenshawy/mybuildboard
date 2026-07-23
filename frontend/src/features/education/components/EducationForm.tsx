import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Education } from "../types/education";
import { useCreateEducation } from "../mutations/useCreateEducation";
import { useUpdateEducation } from "../mutations/useUpdateEducation";

type EducationFormValues = {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
  description: string;
  is_current: boolean;
  display_order: number;
};

type EducationFormProps = {
  education?: Education;
  onSuccess?: () => void;
};

function EducationForm({
  education,
  onSuccess,
}: EducationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<EducationFormValues>();

  const createEducation =
    useCreateEducation();

  const updateEducation =
    useUpdateEducation();

  useEffect(() => {
    if (education) {
      reset({
        institution:
          education.institution,
        degree:
          education.degree,
        field_of_study:
          education.field_of_study ?? "",
        start_date:
          education.start_date,
        end_date:
          education.end_date ?? "",
        grade:
          education.grade ?? "",
        description:
          education.description ?? "",
        is_current:
          education.is_current,
        display_order:
          education.display_order,
      });
    } else {
      reset({
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
        grade: "",
        description: "",
        is_current: false,
        display_order: 0,
      });
    }
  }, [education, reset]);

  const onSubmit = async (
    data: EducationFormValues,
  ) => {
    const payload = {
      ...data,
      field_of_study:
        data.field_of_study || undefined,
      end_date:
        data.end_date || undefined,
      grade:
        data.grade || undefined,
      description:
        data.description || undefined,
    };

    if (education) {
      await updateEducation.mutateAsync({
        educationId: education.id,
        payload,
      });
    } else {
      await createEducation.mutateAsync(
        payload,
      );
    }

    reset();

    onSuccess?.();
  };

  const loading =
    createEducation.isPending ||
    updateEducation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Institution
        </label>

        <input
          {...register("institution")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Degree
        </label>

        <input
          {...register("degree")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Field of Study
        </label>

        <input
          {...register("field_of_study")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-medium">
            Start Date
          </label>

          <input
            type="date"
            {...register("start_date")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Date
          </label>

          <input
            type="date"
            {...register("end_date")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Grade
        </label>

        <input
          {...register("grade")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_current")}
        />

        Currently Studying Here
      </label>

      <div>
        <label className="mb-2 block font-medium">
          Display Order
        </label>

        <input
          type="number"
          {...register("display_order", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : education
              ? "Update Education"
              : "Save Education"}
        </button>
      </div>
    </form>
  );
}

export default EducationForm;
