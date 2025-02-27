"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <p className="text-xl text-muted-foreground">
          Get to know more about my background, experience, and what drives me.
        </p>
      </div>

      {/* Profile Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            <Image
              src="/profile.jpg"
              alt="Profile Photo"
              width={600}
              height={600}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Nahom Dereje</h2>
            <p className="text-xl text-muted-foreground">Python Developer | React Enthusiast</p>
          </div>

          <p className="text-muted-foreground">
            I'm a passionate developer from Ethiopia with a strong foundation in Python development. Currently, I'm
            expanding my skills by learning React and diving deeper into web development.
          </p>

          <p className="text-muted-foreground">
            My journey in software development started with Python, and I've since worked on various projects that
            showcase my skills in backend development, data processing, and now frontend technologies.
          </p>

          <div className="pt-4">
            <Button asChild>
              <Link href="/resume.pdf" className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Career Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">My Journey</h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {[
            {
              year: "2023 - Present",
              role: "React Developer (Learning)",
              company: "Self-study",
              description: "Expanding my skillset by learning React and modern frontend development practices.",
            },
            {
              year: "2021 - 2023",
              role: "Python Developer",
              company: "Freelance Projects",
              description:
                "Worked on various Python projects, including web scraping, data analysis, and backend development using Django and Flask.",
            },
            {
              year: "2019 - 2021",
              role: "Computer Science Student",
              company: "University",
              description:
                "Studied computer science with a focus on programming fundamentals, algorithms, and data structures.",
            },
            {
              year: "2018",
              role: "Coding Enthusiast",
              company: "Self-taught",
              description:
                "Started my coding journey by learning Python and building small projects to solve everyday problems.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="timeline-item"
            >
              <div className="bg-background rounded-lg border p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{item.role}</h3>
                  <span className="text-sm text-muted-foreground">{item.year}</span>
                </div>
                <h4 className="text-primary font-medium mb-2">{item.company}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personal Interests */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Beyond Coding</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Open Source",
              icon: "🌐",
              description:
                "I contribute to open source projects and believe in the power of collaborative development.",
            },
            {
              title: "Problem Solving",
              icon: "🧩",
              description: "I enjoy tackling complex problems and finding efficient solutions.",
            },
            {
              title: "Continuous Learning",
              icon: "📚",
              description: "I'm always eager to learn new technologies and improve my skills.",
            },
            {
              title: "Tech Community",
              icon: "👥",
              description: "I actively participate in local tech meetups and online developer communities.",
            },
            {
              title: "Mentoring",
              icon: "🤝",
              description: "I enjoy sharing my knowledge and helping others learn to code.",
            },
            {
              title: "Tech Writing",
              icon: "✍️",
              description: "I write technical articles and tutorials to share my experiences and knowledge.",
            },
          ].map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-4">{interest.icon}</div>
              <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
              <p className="text-muted-foreground">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

