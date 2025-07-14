import type { JourneyNew } from "@/lib/types/aboutTypes";

interface Journey {
  id?: number;
  year: string;
  role: string;
  company: string;
  description: string;
}
interface UpdateJourneyItem {
  id: number;
  body: JourneyNew;
}

// Add auth middleware or some mechanism

const getJourney = async () => {
  const response = await fetch("/api/about/journey", {
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const updateJourney = async ({ id, body }: UpdateJourneyItem) => {
  const response = await fetch(`/api/about/journey/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await response.json();

  return data;
};

const deleteJourney = async (id: number) => {
  const response = await fetch(`/api/about/journey/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

const createJourney = async (body: JourneyNew) => {
  const response = await fetch("/api/about/journey", {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await response.json();

  return data;
};

export { createJourney, getJourney, updateJourney, deleteJourney };
