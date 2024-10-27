var isDisplayOn = false;
var intersectionSupported;

if (!('IntersectionObserver' in window) || !('IntersectionObserverEntry' in window) || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
	intersectionSupported = false;	
} else {
	intersectionSupported = true;
}

window.addEventListener("load", function(){
	//hederHandler();
	toolsPorovider();
	scrollAnimationEffect();
	footerListAnimation();
	footerHAnimation();
})
function menuHandler(e){
	const nav = document.getElementsByClassName('nav')[0];
	if(!isDisplayOn){
		nav.classList.add("show-list");
		isDisplayOn = true;
	}else{
		nav.classList.remove("show-list");
		isDisplayOn = false;
	}
	
}

function toolsPorovider(){
	const logos = ["web.png","mern.png","next.png", "node.png", "bootstrap.png","django.jfif", "java.png", "php.png", "mysql.png", "git_github.png", "android.png", "ts.png"];
	var node = document.getElementById("logos");

	for (var i = 0; i < logos.length; i++) {
		var imgElement = document.createElement("img");
		imgElement.src = 'img/png/'+logos[i];
		imgElement.classList.add("logo");
		node.appendChild(imgElement);
	}
}

function hederHandler() {
	var lastScrollOffset = 0;
	const headerElement = document.querySelector(".header"); 
	const displayMenuBar = function(){
	  headerElement.classList.add('scrolled');
	}
	const hideMenuBar = function() {
	  headerElement.classList.remove('scrolled');
	}
	const handleScrollAnimation = function(){
	  const top = document.documentElement.scrollTop;
	  if(top > (lastScrollOffset + 150)){
	  	hideMenuBar();
	  } else {
	  	displayMenuBar();
	  }
	  lastScrollOffset = top;
	}
	window.addEventListener('scroll', function(){
	  //handleScrollAnimation();
	  var t = document.documentElement.scrollTop;
	  var height = document.documentElement.clientHeight;
	  const offsetTop = document.querySelector("#skills").offsetTop;
	  if (offsetTop < t + height - 100) {
	  	console.log("Entred skills initiate animation");
	  }
	})
}

function scrollAnimationEffect(){
	const elm = document.getElementsByClassName("tools-known")[0];
	if (!intersectionSupported) {
		elm.classList.add('fadeIn');
		return;
	}
	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry) {
			if (entry.isIntersecting){
				entry.target.classList.add('fadeIn');
			} else {
				entry.target.classList.remove('fadeIn');
			}
		})
	}, { threshold: 0.3 });
	observer.observe(elm);
}

function footerListAnimation(){
	const footerLists = document.getElementsByClassName("footer-list");

	if (!intersectionSupported) {
		for (var i = 0; i < footerLists.length; i++) {
			const footerList = footerLists[i];
			footerList.classList.add('bring-list');
		}
		return;
	}

	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if (entry.isIntersecting){
				entry.target.classList.add('bring-list');
			} else {
				entry.target.classList.remove('bring-list');
			}
		})
	}, { threshold: 0.1 });

	for (var i = 0; i < footerLists.length; i++) {
		const footerList = footerLists[i];
		observer.observe(footerList);
	}
}

function footerHAnimation(){
	const footerLists = document.getElementsByClassName("footer-h");

	if (!intersectionSupported) {
		for (var i = 0; i < footerLists.length; i++) {
			const footerList = footerLists[i];
			footerList.classList.add('bring-footer-header');
		}
		return;
	}

	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if (entry.isIntersecting){
				entry.target.classList.add('bring-footer-header');
			} else {
				entry.target.classList.remove('bring-footer-header');
			}
		})
	}, { threshold: 0.2 });

	for (var i = 0; i < footerLists.length; i++) {
		const footerList = footerLists[i];
		observer.observe(footerList);
	}
}

function toggleDarkMode(e) {
	var mode = e.innerHTML;
	var r = document.querySelector(':root');
	if (!('getAttributeNames' in r)) {
		var body = document.body;
		var header = document.getElementsByClassName('header')[0];
		if (mode.trim() === 'Dark') {
			e.innerHTML = 'Light';
			body.setAttribute('style','background-color: #0c1b27; color: #f2f2f2');
			header.setAttribute('style','background-color: #0c1b27; color: #f2f2f2');
		} else {
			e.innerHTML = 'Dark';
			body.setAttribute('style','background-color: #fafafa; color: #19334d');
			header.setAttribute('style','background-color: #fafafa; color: #19334d');
		}
		return;
	}
	if (mode.trim() === 'Dark') {
		e.innerHTML = 'Light';
		//alert("inside toggle dark mode");
		r.style.setProperty('--bg-color', '#0c1b27');
		r.style.setProperty('--main-text-color', '#f2f2f2');
		r.style.setProperty('--primary-text-color', '#34d399');
		r.style.setProperty('--secondary-text-color', '#38bdf8');
	} else {
		e.innerHTML = 'Dark';
		r.style.setProperty('--bg-color', '#fafafa');
		r.style.setProperty('--main-text-color', '#19334d');
		r.style.setProperty('--primary-text-color', '#209268');
		r.style.setProperty('--secondary-text-color', '#089ddd');
	}
}