import classicImg from "../assets/projects/classicman.png"
import portfolioImg from "../assets/projects/portfolio.png"
import quantumbitImg from "../assets/projects/quantum-bit.png"
import serviceadImg from "../assets/projects/serviceadv.png"
import chessAppImg from "../assets/projects/chesszone.png"
import laravelNextImg from "../assets/projects/lara-next.png"
import eventUpdaterImg from "../assets/projects/event_shot.jpg"
import fintrackImg from "../assets/projects/fintrack.png"
import nextPortfolioImg from "../assets/projects/next-portfolio.png"
import devFriendImg from "../assets/projects/devfriend.png"
import newFormHomeImg from "../assets/projects/newformhome.jpg"
import supportTicketImg from "../assets/projects/support.png"

const projects = [{
    title: "በAI የታገዘ Portfolio",
    subTitle: "የግል ዌብሳይት",
    description: "የAI ረዳት መልስ እንዲመልስ የተካተተበትና ዘመናዊ፣ ላይን ሳቢ እንዲሁም ከተጠቃሚዎች ስክሪን ጋር እራሱን እንዲያስተካክል ተደርጎ ዲዛይን የተደረገ የግል ክህሎትን እና ስራዎችን ማሳያና ማስተዋወቂያ ዌብሳይት።",
    features: "AI Integration, የከህሎት ማሳያ, የስራዎች ማሳያና ዝርዝር, ሳቢና Responsive ዲዛይን",
    techStack: ["Vercel AI Sdk", "TypeScript", "Next.js", "Tailwind", "Shadcn/ui", "Netlify"],
    link: "https://andudev.netlify.app/",
    image: nextPortfolioImg
},{
    title: "FinTrack",
    subTitle: "የቴሌግራም ሚኒ አፕ",
    description: "FinTrack ፡ የቴሌግራም ሚኒ አፕ ሲሆን ተጠቃሚዎች ከቴሌግራም ሳይወጡ ወጪያቸዉን፣ ገቢያቸውና በጀታቸውን በቀላሉ እንዲከታተሉና እንዲያስተዳድሩ ያስችላል። ይህ አፕሊኬሽን ላጠቃቀም ቀላል፣ ላይን ሳቢ፣ እራሱን ከተጠቃሚዎች የከለር ምርጫ ጋር እንዲያዛምድ አንዲሁም የመረጃዎችን ማጠቃለያ በቻርት እንዲያሳይ ተደርጎ ዲዛይን ተደርጓል።",
    features: "የዳሽቦርድ ማሳያ, ወጪ ገቢ መከታተል, በጀት ማስተዳደር, የመረጃ ትንተና, ከቴሌግራም ሳይወጡ መጠቀም, ሞባይል ስልክን ታሳቢ ያደረገ ዲዛይን",
    techStack: ["TypeScript", "React", "React-Router", "TailwindCSS", "Shadcn/ui", "Zod & RHF", "Firebase", "TWA SDK", "Netlify"],
    link: "https://t.me/fintrack_app_bot/FinTrack",
    image: fintrackImg
},{
    title: "DevFriend",
    subTitle: "ለሶፍትዌር ዴቨሎፐሮች",
    description: "DevFriend ፡ ሶፍትዌእር ዲቨሎችን ምርታማነታችው እንዲጨምር የሚያግዝ ሲሆን ፕሮጀክቶችን፣ የስራ ማመልከቻችውን ሁኔታ እንዲሁም ጠቃሚ ኢቨንቶችን እንዲከታተሉና እንዲያስተዳድሩ ይርዳል። በዚህም ሁሉንም ነገር በአንድ ቦታ በማካተት ትኩረታቸው እንዲጨምር ያደርጋል።",
    features: "ፕሮጀክትና የስራ ማመልከቻዎችን መከታተል, ዝግጅቶችን ማቀድ, ደህንነቱ በተጠበቀ መልኩ የራስን መረጃ ማስተዳደር, ለዐይን ሳቢና ላጠቃቀም ቀላል ዲዛይን",
    techStack: ["TypeScript", "Next.js", "Better-Auth", "TailwindCSS", "Shadcn/ui", "Drizzle", "Postgres", "Neon", "Vercel"],
    link: "https://devfriend-one.vercel.app",
    image: devFriendImg 
},{
    title: "Classice Men's",
    subTitle: "ለፋሽን ወዳጆች",
    description: "ለወንዶች የፋሽን አልባሳት መሸጫ ሱቅ የተለያዩ ዘመናዊ ቴክኖሎጂዎችን በመጠቀም የተሠራ የተሙዋላና ብዙ ገጽታዎች ያሉት የኤሌክትሮኒክ መገበያያ ዌብሳይት። ጥቅም ላይ የዋሉት ቴክኖሎጂዎች Next.js, Typescript, TailwindCSS, Shadcn-ui, Farmer-Motion, Zustand, Better-Auth, Prisma, and PostgreSQL ሲሆኑ ለምስሎች vercel blob store እና ለዳታቤዝ Neon በመጠቀም Vercel ላይ ሆስት ተደርግዋል።",
    features: "የምርቶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ ምርቶችን ወደ ቅርጫት መጫንና ማስተዳደር፣ የብሃንና የምሽት አማራጭ፣ ለዌብሳይት አስተዳዳሪዎች የምርቶችን መረጃ የማስተዳደሪያ ገጽ።",
    techStack: ["TypeScript", "Next.js", "Better-Auth", "Shadcn/ui", "Tailwindcss", "Zustand", "Prisma", "PostgreSQL", "Blob Storage", "Neon", "Vercel"],
    link: "https://mencollection.vercel.app/",
    image: classicImg
},{
    title: "ServiceAd",
    subTitle: "አገልግሎትዎን ያስተዋዉቁ የሌሎችንም ያግኙ",
    description: "ይህ ዌብሳይት ተጠቃሚዎች ያላቸውን ቢዝነስ ወይም የሚሰጡትን አገልግሎት የሚያስተዋዉቁበት ሲሆን እንዲሁም በአከባቢያቸዉ የሚገኙ አገልግሎቶችን በቀላሉ እንዲያገኙ ያስችላል። ጥቅም ላይ የዋሉት ቴክኖሎጂዎች Next.js, Tailwind CSS, Next-Auth, MongoDB, and mongoose ሲሆኑ Vercel ላይ ሆስት ተደርገዋል።",
    features: "የአገልግሎቶች እና ቢዝነሶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ የአገልግሎትና ቢዝንስ ማስገቢያና ማስተዳደሪያ ግጽ፣ እና ሌሎችም ገጽታዎች።",
    techStack: ["Next.js", "TailwindCSS", "Next-Auth", "MongoDB", "Mongoose", "Mongodb-Atlas", "Vercel"],
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "NewFormHome",
    subTitle: "የፈርኒቸር ካምፓኒ",
    description: "ይህ የተሟላ ዌብሳይት የተሠራው ኒውፎርምሆም ለተባለ የፈርኒቸር አምራች ድርጅት ሲሆን በጥሩ ሁኔታ ስለድርጅቱና ስለምርቶቹ በቂ መረጃ ይሰጣል እንዲሁም ደንበኞች የምርቶችን ዝርዝር በማየትና የሚፈልጉትን በመምረጥ ማዘዝ እንዲችሉ ያደርጋል። ስለድርጅቱ በቂ መረጃ ከመስጠቱና ደንበኞችን ኦንላይን እንዲያዙ ከማስቻሉ በተጨማሪ ድርጅቱ ለደንበኞች ጠቃሚ ጽሁፎችን እንዲያጋራ ያግዛል።",
    features: "ከተጠቃሚዎች ስክሪን ጋር የተላመደ ዲዛይን, የምርቶች ማሳያ, መረጃ ማጋራት ማስቻል, SEO Optimzation",
    techStack: ["TypeScript", "Next.js", "Tailwind", "Shadcn/ui", "v0", "StrapiCMS", "Cloudinary", "Vercel", "Render"],
    link: "https://newformhome.vercel.app",
    image: newFormHomeImg 
},{
    title: "Support Ticketing System",
    subTitle: "Interanl tool",
    description: "ለድርጅቶች ለውስጥ አገልግሎት የሚሆን ሰራተኞች ቴክኒካዊ ችግር ሲያጋጥማቸው ለድጋፍ ቡድን መረጃ የሚሰጡበት እንዲሁም የድጋፍ ሰጪ ቡድኑ የድጋፍ መረጃዎችን የሚያስተዳድሩበት ፕላትፎርም።",
    features: "Signup/Login, የድጋፍ ትኬት መሙላት, የድጋፍ ትኬቶችን ማስተዳደር, የተሟላ ዲዛይን",
    techStack: ["TypeScript", "React", "React-Router", "ContextAPI", "Tailwind", "Mongodb", "Mongoose", "Express.js", "JWT", "Mongodb-Atlas", "Vercel", "Render", "Vitest & RTL"],
    link: "https://support-ticketing-system-silk.vercel.app",
    image: supportTicketImg
},{
    title: "QuantumBit",
    subTitle: "የቴክኖሎጂ ተቋም",
    description: "ለQuantumBit የቴክኖሎጂ ተቋም የተሠራ የተሙዋላና ለዐይን ሳቢ የሆነ ዌብሳይት። Astro, React, እና TailwindCSS በመጠቀም የተሠራ ሲሆን cloudflare ላይ ሆስት ተደርግዋል።",
    features: "የተምውላና ለዐይን ሳቢ የሆነ የፊት ገጽ፣ የመመዝገቢያ ፎርም፣ የብሎግ ገጽ እና ሌሎችም።",
    techStack: ["Astro", "React", "Tailwind", "Framer-Motion", "Markdown", "Netlify"],
    link: "https://quntum-bit.pages.dev/",
    image: quantumbitImg
},{
    title: "ChessGame",
    subTitle: "Progressive Web App",
    description: "ተጠቃሚዎችን ከAI ወይም ክጉዋደኛቸዉ ጋር እንዲጫወቱ የሚያስችል የቼዘ ጨዋታ ዌብ አፕልኬሽን። React, Tailwind CSS and integrated it with an AI chess engine Stockfish በመጠቀም የተሠራ እና Render ላይ ሆስት የተደረገ።",
    features: "የመጫወቻ ቦርዱን ገጽታ መቀያየር ማስቻል፣ የአስቸጋሪነት ደረጃ እንዲሁም ተጫዋችን መምረጥ ማስቻል እና ሌሎችም።",
    techStack: ["React", "ContextAPI", "Tailwind", "Stockfish", "Vercel", "Render"],
    link: "https://react-chess-app-uixz.onrender.com/",
    image: chessAppImg
},{
    title: "Cool Market",
    subTitle: "የኦንላይን መገበያያ",
    description: "Next.js, Tailwind CSS, እና Laravel በመጠቀም የተሠራ የኤሌክትሮኒክ መገበያያ ዌብሳይት።",
    features: "የምርቶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ ምርቶችን ወደ ቅርጫት መጫንና ማስተዳደር፣ የብሃንና የምሽት አማራጭ፣ ለዌብሳይት አስተዳዳሪዎች የምርቶችን መረጃ የማስተዳደሪያ ገጽ።",
    techStack: ["Next.js", "Tailwind", "Laravel", "Sanctum"],
    link: "https://github.com/Andu-alem/laravel-next-ecommerce",
    image: laravelNextImg 
},{
    title: "Portfolio Website",
    subTitle: "",
    description: "የሥራዎች የክሀሎትና የሰርተፊኬቶች ማሳያ ድሀረገጽ Vue.Js, Vue-Router, እና TailwindCSS በመጠቀም የተሠራ እንዲሁም Netlify ላይ ሆስት የተደረገ።",
    features: "Responsive, SPA",
    techStack: ["Vue.js", "Vue-Router", "TailwindCSS", "Netlify"],
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "EventUpdater",
    subTitle: "የኢቨንት መለዋወጫ አፕልኬሽን",
    description: "የሚደረጉ ዝግጅቶችን ማጋራት የሚያስችል ዌብ አፕልኬሽን። React, Material UI, Express.js, MongoDB በመጠቀም የተሠራ እና Render ላይ ሆስት የተደረገ።",
    features: "",
    techStack: ["React", "React-Router", "MUI", "Express.js", "MongoDB", "Mongoose", "Render"],
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects