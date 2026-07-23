import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Experience } from "../types/experience";

import { useCreateExperience } from "../mutations/useCreateExperience";
import { useUpdateExperience } from "../mutations/useUpdateExperience";

type ExperienceFormValues = {
  company: string;
  position: string;
  employment_type:
    | "full_time"
    | "part_time"
    | "contract"
    | "freelance"
    | "internship"
    | "volunteer";
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
};

type ExperienceFormProps = {
  experience?: Experience;
  onSuccess?: () => void;
};

function ExperienceForm({
  experience,
  onSuccess,
}: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ExperienceFormValues>();

  const createExperience =
    useCreateExperience();

  const updateExperience =
    useUpdateExperience();

  useEffect(() => {
    if (experience) {
      reset({
        company: experience.company,
        position: experience.position,
        employment_type:
          experience.employment_type,
        location:
          experience.location ?? "",
        description:
          experience.description ?? "",
        start_date:
          experience.start_date,
        end_date:
          experience.end_date ?? "",
        is_current:
          experience.is_current,
      });
    } else {
      reset({
        company: "",
        position: "",
        employment_type:
          "full_time",
        location: "",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
      });
    }
  }, [experience, reset]);

  const onSubmit = async (
    data: ExperienceFormValues,
  ) => {
    const payload = {
      ...data,
      location:
        data.location || undefined,
      description:
        data.description || undefined,
      end_date:
        data.end_date || undefined,
      display_order:
        experience?.display_order ?? 0,
    };

    if (experience) {
      await updateExperience.mutateAsync({
        experienceId: experience.id,
        payload,
      });
    } else {
      await createExperience.mutateAsync(
        payload,
      );
    }

    reset();

    onSuccess?.();
  };

  const loading =
    createExperience.isPending ||
    updateExperience.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Company
        </label>

        <input
          {...register("company")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Position
        </label>

        <input
          {...register("position")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Employment Type
        </label>

        <select
          {...register("employment_type")}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="full_time">
            Full Time
          </option>

          <option value="part_time">
            Part Time
          </option>

          <option value="contract">
            Contract
          </option>

          <option value="freelance">
            Freelance
          </option>

          <option value="internship">
            Internship
          </option>

          <option value="volunteer">
            Volunteer
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Location
        </label>

        <input
          {...register("location")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={4}
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

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_current")}
        />

        Currently Working Here
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : experience
              ? "Update Experience"
              : "Save Experience"}
        </button>
      </div>
    </form>
  );
}

export default ExperienceForm;
