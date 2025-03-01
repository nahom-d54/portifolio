"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
// import { ChartContainer, ChartLegend, ChartRadar } from "@/components/ui/chart"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { VscVscodeInsiders } from "react-icons/vsc";
import { FaChrome, FaFigma, FaGithub, FaNpm, FaTerminal } from "react-icons/fa"
import { SiBabel, SiEslint, SiPostman, SiPrettier, SiVercel, SiWebpack } from "react-icons/si";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  {
    subject: "Frontend",
    A: 90,
    fullMark: 100,
  },
  {
    subject: "Backend",
    A: 75,
    fullMark: 100,
  },
  {
    subject: "Design",
    A: 70,
    fullMark: 100,
  },
  {
    subject: "DevOps",
    A: 65,
    fullMark: 100,
  },
  {
    subject: "Testing",
    A: 75,
    fullMark: 100,
  },
  {
    subject: "Mobile",
    A: 60,
    fullMark: 100,
  },
]

const chartConfig = {
  A: {
    label: "Skill Level",
    color: "hsl(var(--chart-1))",
  },
  fullMark: {
    label: "Maximum",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export default function SkillsPage() {
  // Frontend skills data
  const frontendSkills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Framer Motion", level: 75 },
    { name: "Redux", level: 80 },
  ]

  // Backend skills data
  const backendSkills = [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "GraphQL", level: 65 },
    { name: "REST API", level: 85 },
    { name: "Firebase", level: 75 },
    { name: "AWS", level: 60 },
  ]

  // Tools and other skills
  const toolsSkills = [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 70 },
    { name: "CI/CD", level: 65 },
    { name: "Jest/Testing", level: 75 },
    { name: "Figma/Design", level: 70 },
    { name: "Agile/Scrum", level: 80 },
    { name: "Performance Optimization", level: 75 },
    { name: "Accessibility", level: 80 },
  ]

  // Radar chart data

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Skills & Expertise</h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive overview of my technical skills and proficiency levels.
        </p>
      </div>

      {/* Radar Chart Overview */}
      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
            <CardDescription>A visual representation of my skill distribution across different domains</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-md h-[400px]">
              {/* <ChartContainer>
                <ChartRadar
                
                  data={radarData}
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
                <ChartLegend />
              </ChartContainer> */}
              <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <PolarAngleAxis dataKey="subject" />
                <PolarGrid radialLines={false} />
                <Radar
                  dataKey="A"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0}
                  stroke="#E14F5A"
                  strokeWidth={2}
                />
                <Radar
                  dataKey="fullMark"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </RadarChart>
        </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Skills Tabs */}
      <Tabs defaultValue="frontend">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="tools">Tools & Others</TabsTrigger>
        </TabsList>

        <TabsContent value="frontend" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Development</CardTitle>
              <CardDescription>Skills related to building user interfaces and client-side applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {frontendSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backend" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Backend Development</CardTitle>
              <CardDescription>Skills related to server-side programming and database management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {backendSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tools & Other Skills</CardTitle>
              <CardDescription>Development tools, methodologies, and additional technical skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {toolsSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tools and Technologies Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Tools & Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
            { name: "VS Code", icon: <VscVscodeInsiders className="text-[#007ACC]" /> },
            { name: "GitHub", icon: <FaGithub className="text-[#181717]" /> },
            { name: "npm", icon: <FaNpm className="text-[#CB3837]" /> },
            { name: "Webpack", icon: <SiWebpack className="text-[#8DD6F9]" /> },
            { name: "Babel", icon: <SiBabel className="text-[#F9DC3E]" /> },
            { name: "ESLint", icon: <SiEslint className="text-[#4B32C3]" /> },
            { name: "Prettier", icon: <SiPrettier className="text-[#F7B93E]" /> },
            { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
            { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
            { name: "Chrome DevTools", icon: <FaChrome className="text-[#4285F4]" /> },
            { name: "Terminal", icon: <FaTerminal className="text-[#302e2e]" /> },
            { name: "Vercel", icon: <SiVercel className="text-[#302e2e]" /> },
            ].map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border hover:shadow-md transition-all text-center"
            >
              <span className="text-3xl mb-2">{tool.icon}</span>
              <h3 className="font-medium text-sm">{tool.name}</h3>
            </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}

