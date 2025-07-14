import { randomUUID } from "crypto";
import { account, user } from "../db/auth-schema";
import { db } from "../db/drizzle";
import { journey, passions, projects } from "../db/schema";
import { Project } from "../types/aboutTypes";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";

const journeyData = [
  {
    year: "2023 - Present",
    role: "React Developer (Learning)",
    company: "Self-study",
    description:
      "Expanding my skillset by learning React and modern frontend development practices.",
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
];

const passionsData = [
  {
    title: "Open Source",
    icon: "🌐",
    description:
      "I contribute to open source projects and believe in the power of collaborative development.",
  },
  {
    title: "Problem Solving",
    icon: "🧩",
    description:
      "I enjoy tackling complex problems and finding efficient solutions.",
  },
  {
    title: "Continuous Learning",
    icon: "📚",
    description:
      "I'm always eager to learn new technologies and improve my skills.",
  },
  {
    title: "Tech Community",
    icon: "👥",
    description:
      "I actively participate in local tech meetups and online developer communities.",
  },
  {
    title: "Mentoring",
    icon: "🤝",
    description:
      "I enjoy sharing my knowledge and helping others learn to code.",
  },
  {
    title: "Tech Writing",
    icon: "✍️",
    description:
      "I write technical articles and tutorials to share my experiences and knowledge.",
  },
];

const projectsData: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Next.js", "Chapa", "MongoDB"],
    github: "#",
    demo: "https://pipihabesha.nahom.eu.org/",
    featured: true,
    category: "Full-Stack",
  },
  {
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
    title: "Weather Dashboard",
    description:
      "A weather dashboard that displays current conditions and forecasts for multiple locations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["JavaScript", "OpenWeather API", "Chart.js"],
    github: "#",
    demo: "#",
    featured: true,
    category: "Front-End",
  },
  {
    title: "Content Management System",
    description:
      "A headless CMS with a custom admin panel and API endpoints for content delivery.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Node.js", "Express", "MongoDB", "React"],
    github: "#",
    demo: "#",
    featured: false,
    category: "Full-Stack",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects and skills with dark/light mode.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "https://www.nahom.eu.org/",
    featured: false,
    category: "Front-End",
  },
  {
    title: "API Gateway Service",
    description:
      "A microservice gateway that handles authentication, rate limiting, and request routing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Node.js", "Express", "Redis", "Docker"],
    github: "#",
    demo: "#",
    featured: false,
    category: "Back-End",
  },
];

async function seed() {
  await db.insert(journey).values(journeyData).onConflictDoNothing();
  await db.insert(passions).values(passionsData).onConflictDoNothing();
  await db.insert(projects).values(projectsData).onConflictDoNothing();
  console.log("Data seeded successfully!");
}

async function seedUser() {
  const userData = {
    id: randomUUID(),
    name: "Nahom",
    email: "nahom.d54@gmail.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.email, userData.email));

  if (!existingUser.length) {
    const createdUser = await db.insert(user).values(userData).returning();
    console.log("User created:", createdUser);

    const accountData = {
      id: randomUUID(),
      userId: createdUser?.[0].id,
      providerId: "credential",
      accountId: createdUser?.[0].id,
      password: await hashPassword("adamaAstu@123"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdAccount = await db
      .insert(account)
      .values(accountData)
      .returning();
    console.log("Account created:", createdAccount);
  }
  console.log("User seeded successfully!");
}

seedUser()
  .then(() => {
    console.log("Seeding completed.");
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  });
