import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Project } from "../types/project";
import { useCreateProject } from "../mutations/useCreateProject";
import { useUpdateProject } from "../mutations/useUpdateProject";

type ProjectFormValues = {
  title: string;
  shortDescription: string;
  githubUrl: string;
  liveUrl: string;
};

type ProjectFormProps = {
  boardId: string;
  project?: Project;
  onSuccess?: () => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ProjectForm({
  boardId,
  project,
  onSuccess,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProjectFormValues>();

  const createProject = useCreateProject(boardId);
  const updateProject = useUpdateProject(boardId);

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        shortDescription:
          project.short_description ?? "",
        githubUrl: project.github_url ?? "",
        liveUrl: project.live_url ?? "",
      });
    } else {
      reset({
        title: "",
        shortDescription: "",
        githubUrl: "",
        liveUrl: "",
      });
    }
  }, [project, reset]);

  const onSubmit = async (
    data: ProjectFormValues,
  ) => {
    const payload = {
      board_id: boardId,
      title: data.title,
      slug: slugify(data.title),
      short_description:
        data.shortDescription || undefined,
      description:
        project?.description ?? undefined,
      github_url:
        data.githubUrl || undefined,
      live_url:
        data.liveUrl || undefined,
      video_url:
        project?.video_url ?? undefined,
      thumbnail_url:
        project?.thumbnail_url ?? undefined,
      technologies:
        project?.technologies ?? [],
      display_order:
        project?.display_order ?? 0,
      is_featured:
        project?.is_featured ?? false,
      visibility:
        project?.visibility ?? "public",
      status:
        project?.status ?? "published",
    };

    if (project) {
      await updateProject.mutateAsync({
        slug: project.slug,
        payload,
      });
    } else {
      await createProject.mutateAsync(payload);
    }

    reset();

    onSuccess?.();
  };

  const loading =
    createProject.isPending ||
    updateProject.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Project Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Short Description
        </label>

        <textarea
          {...register("shortDescription")}
          rows={4}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          GitHub URL
        </label>

        <input
          {...register("githubUrl")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Live URL
        </label>

        <input
          {...register("liveUrl")}
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
            : project
              ? "Update Project"
              : "Save Project"}
        </button>
      </div>
    </form>
  );
}
export default ProjectForm;
