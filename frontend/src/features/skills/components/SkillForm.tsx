import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import { useCreateSkill } from "../mutations/useCreateSkill";
import { useUpdateSkill } from "../mutations/useUpdateSkill";
import {
  skillSchema,
  type SkillFormValues,
} from "../schema/skillSchema";
import type { Skill } from "../types/skill";

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
  } = useForm<SkillFormValues>({
    defaultValues: {
      name: "",
      level: "intermediate",
      display_order: 0,
    },
  });

  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name,
        level: skill.level,
        display_order: skill.display_order,
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
    skillSchema.parse(data);

    if (skill) {
      await updateSkill.mutateAsync({
        skillId: skill.id,
        payload: data,
      });
    } else {
      await createSkill.mutateAsync(data);
    }

    reset({
      name: "",
      level: "intermediate",
      display_order: 0,
    });

    onSuccess?.();
  };

  const loading =
    createSkill.isPending ||
    updateSkill.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Skill Name"
        placeholder="e.g. React"
        {...register("name")}
      />

      <Select
        label="Level"
        {...register("level")}
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
      </Select>

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
            : skill
              ? "Update Skill"
              : "Save Skill"}
        </Button>
      </div>
    </form>
  );
}

export default SkillForm;
