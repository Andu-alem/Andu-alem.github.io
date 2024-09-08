
var isDisplayOn = false;
window.addEventListener('resize', function(){
	const mp = matchMedia('(max-width: 840px)');
	if(!mp.matches){
		//if screen width > 800px
		document.getElementById('nav-list').setAttribute('style','display:block');
		isDisplayOn = true;
	} else{
		document.getElementById('nav-list').setAttribute('style','display:none');
		isDisplayOn = false;
	}
});

window.addEventListener("load", function(){
	//hederHandler();
	toolsPorovider();
	scrollAnimationEffect();
	footerListAnimation();
	footerHAnimation();
})

function menuHandler(e){
	console.log(e.target)
	if(!isDisplayOn){
		document.getElementById('nav-list').setAttribute('style','display:block');
		isDisplayOn = true;
	}else{
		document.getElementById('nav-list').setAttribute('style','display:none');
		isDisplayOn = false;
	}
	
}

const hederHandler = () => {
	let lastScrollOffset = 0;
	const headerElement = document.querySelector(".header"); 
	const displayMenuBar = () => {
	  headerElement.classList.add('scrolled');
	}
	const hideMenuBar = () => {
	  headerElement.classList.remove('scrolled');
	}
	const handleScrollAnimation = () => {
	  const top = document.documentElement.scrollTop;
	  if(top > (lastScrollOffset + 150)){
	  	hideMenuBar()
	  } else {
	  	displayMenuBar()
	  }
	  lastScrollOffset = top
	}
	window.addEventListener('scroll', () => {
	  handleScrollAnimation();
	})
}

const toolsPorovider = () => {
	const logos = ["web.png","mern.png","next.png", "node.png", "bootstrap.png",
	"django.jfif", "java.png", "php.png", "mysql.png", "git_github.png", "android.png", "ts.png"];
	var node = document.getElementById("logos");

	for (var i = 0; i < logos.length; i++) {
		var imgElement = document.createElement("img");
		imgElement.src = `img/png/${logos[i]}`;
		imgElement.classList.add("logo");
		node.appendChild(imgElement);
	}
}

const scrollAnimationEffect = () => {
	const elm = document.querySelector(".tools-known");
	const observer = new IntersectionObserver((entries) =>{
		entries.forEach((entry) => {
			if (entry.isIntersecting){
				entry.target.classList.add('fadeIn');
			} else {
				entry.target.classList.remove('fadeIn');
			}
		})
	}, { threshold: 0.3 });
	observer.observe(elm);
}

const footerListAnimation = () => {
	const footerLists = document.querySelectorAll(".footer-list");
	const observer = new IntersectionObserver((entries) =>{
		entries.forEach((entry) => {
			if (entry.isIntersecting){
				entry.target.classList.add('bring-list');
			} else {
				entry.target.classList.remove('bring-list');
			}
		})
	}, { threshold: 0.1 });

	for (let i = 0; i < footerLists.length; i++) {
		const footerList = footerLists[i];
		observer.observe(footerList);
	}
}

const footerHAnimation = () => {
	const footerLists = document.querySelectorAll(".footer-h");
	const observer = new IntersectionObserver((entries) =>{
		entries.forEach((entry) => {
			if (entry.isIntersecting){
				entry.target.classList.add('bring-footer-header');
			} else {
				entry.target.classList.remove('bring-footer-header');
			}
		})
	}, { threshold: 0.2 });

	for (let i = 0; i < footerLists.length; i++) {
		const footerList = footerLists[i];
		observer.observe(footerList);
	}
}