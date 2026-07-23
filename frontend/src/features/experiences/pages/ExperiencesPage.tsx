import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import ExperienceDialog from "../components/ExperienceDialog";
import ExperienceForm from "../components/ExperienceForm";
import { useExperiences } from "../hooks/useExperiences";
import { useDeleteExperience } from "../mutations/useDeleteExperience";
import type { Experience } from "../types/experience";

function ExperiencesPage() {
  const [open, setOpen] = useState(false);

  const [selectedExperience, setSelectedExperience] =
    useState<Experience>();

  const deleteExperience = useDeleteExperience();

  const {
    data: experiences,
    isLoading,
    isError,
  } = useExperiences();

  const openCreateDialog = () => {
    setSelectedExperience(undefined);
    setOpen(true);
  };

  const openEditDialog = (
    experience: Experience,
  ) => {
    setSelectedExperience(experience);
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedExperience(undefined);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Experiences
        </h1>

        <p className="mt-4">
          Loading experiences...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Experiences
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load experiences.
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
              Experiences
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your work experience.
            </p>
          </div>

          <button
            onClick={openCreateDialog}
            className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white"
          >
            <Plus size={18} />
            New Experience
          </button>
        </div>

        {!experiences || experiences.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No experiences yet
            </h2>

            <button
              onClick={openCreateDialog}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Create Experience
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {experience.position}
                    </h2>

                    <p className="text-gray-600">
                      {experience.company}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {experience.start_date}
                      {" - "}
                      {experience.is_current
                        ? "Present"
                        : experience.end_date}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        openEditDialog(experience)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${experience.company}"?`,
                          )
                        ) {
                          deleteExperience.mutate(
                            experience.id,
                          );
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {experience.description && (
                  <p className="mt-4 text-gray-600">
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ExperienceDialog
        open={open}
        title={
          selectedExperience
            ? "Edit Experience"
            : "Create Experience"
        }
        onClose={closeDialog}
      >
        <ExperienceForm
          experience={selectedExperience}
          onSuccess={closeDialog}
        />
      </ExperienceDialog>
    </>
  );
}

export default ExperiencesPage;
