# Dev Portfolio

This is a personal portfolio project built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/) to showcase projects, skills, and experience. It features dynamic animations, responsive design, and modern UI patterns.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [Technologies](#technologies)

## Project Structure

The main folders include:

- **app/** – Contains the Next.js pages such as [`page.tsx`](app/page.tsx), [`layout.tsx`](app/layout.tsx), and project pages in [app/projects](app/projects/).
- **components/** – Houses UI components like [`header.tsx`](components/header.tsx), [`footer.tsx`](components/footer.tsx), and others.
- **lib/** – Includes utility functions such as [`utils.ts`](lib/utils.ts).
- **public/** – Static assets like images.
- **styles/** – Global and component-specific styles.
- **next.config.mjs** – Next.js configuration ([next.config.mjs](next.config.mjs)).
- **package.json** – Project dependencies and scripts ([package.json](package.json)).

## Installation

Clone the repository and install dependencies:

```sh
npm install
```

## Available Scripts

In the project directory, you can run:

- **Development server:**

  ```sh
  npm run dev
  ```

- **Build for production:**

  ```sh
  npm run build
  ```

- **Start production server:**

  ```sh
  npm run start
  ```

## Usage

After starting the development server, navigate to [http://localhost:3000](http://localhost:3000) to view the project.

You can customize pages, components, and styles as needed. For example, check out the project listings in page.tsx and customize UI components in components/ui.

## Technologies

- **Next.js:** API routes, SSR, and static site generation.
- **Tailwind CSS:** Utility-first styling.
- **Framer Motion:** Animations and gesture handling.

Feel free to explore the code and adjust configurations to suit your needs.
