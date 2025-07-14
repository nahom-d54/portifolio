import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JourneyManager from "@/components/journey-manager";
import PassionsManager from "@/components/passions-manager";
import ProjectsManager from "@/components/projects-manager";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Personal Dashboard
      </h1>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="journey">Career Journey</TabsTrigger>
          <TabsTrigger value="passions">Passions & Interests</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-4">
          <JourneyManager />
        </TabsContent>

        <TabsContent value="passions" className="mt-4">
          <PassionsManager />
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <ProjectsManager />
        </TabsContent>
      </Tabs>
    </main>
  );
}
