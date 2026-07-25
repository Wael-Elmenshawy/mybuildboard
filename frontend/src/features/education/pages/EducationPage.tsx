import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import EducationDialog from "../components/EducationDialog";
import EducationForm from "../components/EducationForm";
import { useEducation } from "../hooks/useEducation";
import { useDeleteEducation } from "../mutations/useDeleteEducation";
import type { Education } from "../types/education";

function EducationPage() {
  const [open, setOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<Education>();

  const deleteEducation = useDeleteEducation();

  const {
    data: education,
    isLoading,
    isError,
  } = useEducation();

  const openCreateDialog = () => {
    setSelectedEducation(undefined);
    setOpen(true);
  };

  const openEditDialog = (
    item: Education,
  ) => {
    setSelectedEducation(item);
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedEducation(undefined);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Education
        </h1>

        <p className="mt-4">
          Loading education...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Education
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load education.
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
              Education
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your education history.
            </p>
          </div>

          <Button
            onClick={openCreateDialog}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Education
          </Button>
        </div>

        {!education || education.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No education yet
            </h2>

            <div className="mt-6">
              <Button onClick={openCreateDialog}>
                Create Education
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {education.map((item) => (
              <Card key={item.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.institution}
                    </h2>

                    <p className="text-gray-600">
                      {item.degree}
                    </p>

                    {item.field_of_study && (
                      <p className="text-gray-500">
                        {item.field_of_study}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      {item.start_date}
                      {" - "}
                      {item.is_current
                        ? "Present"
                        : item.end_date}
                    </p>

                    {item.description && (
                      <p className="mt-4 text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditDialog(item)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${item.institution}"?`,
                          )
                        ) {
                          deleteEducation.mutate(
                            item.id,
                          );
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <EducationDialog
        open={open}
        title={
          selectedEducation
            ? "Edit Education"
            : "Add Education"
        }
        onClose={closeDialog}
      >
        <EducationForm
          education={selectedEducation}
          onSuccess={closeDialog}
        />
      </EducationDialog>
    </>
  );
}

export default EducationPage;
