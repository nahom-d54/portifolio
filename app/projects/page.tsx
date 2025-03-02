"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search } from "lucide-react"
import { motion } from "framer-motion"

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Next.js", "Stripe", "MongoDB"],
    github: "#",
    demo: "https://pipihabesha.nahom.eu.org/",
    featured: true,
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Appwrite", "Tailwind"],
    github: "#",
    demo: "#",
    featured: true,
    category: "Front-End",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current conditions and forecasts for multiple locations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["JavaScript", "OpenWeather API", "Chart.js"],
    github: "#",
    demo: "#",
    featured: true,
    category: "Front-End",
  },
  {
    id: 4,
    title: "Content Management System",
    description: "A headless CMS with a custom admin panel and API endpoints for content delivery.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Node.js", "Express", "MongoDB", "React"],
    github: "#",
    demo: "#",
    featured: false,
    category: "Full-Stack",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills with dark/light mode.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "https://www.nahom.eu.org/",
    featured: false,
    category: "Front-End",
  },
  {
    id: 6,
    title: "API Gateway Service",
    description: "A microservice gateway that handles authentication, rate limiting, and request routing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    github: "#",
    demo: "#",
    featured: false,
    category: "Back-End",
  },
]

// Categories for filtering
const categories = ["All", "Front-End", "Back-End", "Full-Stack"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Filter projects based on search query and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "All" || project.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of my work, side projects, and open source contributions.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.github} className="inline-flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.demo} className="inline-flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

