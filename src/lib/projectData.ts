import classicImg from "../assets/projects/classicman.png"
import portfolioImg from "../assets/projects/portfolio.png"
import quantumbitImg from "../assets/projects/quantum-bit.png"
import serviceadImg from "../assets/projects/serviceadv.png"
import chessAppImg from "../assets/projects/chesszone.png"
import laravelNextImg from "../assets/projects/lara-next.png"
import eventUpdaterImg from "../assets/projects/event_shot.jpg"
import newFormImg from "../assets/projects/newform.jpg"


const projects = [{
    title: "Classice Men's",
    subTitle: "For Fashionista!",
    description: "A comprehensive, feature rich, and responsive e-commerce website for Ideal Men's Fashion store using a modern tech stack including Next.js, TypeScript, Shadcn, Farmer Motion, Tailwind CSS, Zustand, Better-Auth, Prisma, and PostgreSQL. The site is deployed on Vercel, leveraging Vercel Blob Store ad Neon PostgreSQL DB provider.",
    features: "Product listing page, product detail page, pagination, cart management, admin functionality, and dark/light mode.",
    link: "https://mencollection.vercel.app/",
    image: classicImg
},{
    title: "ServiceAd",
    subTitle: "Share your service, Find other's",
    description: "A platform where users promote their services and businesses share location/address of their business. Beside promoting their service the platform aims to help users to find a service or business near them or by searching the name. Built using Next.js, Tailwind CSS, Next-Auth, MongoDB, and mongoose. The site deployed on Vercel and MongoDB Atlas for database hosting.",
    features: "Services and Businesses listing page, detail page, service creation and manage functionality, search, filter, and rate service functionality",
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "Portfolio",
    subTitle: "Website",
    description: "A portfolio site to showcase my skills, works, and certificates. Built using Vue.Js, Vue-Router, and TailwindCSS. Deployed on Netlify",
    features: "Responsive, SPA",
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "QuantumBit",
    subTitle: "Technology Institute",
    description: "I developed visually apealing, seo friendly landing page with a blog functionality for a Technology Institute using Astro, React, and TailwindCSS.",
    features: "SEO friendly Landing page with Courses, Pricing, FAQ, and  Testimonials, and with Blog functionality. Deployed on Cloudflare.",
    link: "https://quntum-bit.pages.dev/",
    image: quantumbitImg
},{
    title: "ChessGame",
    subTitle: "Progressive Web App",
    description: "The app allows user to choose their opponent Ai or a friend and to choose their prefernce color scheme for the board and difficulty level. It has all the functionalities of a chess. This fully functional web based chess application built using React, Tailwind CSS and integrated it with an AI chess engine Stockfish. The app is deployed on Render.",
    features: "Board Theme selection, AI or Friend choice, Difficulty level selection",
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
    title: "NewForm",
    subTitle: "Furniture company",
    description: "NewForm furniture is a big furiniture company that excels in creating beautiful and comfortable furnitures for houses and for offices. Visit their website. The website is powered by Astro with Svelte and Tailwind CSS and deployed on Verceel.",
    features: "Responsive",
    link: "https://newformfurniture.vercel.app/",
    image: newFormImg 
},{
    title: "EventUpdater",
    subTitle: "Event Sharing Platform",
    description: "A web application in which the user can get and post the upcoming events in the town. Aims to be the platform for all events. This platform is built using the MERN stack - React, Material UI, Express.js, MongoDB with MongoDB Atlas as a provider and Mongoose as an ORM and deployed on Render.",
    features: "Responsive, Dark/Light Mode+++",
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects