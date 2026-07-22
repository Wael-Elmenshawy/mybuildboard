import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import SkillDialog from "../components/SkillDialog";
import SkillForm from "../components/SkillForm";
import { useSkills } from "../hooks/useSkills";
import { useDeleteSkill } from "../mutations/useDeleteSkill";
import type { Skill } from "../types/skill";

function SkillsPage() {
  const [open, setOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] =
    useState<Skill>();

  const deleteSkill = useDeleteSkill();

  const {
    data: skills,
    isLoading,
    isError,
  } = useSkills();

  const openCreateDialog = () => {
    setSelectedSkill(undefined);
    setOpen(true);
  };

  const openEditDialog = (skill: Skill) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedSkill(undefined);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Skills
        </h1>

        <p className="mt-4">
          Loading skills...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Skills
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load skills.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Skills
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your professional skills.
            </p>
          </div>

          <button
            onClick={openCreateDialog}
            className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white"
          >
            <Plus size={18} />
            New Skill
          </button>
        </div>

        {!skills || skills.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No skills yet
            </h2>

            <button
              onClick={openCreateDialog}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Create Skill
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {skill.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 capitalize">
                      {skill.level}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        openEditDialog(skill)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${skill.name}"?`
                          )
                        ) {
                          deleteSkill.mutate(
                            skill.id
                          );
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SkillDialog
        open={open}
        title={
          selectedSkill
            ? "Edit Skill"
            : "Create Skill"
        }
        onClose={closeDialog}
      >
        <SkillForm
          skill={selectedSkill}
          onSuccess={closeDialog}
        />
      </SkillDialog>
    </>
  );
}

export default SkillsPage;
