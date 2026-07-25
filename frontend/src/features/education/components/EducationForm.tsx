import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import {
  educationSchema,
  type EducationFormValues,
} from "../schema/educationSchema";

import type { Education } from "../types/education";

import { useCreateEducation } from "../mutations/useCreateEducation";
import { useUpdateEducation } from "../mutations/useUpdateEducation";

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
        institution: education.institution,
        degree: education.degree,
        field_of_study:
          education.field_of_study ?? "",
        start_date: education.start_date,
        end_date: education.end_date ?? "",
        grade: education.grade ?? "",
        description:
          education.description ?? "",
        is_current: education.is_current,
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
    educationSchema.parse(data);

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
      <Input
        label="Institution"
        {...register("institution")}
      />

      <Input
        label="Degree"
        {...register("degree")}
      />

      <Input
        label="Field of Study"
        {...register("field_of_study")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Start Date"
          {...register("start_date")}
        />

        <Input
          type="date"
          label="End Date"
          {...register("end_date")}
        />
      </div>

      <Input
        label="Grade"
        {...register("grade")}
      />

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_current")}
        />
        Currently Studying Here
      </label>

      <Input
        type="number"
        label="Display Order"
        {...register("display_order", {
          valueAsNumber: true,
        })}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : education
              ? "Update Education"
              : "Save Education"}
        </Button>
      </div>
    </form>
  );
}

export default EducationForm;
