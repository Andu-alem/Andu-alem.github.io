import classicImg from "../assets/projects/classicman.png"
import portfolioImg from "../assets/projects/portfolio.png"
import quantumbitImg from "../assets/projects/quantum-bit.png"
import serviceadImg from "../assets/projects/serviceadv.png"
import chessAppImg from "../assets/projects/chesszone.png"
import laravelNextImg from "../assets/projects/lara-next.png"
import eventUpdaterImg from "../assets/projects/event_shot.jpg"
import newFormHomeImg from "../assets/projects/newformhome.jpg"
import supportTicketImg from "../assets/projects/support.png"
import fintrackImg from "../assets/projects/fintrack.png"
import nextPortfolioImg from "../assets/projects/next-portfolio.png"
import devFriendImg from "../assets/projects/devfriend.png"


const projects = [{
    title: "FinTrack",
    subTitle: "A telegram mini app",
    description: "FinTrack is a modern and responsive Telegram Mini App designed to help users effortlessly track their income, expenses, and budgets within the Telegram ecosystem. Built with a mobile-first approach, the app provides a seamless user experience, adapting to Telegram's native theme (light/dark) using the Telegram WebApp SDK (TWA SDK).",
    features: "Dashboard Overview, Income and Expense Tracking, Budget Management, Analytics, Telegram Integration, Responsive Design",
    techStack: ["TypeScript", "React", "React-Router", "TailwindCSS", "Shadcn/ui", "Zod & RHF", "Firebase", "TWA SDK", "Netlify"],
    link: "https://t.me/fintrack_app_bot/FinTrack",
    image: fintrackImg
},{
    title: "DevFriend",
    subTitle: "A developer tool",
    description: "DevFriend is a full-stack productivity web app for developers to organize their job applications, personal projects, and important events in one place, helping them stay focused while managing their career journey. Built using Next.js(App router & Api routes) and other modern stacks.",
    features: "Project Tracking, Job Application Tracker, Event Scheduling, Email and Social Authentication, Landing Page, Clean UI/UX",
    techStack: ["TypeScript", "Next.js", "Better-Auth", "TailwindCSS", "Shadcn/ui", "Drizzle", "Postgres", "Neon", "Vercel"],
    link: "https://devfriend-one.vercel.app",
    image: devFriendImg 
},{
    title: "Classice Men's",
    subTitle: "For Fashionista!",
    description: "An elegant and modern men's fashion e-commerce platform built with Next.js, Tailwind CSS, and Prisma, designed to showcase and manage high-quality men's fashion products with a clean, responsive user experience. This platform allows browsing products, placing orders (without payment integration), and admin management of products with secure authentication using Better-Auth.",
    features: "Product listing page, product detail page, pagination, cart management, admin functionality, and dark/light mode.",
    techStack: ["TypeScript", "Next.js", "Better-Auth", "Shadcn/ui", "Tailwindcss", "Zustand", "Prisma", "PostgreSQL", "Blob Storage", "Neon", "Vercel"],
    link: "https://mencollection.vercel.app/",
    image: classicImg
},{
    title: "ServiceAd",
    subTitle: "Share your service, Find other's",
    description: "A platform designed to empower users to promote their services and businesses while making it easier for others to find what they need. The site provides an intuitive way for users to share their business locations and addresses, ensuring seamless connections between service providers and customers.",
    features: "Services and Businesses listing page, detail page, service creation and manage functionality, search, filter, and rate service functionality",
    techStack: ["Next.js", "TailwindCSS", "Next-Auth", "MongoDB", "Mongoose", "Mongodb-Atlas", "Vercel"],
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "NewFormHome",
    subTitle: "Furniture company",
    description: "Modern multi-page site with product listings, cart, and blog. The initial structure and layout were rapidly scaffolded using Vercel v0, which I then extensively customized by adjusting the generated code, fixing layout and functionality issues, and integrating it with a Strapi CMS backend for content management. Cloudinary is used for media storage.",
    features: "Responsive Design, Product Showcase, Blog, SEO Optimzation",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Shadcn/ui", "v0", "StrapiCMS", "Cloudinary", "Vercel", "Render"],
    link: "https://newformhome.vercel.app",
    image: newFormHomeImg 
},{
    title: "Support Ticketing System",
    subTitle: "Internal tool",
    description: "A modern support ticket management platform designed to streamline customer service operations by enabling users to create tickets and administrators to manage them efficiently.",
    features: "Signup/Login, Ticket Creation, Ticket Managment, Responsive Design",
    techStack: ["TypeScript", "React", "React-Router", "ContextAPI", "Tailwind", "Mongodb", "Mongoose", "Express.js", "JWT", "Mongodb-Atlas", "Vercel", "Render", "Vitest & RTL"],
    link: "https://support-ticketing-system-silk.vercel.app",
    image: supportTicketImg
},{
    title: "QuantumBit",
    subTitle: "Technology Institute",
    description: "I designed and developed a compelling landing page for QuantumBit, a Technology Institute, to showcase their courses, expertise, and offerings. The platform combines aesthetic appeal with functionality, delivering a high-performance and SEO-friendly experience. Built using Astro, React, and TailwindCSS.",
    features: "SEO friendly Landing page with Courses, Pricing, FAQ, and  Testimonials, and with Blog functionality. Deployed on Cloudflare.",
    techStack: ["Astro", "React", "Tailwind", "Framer-Motion", "Markdown", "Netlify"],
    link: "https://quantumbit.netlify.app",
    image: quantumbitImg
},{
    title: "ChessGame",
    subTitle: "Progressive Web App",
    description: "I developed ChessGame, a progressive web app that offers users a complete chess experience with versatile features and modern design. The app is designed for both chess enthusiasts and casual players, providing a platform to play against an AI opponent powerd by Stockfish or a friend. Built using React, Tailwind CSS and integrated it with an AI chess engine Stockfish.",
    features: "Board Customization, Opponent Options, Difficulty Levels, Full Chess Functionality, Progressive Web App - works offline",
    techStack: ["React", "ContextAPI", "Tailwind", "Stockfish", "Vercel", "Render"],
    link: "https://react-chess-app-uixz.onrender.com/",
    image: chessAppImg
},{
    title: "Cool Market",
    subTitle: "E-Commerce Web App",
    description: "A comprehensive, feature rich, and responsive e-commerce website store using a modern tech stack including Next.js, Tailwind CSS, and SWR in front-end and Laravel with Sanctum as a backend. With two communicate through a RESTful api.",
    features: "Product listing page, product detail page, pagination, cart management, and admin functionality.",
    techStack: ["Next.js", "Tailwind", "Laravel", "Sanctum"],
    link: "https://github.com/Andu-alem/laravel-next-ecommerce",
    image: laravelNextImg 
},{
    title: "Portfolio Next",
    subTitle: "Website",
    description: "A modern and sleek portfolio site designed to highlight my skills, completed project, and certifications in a user-friendly and visually appealing format. Built using Next.js, TailwindCSS, and Shadcn/ui. Deployed on Netlify",
    features: "Skill showcase, Projects Gallary, Dark/Light Mode Responsive Design",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Shadcn/ui", "Netlify"],
    link: "https://andudev.netlify.app/",
    image: nextPortfolioImg
},{
    title: "Portfolio",
    subTitle: "Website",
    description: "A modern and sleek portfolio site designed to highlight my skills, completed project, and certifications in a user-friendly and visually appealing format. Built using Vue.Js, Vue-Router, and TailwindCSS. Deployed on Netlify",
    features: "Skill showcase, Projects Gallary, Certifications, Responsive Design",
    techStack: ["Vue.js", "Vue-Router", "TailwindCSS", "Netlify"],
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "EventUpdater",
    subTitle: "Event Sharing Platform",
    description: "Event Updater, a dynamic web application designed to empower users to discover and share upcoming events in their town. The platform aims to be the ultimate go-to destination for all event-related information, fostering local connections and engagement. This platform is built using the MERN stack",
    features: "Responsive Design, Event Listing, Event Creation and Sharing, Search and Filter",
    techStack: ["React", "React-Router", "MUI", "Express.js", "MongoDB", "Mongoose", "Render"],
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects
