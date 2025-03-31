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
    description: "A platform designed to empower users to promote their services and businesses while making it easier for others to find what they need. The site provides an intuitive way for users to share their business locations and addresses, ensuring seamless connections between service providers and customers. Built using Next.js, Tailwind CSS, Next-Auth, MongoDB, and mongoose. The site deployed on Vercel and MongoDB Atlas for database hosting.",
    features: "Services and Businesses listing page, detail page, service creation and manage functionality, search, filter, and rate service functionality",
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "Portfolio",
    subTitle: "Website",
    description: "A modern and sleek portfolio site designed to highlight my skills, completed project, and certifications in a user-friendly and visually appealing format. Built using Vue.Js, Vue-Router, and TailwindCSS. Deployed on Netlify",
    features: "Skill showcase, Projects Gallary, Certifications, Responsive Design",
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "QuantumBit",
    subTitle: "Technology Institute",
    description: "I designed and developed a compelling landing page for QuantumBit, a Technology Institute, to showcase their courses, expertise, and offerings. The platform combines aesthetic appeal with functionality, delivering a high-performance and SEO-friendly experience. Built using Astro, React, and TailwindCSS.",
    features: "SEO friendly Landing page with Courses, Pricing, FAQ, and  Testimonials, and with Blog functionality. Deployed on Cloudflare.",
    link: "https://quntum-bit.pages.dev/",
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
    title: "NewForm",
    subTitle: "Furniture company",
    description: "NewForm furniture is a big furiniture company specializing in creating beautiful and comfortable furnitures for homes and offices. To showcase their exceptional products, I developed a visually striking and performanc-focused website highlighting their craftsmanship and commitment to quality. The website is powered by Astro with Svelte and Tailwind CSS and deployed on Verceel.",
    features: "Responsive Design, Product Showcase, SEO Optimzation",
    link: "https://newformfurniture.vercel.app/",
    image: newFormImg 
},{
    title: "EventUpdater",
    subTitle: "Event Sharing Platform",
    description: "i developed Event Updater, a dynamic web application designed to empower users to discover and share upcoming events in their town. The platform aims to be the ultimate go-to destination for all event-related information, fostering local connections and engagement. This platform is built using the MERN stack - React, Material UI, Express.js, MongoDB with MongoDB Atlas as a provider and Mongoose as an ORM and deployed on Render.",
    features: "Responsive Design, Event Listing, Event Creation and Sharing, Search and Filter",
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects