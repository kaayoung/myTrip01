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

// 스크롤 시 해당 페이지로 넘어가기 - 네비게이션 바 & Contact버튼
const navbarMenu = document.querySelector(".navbar__menu");
const homeContact = document.querySelector("#home .home__contact");

function moveToPage(e) {
    const target = e.target;
    const link = target.dataset.link ;

    if (!link) {
        return;
    } else {
        const scrollTo = document.querySelector(link);
        scrollTo.scrollIntoView({behavior:"smooth"});
    }
}

navbarMenu.addEventListener("click" , moveToPage);
homeContact.addEventListener("click", moveToPage);


// 