"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Pencil, Trash2, Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJourney,
  deleteJourney,
  getJourney,
  updateJourney,
} from "@/hooks/useJourney";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JourneyItem, JourneyNew } from "@/lib/types/aboutTypes";

const journeySchema = z.object({
  year: z.string().min(1, "Year is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
});

type JourneyFormValues = z.infer<typeof journeySchema>;

function JourneyForm({
  onSubmit,
  initialData,
  dialogInfo,
}: {
  onSubmit: (data: JourneyNew) => void;
  initialData?: JourneyFormValues;
  dialogInfo: {
    title: string;
    description: string;
    submitText: string;
    setIsAddDialogOpen: (open: boolean) => void;
  };
}) {
  const methods = useForm<JourneyFormValues>({
    defaultValues: {
      year: initialData?.year || "",
      role: initialData?.role || "",
      company: initialData?.company || "",
      description: initialData?.description || "",
    },
    resolver: zodResolver(journeySchema),
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{dialogInfo.title}</DialogTitle>
        <DialogDescription>{dialogInfo.description}</DialogDescription>
      </DialogHeader>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              {...methods.register("year")}
              className="col-span-3"
              placeholder="e.g., 2023 - Present"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              {...methods.register("role")}
              className="col-span-3"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input
              id="company"
              {...methods.register("company")}
              className="col-span-3"
              placeholder="e.g., Tech Company Inc."
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
              placeholder="Describe your role and achievements..."
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
          <Button onClick={methods.handleSubmit(onSubmit)}>
            {dialogInfo.submitText}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

export default function JourneyManager() {
  const queryClient = useQueryClient();

  const { data: journeyData } = useQuery<JourneyItem[]>({
    queryKey: ["Journey"],
    queryFn: getJourney,
  });

  const addJourney = useMutation({
    mutationFn: createJourney,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Journey"] }),
  });

  const removeJourney = useMutation({
    mutationFn: deleteJourney,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Journey"] }),
  });

  const editJourney = useMutation({
    mutationFn: updateJourney,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Journey"] }),
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const handleAddItem = (newItem: JourneyNew) => {
    addJourney.mutate(newItem);
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (editItem: JourneyNew, id: number) => {
    editJourney.mutate({ body: editItem, id });
    setIsEditDialogOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    removeJourney.mutate(id);
  };

  const startEditing = (item: JourneyItem) => {
    setIsEditDialogOpen(true);
    setEditingItemId(item.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Career Journey</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <JourneyForm
              onSubmit={handleAddItem}
              dialogInfo={{
                title: "Add New Journey Entry",
                description: "Fill in the details of your career journey.",
                submitText: "Add Entry",
                setIsAddDialogOpen: setIsAddDialogOpen,
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {journeyData ? (
          journeyData.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-800">
                <CardTitle className="flex justify-between items-center">
                  <span>{item.role}</span>
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    {item.year}
                  </span>
                </CardTitle>
                <CardDescription>{item.company}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 bg-slate-50 dark:bg-slate-800">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(item)}
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
                        This will permanently delete this journey entry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div
            className="col-span-1 md:col-span-2 text-center text
            
            text-slate-500 dark:text-slate-400"
          >
            No journey entries found. Start by adding a new entry.
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <JourneyForm
            onSubmit={(item) => {
              handleEditItem(item, editingItemId || -1);
            }}
            initialData={
              journeyData?.find((item) => item.id === editingItemId) ||
              undefined
            }
            dialogInfo={{
              title: "Edit Journey Entry",
              description: "Update the details of your career journey.",
              submitText: "Save Changes",
              setIsAddDialogOpen: setIsEditDialogOpen,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
