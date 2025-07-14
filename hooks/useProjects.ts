import { ProjectInsertType, ProjectType } from "@/lib/types/project";

interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: string;
}
// Add auth middleware or some mechanism

const getProject = async () => {
  const response = await fetch("/api/projects", {
    credentials: "include",
  });
  const data = (await response.json()) as ProjectType[];

  return data;
};

const updataProject = async ({
  body,
  id,
}: {
  body: ProjectInsertType;
  id: ProjectType["id"];
}) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await response.json();

  return data;
};

const deleteProject = async (id: number) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const createProject = async (body: ProjectInsertType) => {
  const response = await fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const toggleProjectFeatured = async (id: ProjectType["id"]) => {
  const response = await fetch(`/api/projects/${id}/toggle-featured`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return data;
};

const featuredProjects = async () => {
  const response = await fetch("/api/projects/featured", {
    credentials: "include",
  });
  const data = (await response.json()) as ProjectType[];

  return data;
};

export {
  createProject,
  getProject,
  updataProject,
  deleteProject,
  toggleProjectFeatured,
  featuredProjects,
};
