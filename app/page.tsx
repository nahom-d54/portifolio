"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTerminal,
  FaGitAlt,
  FaPython,
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3,
  FaNodeJs,
} from "react-icons/fa";
import { SiDjango } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";

import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { featuredProjects } from "@/hooks/useProjects";

export default function Home() {
  const [text, setText] = useState("");
  const fullText =
    "const developer = {\n  name: 'Nahom Dereje',\n  skills: ['Python', 'React', 'HTML/CSS'],\n  passion: 'Building innovative web solutions'\n};";
  const [index, setIndex] = useState(0);

  const { data: featuredProjectsList } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: featuredProjects,
  });

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="flex flex-col gap-20 pb-8">
      {/* Hero Section */}
      <motion.section
        className="container py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        style={{ opacity, scale }}
      >
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Hi, I'm <span className="text-primary">Nahom Dereje</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              Python Developer | React Enthusiast
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground">
              An impassioned developer hailing from Ethiopia, building
              innovative web solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="glow hover-glow">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-glow">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="code-editor w-full h-full rounded-lg shadow-lg glow">
            {text.split("\n").map((line, i) => (
              <div key={i} className="line">
                <span className="line-number">{i + 1}</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line
                      // .replace(/\b(const|let|var)\b/g, '<span class="keyword">$&</span>')
                      .replace(
                        /\b(function|return|if|else)\b/g,
                        '<span class="keyword">$&</span>'
                      )
                      .replace(
                        /(['"].*?['"])/g,
                        '<span class="string">$&</span>'
                      )
                      .replace(
                        /(\b\w+\b):/g,
                        '<span class="variable">$&</span>'
                      ),
                  }}
                />
                {i === text.split("\n").length - 1 &&
                  text.length === fullText.length && (
                    <span className="cursor"></span>
                  )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Projects Section */}
      <section className="container py-12">
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Check out some of my recent work
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {featuredProjectsList?.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg hover-glow">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=400&width=600`}
                    alt={`Project ${project}`}
                    width={600}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-muted px-3 py-1 text-sm rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="hover-glow"
                    >
                      <Link
                        href={project.github}
                        className="inline-flex items-center gap-1"
                      >
                        <FaGithub className="h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="hover-glow"
                    >
                      <Link
                        href={project.demo}
                        className="inline-flex items-center gap-1"
                      >
                        <FaExternalLinkAlt className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="hover-glow">
            <Link href="/projects" className="inline-flex items-center gap-2">
              View All Projects
              <FaArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container py-12 bg-muted/50 rounded-lg">
        <motion.div
          className="flex flex-col gap-4 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I work with a variety of technologies to create responsive and
            performant web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8 p-4">
          {[
            { name: "Python", icon: <FaPython className="w-8 h-8 " /> },
            {
              name: "JavaScript",
              icon: <FaJs className="w-8 h-8 text-yellow-300" />,
            },
            {
              name: "React",
              icon: <FaReact className="w-8 h-8 text-[#61DBFB]" />,
            },
            {
              name: "HTML",
              icon: <FaHtml5 className="w-8 h-8 text-[#E34C26]" />,
            },
            {
              name: "CSS",
              icon: <FaCss3 className="w-8 h-8 text-[#2965f1]" />,
            },
            {
              name: "Django",
              icon: <SiDjango className="w-8 h-8 text-[#092e20]" />,
            },
            {
              name: "Git",
              icon: <FaGitAlt className="w-8 h-8 text-[#f1502f]" />,
            },
            {
              name: "Node.js",
              icon: <FaNodeJs className="w-8 h-8 text-[#68a063]" />,
            },
            {
              name: "PostgreSQL",
              icon: <BiLogoPostgresql className="w-8 h-8 text-[#0064a5]" />,
            },
            {
              name: "Redis",
              icon: <DiRedis className="w-8 h-8 text-[#d82c20]" />,
            },
            // { name: "Docker", icon: <FaDocker className="w-8 h-8" /> },
            { name: "Linux", icon: <FaTerminal className="w-8 h-8" /> },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border hover-glow transition-all text-center"
            >
              <span className="text-primary mb-2">{skill.icon}</span>
              <h3 className="font-medium text-foreground">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-12">
        <motion.div
          className="rounded-lg border bg-background p-8 md:p-12 shadow-sm futuristic-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Ready to work together?
              </h2>
              <p className="text-foreground/80 max-w-md">
                I'm currently available for freelance work and open to new
                opportunities.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              variant="highlight"
              className="glow hover-glow"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
