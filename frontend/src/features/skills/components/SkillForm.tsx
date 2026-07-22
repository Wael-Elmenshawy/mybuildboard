import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Skill } from "../types/skill";
import { useCreateSkill } from "../mutations/useCreateSkill";
import { useUpdateSkill } from "../mutations/useUpdateSkill";

type SkillFormValues = {
  name: string;

  level:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert";

  display_order: number;
};

type SkillFormProps = {
  skill?: Skill;

  onSuccess?: () => void;
};

function SkillForm({
  skill,
  onSuccess,
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SkillFormValues>();

  const createSkill = useCreateSkill();

  const updateSkill = useUpdateSkill();

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name,
        level: skill.level,
        display_order:
          skill.display_order,
      });
    } else {
      reset({
        name: "",
        level: "intermediate",
        display_order: 0,
      });
    }
  }, [skill, reset]);

  const onSubmit = async (
    data: SkillFormValues,
  ) => {
    if (skill) {
      await updateSkill.mutateAsync({
        skillId: skill.id,
        payload: data,
      });
    } else {
      await createSkill.mutateAsync(data);
    }

    reset();

    onSuccess?.();
  };

  const loading =
    createSkill.isPending ||
    updateSkill.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Skill Name
        </label>

        <input
          {...register("name")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Level
        </label>

        <select
          {...register("level")}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="beginner">
            Beginner
          </option>

          <option value="intermediate">
            Intermediate
          </option>

          <option value="advanced">
            Advanced
          </option>

          <option value="expert">
            Expert
          </option>
        </select>
      </div>

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
            : skill
              ? "Update Skill"
              : "Save Skill"}
        </button>
      </div>
    </form>
  );
}

export default SkillForm;
