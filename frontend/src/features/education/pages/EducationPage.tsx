import { useState } from "react";

import EducationDialog from "../components/EducationDialog";
import EducationForm from "../components/EducationForm";
import { useDeleteEducation } from "../mutations/useDeleteEducation";
import { useEducation } from "../hooks/useEducation";
import type { Education } from "../types/education";

function EducationPage() {
  const { data: education = [], isLoading } =
    useEducation();

  const deleteEducation =
    useDeleteEducation();

  const [open, setOpen] =
    useState(false);

  const [selectedEducation, setSelectedEducation] =
    useState<Education | undefined>();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Education
        </h1>

        <button
          onClick={() => {
            setSelectedEducation(undefined);
            setOpen(true);
          }}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border p-5"
          >
            <h2 className="text-xl font-semibold">
              {item.institution}
            </h2>

            <p>{item.degree}</p>

            {item.field_of_study && (
              <p>{item.field_of_study}</p>
            )}

            <p className="text-sm text-gray-500">
              {item.start_date}
              {" - "}
              {item.is_current
                ? "Present"
                : item.end_date}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedEducation(item);
                  setOpen(true);
                }}
                className="rounded border px-4 py-2"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteEducation.mutate(item.id)
                }
                className="rounded border border-red-500 px-4 py-2 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EducationDialog
        open={open}
        title={
          selectedEducation
            ? "Edit Education"
            : "Add Education"
        }
        onClose={() => setOpen(false)}
      >
        <EducationForm
          education={selectedEducation}
          onSuccess={() => {
            setOpen(false);
            setSelectedEducation(undefined);
          }}
        />
      </EducationDialog>
    </div>
  );
}

export default EducationPage;
