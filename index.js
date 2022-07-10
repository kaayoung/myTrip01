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


// 스크롤하면 점점 Home 섹션이 투명하게 
const home = document.querySelector("#home");
const homeContent = document.querySelector(".home__content");
const homeHeight = home.getBoundingClientRect().height;

function scrollHomeTransparent() {
    const scroll = window.scrollY;

    homeContent.style.opacity = 1-scroll/homeHeight ;
}

document.addEventListener("scroll", scrollHomeTransparent);


// Home 밑으로 스크롤하면 Up Arrow 나오도록
const upArrow = document.querySelector("#up-arrow") ;

document.addEventListener("scroll" , () => {
    if(window.scrollY > homeHeight) {
        upArrow.classList.remove("hide"); 
    } else {
        upArrow.classList.add("hide");
    }
});

upArrow.addEventListener("click" , () => {
    window.scrollTo({top : 0, behavior : "smooth"});
});


// Pictures 필터 기능 
const pic_categories_btn = document.querySelector(".pic__categories") ;
const pic_images = document.querySelector(".pic__images");
const pictures = document.querySelectorAll(".pic__img") ;

function picturesFilter(e) {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter ;
    if (!filter) {
        return ;
    }

    pic_images.classList.add("pic-animation");

    setTimeout(() => {

        pictures.forEach((pic) => {
            if(filter==='*' || filter===pic.dataset.type) {
                pic.classList.remove("hide");
            } else {
                pic.classList.add("hide");
            }
        })

        pic_images.classList.remove("pic-animation");
    }, 200);
}

pic_categories_btn.addEventListener("click", picturesFilter) ;


// Pictures - 클릭할 때 active
function picBtnClickClass(e) {
    const picBtnActiveClass = document.querySelector(".cate__btn.active");
    const target = e.target.nodeName==="BUTTON" ? e.target.classList : e.target.parentNode.classList ;

    if(!target.contains("active")){
        picBtnActiveClass.classList.remove("active") ;
        target.add("active");
    }
} 

pic_categories_btn.addEventListener("click" , picBtnClickClass);




/*
// 네비게이션 바 - 클릭할 때 active
function navMenuActive(e) {
    const navbarActiveClass = document.querySelector(".navbar__menu__item.active");
    if(!e.target.classList.contains('active')){
        navbarActiveClass.classList.remove("active") ;
        e.target.classList.add("active");
    }
}

navbarMenu.addEventListener("click" , navMenuActive) ;
*/
