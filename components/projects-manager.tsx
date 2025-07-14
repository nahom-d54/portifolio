"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pencil,
  Trash2,
  Plus,
  ExternalLink,
  Github,
  Star,
  StarOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  getProject,
  toggleProjectFeatured,
  updataProject,
} from "@/hooks/useProjects";
import { Controller, useForm } from "react-hook-form";
import type { ProjectInsertType, ProjectType } from "@/lib/types/project";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/lib/constants/category";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  github: z.string().url("GitHub URL must be valid").default("#"),
  demo: z.string().url("Demo URL must be valid").default("#"),
  featured: z.boolean(),
  category: z.enum(categories),
});

type ProjectItem = z.infer<typeof projectSchema>;

function ProjectForm({
  onSubmit,
  initialData,
  dialogInfo,
}: {
  onSubmit: (data: ProjectInsertType) => void;
  initialData?: ProjectInsertType;
  dialogInfo: {
    title: string;
    description: string;
    submitText: string;
    setIsAddDialogOpen: (open: boolean) => void;
  };
}) {
  const methods = useForm<ProjectItem>({
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "/placeholder.svg?height=400&width=600",
      tags: [],
      github: "",
      demo: "",
      featured: false,
      category: "Other",
    },
    resolver: zodResolver(projectSchema),
  });

  const [newTag, setNewTag] = useState("");

  const handleAddTag = (
    currentTags: string[],
    onChange: (val: string[]) => void
  ) => {
    const trimmed = newTag.trim();
    if (trimmed && !currentTags.includes(trimmed)) {
      onChange([...currentTags, trimmed]);
    }
    setNewTag("");
  };

  const handleRemoveLastTag = (
    currentTags: string[],
    onChange: (val: string[]) => void
  ) => {
    onChange(currentTags.slice(0, -1));
  };

  const handleRemoveTag = (
    tag: string,
    currentTags: string[],
    onChange: (val: string[]) => void
  ) => {
    onChange(currentTags.filter((t) => t !== tag));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogInfo.title}</DialogTitle>
        <DialogDescription>{dialogInfo.description}</DialogDescription>
      </DialogHeader>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              {...methods.register("title")}
              className="col-span-3"
              placeholder="e.g., E-Commerce Platform"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              {...methods.register("description")}
              className="col-span-3"
              placeholder="Describe your project..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              {...methods.register("image")}
              className="col-span-3"
              placeholder="/placeholder.svg?height=400&width=600"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Controller
              name="category"
              control={methods.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="github" className="text-right">
              GitHub URL
            </Label>
            <Input
              id="github"
              {...methods.register("github")}
              className="col-span-3"
              placeholder="https://github.com/nahom-d54/project"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="demo" className="text-right">
              Demo URL
            </Label>
            <Input
              id="demo"
              {...methods.register("demo")}
              className="col-span-3"
              placeholder="https://your-demo-url.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Featured</Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Controller
                name="featured"
                control={methods.control}
                render={({ field }) => (
                  <Checkbox
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />

              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as featured project
              </label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>

            <Controller
              control={methods.control}
              name="tags"
              render={({ field }) => (
                <>
                  <div className="col-span-3 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="e.g., React"
                        onKeyDown={(e) => {
                          const key = e.key;
                          if (
                            (key === "Enter" || key === "," || key === "Tab") &&
                            newTag.trim()
                          ) {
                            e.preventDefault();
                            handleAddTag(field.value, field.onChange);
                          }

                          if (key === "Backspace" && newTag === "") {
                            e.preventDefault();
                            handleRemoveLastTag(field.value, field.onChange);
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <Button
                            onClick={() =>
                              handleRemoveTag(tag, field.value, field.onChange)
                            }
                            className="ml-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 h-4 w-4 inline-flex items-center justify-center"
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => dialogInfo.setIsAddDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">{dialogInfo.submitText}</Button>
        </DialogFooter>
      </form>
    </>
  );
}

export default function ProjectsManager() {
  const queryClient = useQueryClient();

  const { data: projectsData } = useQuery({
    queryKey: ["project"],
    queryFn: getProject,
  });

  const addproject = useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  const removeproject = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  const editProject = useMutation({
    mutationFn: updataProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  const toggleFeatured = useMutation({
    mutationFn: toggleProjectFeatured,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project"] }),
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editNewTag, setEditNewTag] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const handleAddProject = (newProject: ProjectInsertType) => {
    addproject.mutate(newProject);

    setIsAddDialogOpen(false);
  };

  const handleEditProject = (
    editingProject: ProjectInsertType,
    id: ProjectType["id"]
  ) => {
    editProject.mutate({ body: editingProject, id });
    setIsEditDialogOpen(false);
  };

  const handleDeleteProject = (id: ProjectType["id"]) => {
    removeproject.mutate(id);
  };

  const startEditing = (id: ProjectType["id"]) => {
    setEditingId(id);
    setIsEditDialogOpen(true);
  };

  const filteredProjects =
    projectsData?.filter(
      (project) =>
        (categoryFilter === "All" || project.category === categoryFilter) &&
        (!showFeaturedOnly || project.featured)
    ) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <ProjectForm
              onSubmit={handleAddProject}
              dialogInfo={{
                title: "Add New Project",
                description: "Fill in the details of your new project.",
                submitText: "Add Project",
                setIsAddDialogOpen: setIsAddDialogOpen,
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="category-filter" className="mr-2">
            Filter by Category:
          </Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter" className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="featured-filter"
            checked={showFeaturedOnly}
            onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
          />
          <label
            htmlFor="featured-filter"
            className="ml-2 text-sm font-medium leading-none"
          >
            Show featured projects only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              {project.featured && (
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{project.title}</span>
                <Badge>{project.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <div className="flex gap-2">
                {project.github !== "#" && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo !== "#" && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFeatured.mutate(project.id)}
                  className="flex items-center gap-1"
                >
                  {project.featured ? (
                    <>
                      <StarOff size={14} />
                      Unfeature
                    </>
                  ) : (
                    <>
                      <Star size={14} />
                      Feature
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(project.id)}
                  className="flex items-center gap-1"
                >
                  <Pencil size={14} />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the project "
                        {project.title}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <ProjectForm
            onSubmit={(data) => handleEditProject(data, editingId || -1)}
            initialData={
              projectsData?.find((p) => p.id === editingId) || undefined
            }
            dialogInfo={{
              title: "Edit Project",
              description: "Update the details of your project.",
              submitText: "Update Project",
              setIsAddDialogOpen: setIsEditDialogOpen,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
