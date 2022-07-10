'use strict'

// 네비게이션 바 : 스크롤하면 투명에서 파랑으로 변환

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll" , () => {
    if (window.scrollY > navbarHeight ) {
        navbar.classList.add("navbar--color") ;
    } else {
        navbar.classList.remove("navbar--color") ;
    }
})
