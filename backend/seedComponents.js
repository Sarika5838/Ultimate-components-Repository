const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Component = require('./models/Component');
const User = require('./models/User');

dotenv.config();

const realisticComponents = [
  {
    title: "Glassmorphism Authentication Modal",
    description: "A stunning authentication modal featuring a modern glassmorphism aesthetic. Includes fluid enter/leave transitions, input validations, and dark mode support out of the box.",
    tags: ["modal", "auth", "glassmorphism", "ui", "login"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "Animated Floating Action Button",
    description: "A highly customizable floating action button (FAB) that expands into a speed dial menu. Features spring physics animations and perfect mobile touch interactions.",
    tags: ["fab", "button", "animation", "mobile-first"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "JWT Authentication Middleware",
    description: "Drop-in Express.js middleware for verifying JSON Web Tokens. Securely handles authorization headers, token expiration, and attaches the decoded payload to the request object.",
    tags: ["auth", "jwt", "middleware", "security"],
    category: "Backend API",
    technology: "Node.js"
  },
  {
    title: "Responsive Data Grid Table",
    description: "A high-performance data table component capable of rendering thousands of rows. Features inline editing, drag-and-drop column reordering, and sticky headers.",
    tags: ["table", "grid", "data", "admin"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "useDebounce Custom Hook",
    description: "A robust React hook for debouncing fast-changing values like search input strings. Essential for limiting expensive API calls and preventing duplicate queries.",
    tags: ["hooks", "debounce", "utilities", "performance"],
    category: "React Hooks",
    technology: "React"
  },
  {
    title: "Next.js Blog Starter Template",
    description: "A complete, SEO-optimized blog starter built with Next.js 14 and Tailwind CSS. Features MDX support, dark mode toggle, and automatic RSS feed generation.",
    tags: ["nextjs", "template", "blog", "mdx"],
    category: "Templates",
    technology: "Next.js"
  },
  {
    title: "Stripe Payment Form & Webhooks",
    description: "A complete backend integration for processing Stripe payments. Includes the Checkout session logic and a secure webhook handler for finalizing subsciptions.",
    tags: ["payments", "stripe", "webhooks", "ecommerce"],
    category: "Backend API",
    technology: "Node.js"
  },
  {
    title: "Drag and Drop Kanban Board",
    description: "A fully functional Trello-style Kanban board. Supports creating lists, dragging cards between columns gracefully, and persisting state to local storage.",
    tags: ["drag-drop", "kanban", "trello", "ui", "dnd"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "Dynamic Multi-Step Form Wizard",
    description: "An elegant solution for capturing complex data through a multi-step wizard. Includes previous/next state management, progress bars, and schema validation per step.",
    tags: ["form", "wizard", "stepper", "validation"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "useFetch with SWR Cache",
    description: "An advanced data fetching hook imitating SWR. Handles caching, background revalidation, loading states, and automatic retries on failure.",
    tags: ["hooks", "fetch", "cache", "api"],
    category: "React Hooks",
    technology: "React"
  },
  {
    title: "Express Rate Limiter Config",
    description: "A production-safe rate limiting configuration for Express apps. Stops DDoS attacks and brute-force brute login attempts while providing clear 'Retry-After' headers.",
    tags: ["security", "rate-limit", "express", "config"],
    category: "Config Files",
    technology: "Node.js"
  },
  {
    title: "Animated Toast Notification System",
    description: "A lightweight, toastified notification manager. Trigger success, error, warning or info toasts from anywhere using context API.",
    tags: ["toast", "notifications", "alerts", "context-api"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "Tailwind Theme Configuration Strategy",
    description: "A professionally structured tailwind.config.js file extending colors, typography, and precise drop-shadows optimized for premium SaaS designs.",
    tags: ["tailwind", "config", "design-system", "css"],
    category: "Config Files",
    technology: "Tailwind"
  },
  {
    title: "E-Commerce Shopping Cart Template",
    description: "A full application template for managing a shopping cart. Features an animated slide-over panel, increment/decrement controls, context state management, and total calculation.",
    tags: ["ecommerce", "cart", "template", "shop"],
    category: "Templates",
    technology: "React"
  },
  {
    title: "Interactive Markdown Editor",
    description: "A GitHub-flavored markdown editor component with split-pane live preview. Includes a toolbar for bold/italic/links and syntax highlighting for code blocks.",
    tags: ["editor", "markdown", "input", "preview"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "Mongoose User Schema & Password Hashing",
    description: "A heavily robust User schema for MongoDB. Pre-hooks automatically hash passwords using bcrypt before saving, and includes an instance method to compare passwords during auth.",
    tags: ["mongoose", "mongodb", "schema", "auth", "backend"],
    category: "Backend API",
    technology: "Node.js"
  },
  {
    title: "useWindowSize & Breakpoints",
    description: "A utility hook that tracks window dimensions in JS for when CSS media queries fall short. Excellent for triggering complex JS canvas rendering updates on resize.",
    tags: ["hooks", "responsive", "window-size", "resize"],
    category: "React Hooks",
    technology: "React"
  },
  {
    title: "Minimalist Sidebar Navigation",
    description: "A collapsible, responsive sidebar navigation block. Extends seamlessly on hover over desktop, and collapses into a neat hamburger menu drawer on mobile phones.",
    tags: ["sidebar", "navigation", "menu", "responsive"],
    category: "React UI",
    technology: "React"
  },
  {
    title: "S3 Direct Image Upload Handler",
    description: "Backend handler for creating AWS S3 presigned URLs. Allows frontends to upload images directly to S3 avoiding server bottlenecks.",
    tags: ["aws", "s3", "upload", "backend", "cloud"],
    category: "Backend API",
    technology: "Node.js"
  },
  {
    title: "SaaS Landing Page Template",
    description: "A high-conversion landing page template suitable for any tech SaaS. Features a hero section with gradient text, logo clouds, feature grids, and a pricing comparison table.",
    tags: ["saas", "landing-page", "template", "marketing"],
    category: "Templates",
    technology: "Next.js"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Get a user to act as author
    const users = await User.find();
    if (users.length === 0) {
      console.log('No users found! Please create an account via UI first.');
      process.exit(1);
    }
    const authorId = users[0]._id;

    // Delete the previously auto-generated mock data
    await Component.deleteMany({ tags: { $in: ['auto-generated'] } });
    console.log('Cleared previous auto-generated mock data...');

    const components = [];

    for (let i = 0; i < realisticComponents.length; i++) {
      const data = realisticComponents[i];
      components.push({
        title: data.title,
        description: data.description,
        technology: data.technology,
        category: data.category,
        tags: [...data.tags, 'auto-generated'],
        documentation: `# ${data.title}\n\n${data.description}\n\n### Usage\n\`\`\`jsx\nimport { Component } from 'your-lib';\n\n<Component />\n\`\`\`\n`,
        setupInstructions: `1. Ensure ${data.technology} is installed.\n2. Add the component file to your project.\n3. Import and enjoy.`,
        dependencies: [data.technology.toLowerCase()],
        screenshots: [
           `https://picsum.photos/seed/${1000 + i}/800/600`,
           `https://picsum.photos/seed/${2000 + i}/800/600`
        ],
        githubLink: 'https://github.com/repro-demo-user/demo-component-repo',
        liveDemoLink: 'https://demo.reprosystem.io',
        author: authorId,
        currentVersion: '1.0.0',
        versions: [{ versionNumber: '1.0.0', changelog: 'Initial release' }]
      });
    }

    await Component.insertMany(components);
    console.log(`Successfully seeded ${realisticComponents.length} realistic components!`);

    process.exit();
  } catch (error) {
    console.error('Error with seed data => ', error);
    process.exit(1);
  }
};

seedData();
