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


const projects = [{
    title: "FinTrack",
    subTitle: "A telegram mini app",
    description: "FinTrack is a modern and responsive Telegram Mini App designed to help users effortlessly track their income, expenses, and budgets within the Telegram ecosystem. Built with a mobile-first approach, the app provides a seamless user experience, adapting to Telegram's native theme (light/dark) using the Telegram WebApp SDK (TWA SDK).",
    features: "Dashboard Overview, Income and Expense Tracking, Budget Management, Analytics, Telegram Integration, Responsive Design",
    link: "https://t.me/fintrack_app_bot/FinTrack",
    image: fintrackImg
},{
    title: "Classice Men's",
    subTitle: "For Fashionista!",
    description: "A comprehensive, feature rich, and responsive e-commerce website for Ideal Men's Fashion store using a modern tech stack including Next.js, TypeScript, Shadcn, Farmer Motion, Tailwind CSS, Zustand, Better-Auth, Prisma, and PostgreSQL. The site is deployed on Vercel, leveraging Vercel Blob Store ad Neon PostgreSQL DB provider.",
    features: "Product listing page, product detail page, pagination, cart management, admin functionality, and dark/light mode.",
    link: "https://mencollection.vercel.app/",
    image: classicImg
},{
    title: "ServiceAd",
    subTitle: "Share your service, Find other's",
    description: "A platform designed to empower users to promote their services and businesses while making it easier for others to find what they need. The site provides an intuitive way for users to share their business locations and addresses, ensuring seamless connections between service providers and customers. Built using Next.js, Tailwind CSS, Next-Auth, MongoDB, and mongoose. The site deployed on Vercel and MongoDB Atlas for database hosting.",
    features: "Services and Businesses listing page, detail page, service creation and manage functionality, search, filter, and rate service functionality",
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "NewFormHome",
    subTitle: "Furniture company",
    description: "Modern multi-page site with product listings, cart, and blog. The initial structure and layout were rapidly scaffolded using Vercel v0, which I then extensively customized by adjusting the generated code, fixing layout and functionality issues, and integrating it with a Strapi CMS backend for content management. Cloudinary is used for media storage, Built using Next.js, Tailwind, Shadcn/ui, v0.dev, strapi, cloudinary and deployed on vercel and render",
    features: "Responsive Design, Product Showcase, Blog, SEO Optimzation",
    link: "https://newformhome.vercel.app",
    image: newFormHomeImg 
},{
    title: "Support Ticketing System",
    subTitle: "",
    description: "Users can issue support tickets; admins manage and update statuses. Built using React, React-Router, ContextAPI, Tailwind, Express.js, MongoDB, Node.js, Mongoose and deployed on Vercel and Render.",
    features: "Signup/Login, Ticket Creation, Ticket Managment, Responsive Design",
    link: "https://support-ticketing-system-silk.vercel.app",
    image: supportTicketImg
},{
    title: "QuantumBit",
    subTitle: "Technology Institute",
    description: "I designed and developed a compelling landing page for QuantumBit, a Technology Institute, to showcase their courses, expertise, and offerings. The platform combines aesthetic appeal with functionality, delivering a high-performance and SEO-friendly experience. Built using Astro, React, and TailwindCSS.",
    features: "SEO friendly Landing page with Courses, Pricing, FAQ, and  Testimonials, and with Blog functionality. Deployed on Cloudflare.",
    link: "https://quantumbit.netlify.app",
    image: quantumbitImg
},{
    title: "ChessGame",
    subTitle: "Progressive Web App",
    description: "I developed ChessGame, a progressive web app that offers users a complete chess experience with versatile features and modern design. The app is designed for both chess enthusiasts and casual players, providing a platform to play against an AI opponent powerd by Stockfish or a friend. Built using React, Tailwind CSS and integrated it with an AI chess engine Stockfish. The app is deployed on Render.",
    features: "Board Customization, Opponent Options, Difficulty Levels, Full Chess Functionality, Progressive Web App - works offline",
    link: "https://react-chess-app-uixz.onrender.com/",
    image: chessAppImg
},{
    title: "Cool Market",
    subTitle: "E-Commerce Web App",
    description: "A comprehensive, feature rich, and responsive e-commerce website store using a modern tech stack including Next.js, Tailwind CSS, and SWR in front-end and Laravel with Sanctum as a backend. With two communicate through a RESTful api.",
    features: "Product listing page, product detail page, pagination, cart management, and admin functionality.",
    link: "https://github.com/Andu-alem/laravel-next-ecommerce",
    image: laravelNextImg 
},{
    title: "Portfolio",
    subTitle: "Website",
    description: "A modern and sleek portfolio site designed to highlight my skills, completed project, and certifications in a user-friendly and visually appealing format. Built using Vue.Js, Vue-Router, and TailwindCSS. Deployed on Netlify",
    features: "Skill showcase, Projects Gallary, Certifications, Responsive Design",
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "EventUpdater",
    subTitle: "Event Sharing Platform",
    description: "i developed Event Updater, a dynamic web application designed to empower users to discover and share upcoming events in their town. The platform aims to be the ultimate go-to destination for all event-related information, fostering local connections and engagement. This platform is built using the MERN stack - React, Material UI, Express.js, MongoDB with MongoDB Atlas as a provider and Mongoose as an ORM and deployed on Render.",
    features: "Responsive Design, Event Listing, Event Creation and Sharing, Search and Filter",
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects
