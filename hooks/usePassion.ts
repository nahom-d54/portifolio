import { PassionInsertType, PassionType } from "@/lib/types/passion";

interface Passion {
  id?: number;
  title: string;
  icon: string;
  description: string;
}

// Add auth middleware or some mechanism

const getPassion = async () => {
  const response = await fetch("/api/about/passion", {
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const updatePassion = async ({
  body,
  id,
}: {
  body: PassionInsertType;
  id: PassionType["id"];
}) => {
  const response = await fetch(`/api/about/passion/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await response.json();

  return data;
};

const deletePassion = async (id: number) => {
  const response = await fetch(`/api/about/passion/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const createPassion = async (body: Passion) => {
  const response = await fetch("/api/about/passion", {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

export { createPassion, updatePassion, getPassion, deletePassion };
