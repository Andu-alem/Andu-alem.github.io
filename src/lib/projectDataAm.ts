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
    subTitle: "ለፋሽን ወዳጆች",
    description: "ለወንዶች የፋሽን አልባሳት መሸጫ ሱቅ የተለያዩ ዘመናዊ ቴክኖሎጂዎችን በመጠቀም የተሠራ የተሙዋላና ብዙ ገጽታዎች ያሉት የኤሌክትሮኒክ መገበያያ ዌብሳይት። ጥቅም ላይ የዋሉት ቴክኖሎጂዎች Next.js, Typescript, TailwindCSS, Shadcn-ui, Farmer-Motion, Zustand, Better-Auth, Prisma, and PostgreSQL ሲሆኑ ለምስሎች vercel blob store እና ለዳታቤዝ Neon በመጠቀም Vercel ላይ ሆስት ተደርግዋል።",
    features: "የምርቶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ ምርቶችን ወደ ቅርጫት መጫንና ማስተዳደር፣ የብሃንና የምሽት አማራጭ፣ ለዌብሳይት አስተዳዳሪዎች የምርቶችን መረጃ የማስተዳደሪያ ገጽ።",
    link: "https://mencollection.vercel.app/",
    image: classicImg
},{
    title: "ServiceAd",
    subTitle: "አገልግሎትዎን ያስተዋዉቁ የሌሎችንም ያግኙ",
    description: "ይህ ዌብሳይት ተጠቃሚዎች ያላቸውን ቢዝነስ ወይም የሚሰጡትን አገልግሎት የሚያስተዋዉቁበት ሲሆን እንዲሁም በአከባቢያቸዉ የሚገኙ አገልግሎቶችን በቀላሉ እንዲያገኙ ያስችላል። ጥቅም ላይ የዋሉት ቴክኖሎጂዎች Next.js, Tailwind CSS, Next-Auth, MongoDB, and mongoose ሲሆኑ Vercel ላይ ሆስት ተደርገዋል።",
    features: "የአገልግሎቶች እና ቢዝነሶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ የአገልግሎትና ቢዝንስ ማስገቢያና ማስተዳደሪያ ግጽ፣ እና ሌሎችም ገጽታዎች።",
    link: "https://servicead.vercel.app",
    image: serviceadImg 
},{
    title: "Portfolio Website",
    subTitle: "",
    description: "የሥራዎች የክሀሎትና የሰርተፊኬቶች ማሳያ ድሀረገጽ Vue.Js, Vue-Router, እና TailwindCSS በመጠቀም የተሠራ እንዲሁም Netlify ላይ ሆስት የተደረገ።",
    features: "Responsive, SPA",
    link: "https://andufereja-portfolio.netlify.app/",
    image: portfolioImg
},{
    title: "QuantumBit",
    subTitle: "የቴክኖሎጂ ተቋም",
    description: "ለQuantumBit የቴክኖሎጂ ተቋም የተሠራ የተሙዋላና ለዐይን ሳቢ የሆነ ዌብሳይት። Astro, React, እና TailwindCSS በመጠቀም የተሠራ ሲሆን cloudflare ላይ ሆስት ተደርግዋል።",
    features: "የተምውላና ለዐይን ሳቢ የሆነ የፊት ገጽ፣ የመመዝገቢያ ፎርም፣ የብሎግ ገጽ እና ሌሎችም።",
    link: "https://quntum-bit.pages.dev/",
    image: quantumbitImg
},{
    title: "ChessGame",
    subTitle: "Progressive Web App",
    description: "ተጠቃሚዎችን ከAI ወይም ክጉዋደኛቸዉ ጋር እንዲጫወቱ የሚያስችል የቼዘ ጨዋታ ዌብ አፕልኬሽን። React, Tailwind CSS and integrated it with an AI chess engine Stockfish በመጠቀም የተሠራ እና Render ላይ ሆስት የተደረገ።",
    features: "የመጫወቻ ቦርዱን ገጽታ መቀያየር ማስቻል፣ የአስቸጋሪነት ደረጃ እንዲሁም ተጫዋችን መምረጥ ማስቻል እና ሌሎችም።",
    link: "https://react-chess-app-uixz.onrender.com/",
    image: chessAppImg
},{
    title: "Cool Market",
    subTitle: "የኦንላይን መገበያያ",
    description: "Next.js, Tailwind CSS, እና Laravel በመጠቀም የተሠራ የኤሌክትሮኒክ መገበያያ ዌብሳይት።",
    features: "የምርቶች ዝርዝር እንዲሁም የምርት ማብራሪያ ግጽ፣ ምርቶችን ወደ ቅርጫት መጫንና ማስተዳደር፣ የብሃንና የምሽት አማራጭ፣ ለዌብሳይት አስተዳዳሪዎች የምርቶችን መረጃ የማስተዳደሪያ ገጽ።",
    link: "https://github.com/Andu-alem/laravel-next-ecommerce",
    image: laravelNextImg 
},{
    title: "NewForm",
    subTitle: "Furniture company",
    description: "Astro Svelte እና Tailwind CSS በመጠቀም ለNewForm ፈርኒቸር ድርጅት የተሠራ ዌብሳይት እንዲሁም Verceel ላይ ሆስት ትደርግዋል።",
    features: "",
    link: "https://newformfurniture.vercel.app/",
    image: newFormImg 
},{
    title: "EventUpdater",
    subTitle: "የኢቨንት መለዋወጫ አፕልኬሽን",
    description: "የሚደረጉ ዝግጅቶችን ማጋራት የሚያስችል ዌብ አፕልኬሽን። React, Material UI, Express.js, MongoDB በመጠቀም የተሠራ እና Render ላይ ሆስት የተደረገ።",
    features: "",
    link: "https://eventsupcoming.onrender.com/",
    image: eventUpdaterImg 
}]

export default projects