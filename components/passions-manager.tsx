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
import { Pencil, Trash2, Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPassion,
  deletePassion,
  getPassion,
  updatePassion,
} from "@/hooks/usePassion";
import type { PassionInsertType, PassionType } from "@/lib/types/passion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
  description: z.string().min(1, "Description is required"),
});

type PassionItem = z.infer<typeof passionSchema>;

function PassionForm({
  onSubmit,
  initialData,
  dialogInfo,
}: {
  onSubmit: (data: PassionInsertType) => void;
  initialData?: PassionInsertType;
  dialogInfo: {
    title: string;
    description: string;
    submitText: string;
    setIsAddDialogOpen: (open: boolean) => void;
  };
}) {
  const methods = useForm<PassionItem>({
    defaultValues: initialData || {
      title: "",
      icon: "",
      description: "",
    },
    resolver: zodResolver(passionSchema),
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
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              {...methods.register("title")}
              className="col-span-3"
              placeholder="e.g., Open Source"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon (Emoji)
            </Label>
            <Input
              id="icon"
              {...methods.register("icon")}
              className="col-span-3"
              placeholder="e.g., 🌐"
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
              placeholder="Describe your passion..."
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

export default function PassionsManager() {
  const queryClient = useQueryClient();

  const { data: passionsData } = useQuery<PassionType[]>({
    queryKey: ["Passion"],
    queryFn: getPassion,
  });

  const addPassion = useMutation({
    mutationFn: createPassion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Passion"] }),
  });

  const removePassion = useMutation({
    mutationFn: deletePassion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Passion"] }),
  });

  const editPassion = useMutation({
    mutationFn: updatePassion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Passion"] }),
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddItem = (newItem: PassionInsertType) => {
    addPassion.mutate(newItem);

    setIsAddDialogOpen(false);
  };

  const handleEditItem = (
    editingItem: PassionInsertType,
    id: PassionType["id"]
  ) => {
    editPassion.mutate({ body: editingItem, id });
    setIsEditDialogOpen(false);
  };

  const handleDeleteItem = (id: number) => {
    removePassion.mutate(id);
  };

  const startEditing = (id: PassionType["id"]) => {
    setEditingId(id);
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Passions & Interests</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Add Passion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PassionForm
              onSubmit={handleAddItem}
              dialogInfo={{
                title: "Add New Passion",
                description: "Add details about a new passion or interest.",
                submitText: "Add Passion",
                setIsAddDialogOpen,
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {passionsData ? (
          passionsData.map((passion) => (
            <Card key={passion.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{passion.icon}</span>
                  <span>{passion.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {passion.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(passion.id)}
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
                        This will permanently delete this passion entry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteItem(passion.id)}
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
          <p
            className="col-span-1 md:col-span-3 text-center text
            
             sm:text-lg text-slate-500"
          >
            No passions or interests added yet.
          </p>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <PassionForm
            onSubmit={(item) => handleEditItem(item, editingId ?? -1)}
            initialData={passionsData?.find((p) => p.id === editingId)}
            dialogInfo={{
              title: "Edit Passion",
              description: "Update the details of this passion or interest.",
              submitText: "Save Changes",
              setIsAddDialogOpen: setIsEditDialogOpen,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
