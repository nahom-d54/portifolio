import { getJourney, getPassions } from "@/actions/aboutActions";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const passions = await getPassions();
  const journey = await getJourney();

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <p className="text-xl text-muted-foreground">
          Get to know more about my background, experience, and what drives me.
        </p>
      </div>
      <AboutClient passions={passions} journey={journey} />
    </div>
  );
}
