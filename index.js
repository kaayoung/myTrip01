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

// 클릭 시 해당 페이지로 넘어가기 - 네비게이션 바 & Contact버튼
const navbarMenu = document.querySelector(".navbar__menu");
const homeContact = document.querySelector("#home .home__contact");

function moveToPage(e) {
    const target = e.target;
    const link = target.dataset.link ;

    if (!link) {
        return;
    } 
    scrollIntoView(link);
}

navbarMenu.addEventListener("click" , moveToPage);
homeContact.addEventListener("click", moveToPage);

// 반응형 - 햄버거바 클릭하면 메뉴 아래로 펼치기 
const toggleBtn = document.querySelector(".navbar__toggle-btn");

toggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
})


// 반응형 - 스크롤하면 메뉴창 닫히게 
window.addEventListener("scroll" , () => {
    navbarMenu.classList.remove("open");
})


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

upArrow.addEventListener("click" , (e) => {
    //window.scrollTo({top : 0, behavior : "smooth"});
    scrollIntoView(sectionIDs[0]);
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




// 스크롤시 해당 섹션의 메뉴 활성화 
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가져온다 
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다 

const sectionIDs = [
    '#home',
    '#where',
    '#plan',
    '#picture',
    '#review',
    '#contact'
]

const sections = sectionIDs.map((id) => document.querySelector(id));
const navbarItems = sectionIDs.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavbar = navbarItems[0]; // 처음 사이트 접속할 때는 home이 되도록
let focusedNum = 0 ;

function scrollIntoView(selector) { // 특정 위치에 스크롤하고 네비게이션에도 표시
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
    selectNavbar(navbarItems[sectionIDs.indexOf(selector)]);
}

function selectNavbar(selected) { // 해당 위치에 네비게이션 바 경계선 표시
    selectedNavbar.classList.remove("active");
    selectedNavbar = selected ;
    selectedNavbar.classList.add("active") ;
}

function observeCallback(entries, observer) {
    entries.forEach(entry => {
       if(!entry.isIntersecting && entry.intersectionRatio >0 ) {
        const num = sectionIDs.indexOf(`#${entry.target.id}`);

        if(entry.boundingClientRect.y<0) { // 스크롤 아래로 내릴때
            focusedNum = num+1; 
        } else { // 스크롤 위로 올릴때
            focusedNum = num-1; 
        }
       }
    });
}

window.addEventListener("wheel" , () => { // 처음과 끝 에는 home/contact 로
    if(window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectNavbar(navbarItems[navbarItems.length-1]);
    } else if (window.screenY===0) {
        focusedNum = 0
    } else {
        selectNavbar(navbarItems[focusedNum]);
    }
    
})

const observeOption = {
    threshold : 0.3
}

const observer = new IntersectionObserver(observeCallback,observeOption) ;
sections.forEach(section => observer.observe(section)) ;