const navbar = document.querySelector('nav');
const navLi = document.querySelectorAll('nav ul li a')
const polygonBg = document.querySelectorAll('.background__geo');
const sections = document.querySelectorAll('.container.fullSlide');
const arrows = document.querySelectorAll('.arrow');
const sectionsId = GetAllSectionsId();
let currentPage = 'home';
let currentPageId = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY != 0)
        navbar.classList.add('shadow');
    else
        navbar.classList.remove('shadow');
});

navLi.forEach((button, orderIndex) => {
    button.addEventListener('click', () => {
        NavOnClick(orderIndex);
    })
});

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        if (arrow.classList.contains('arrow-right'))
            GoToSection(1);
        else
            GoToSection(-1);

    })
})

function NavOnClick(orderIndex) {

    let lastPage = currentPage;
    let lastPageId = currentPageId;

    navLi.forEach((button, orderIndex1) => {
        button.classList.remove('active');
        if (orderIndex1 == orderIndex)
            button.classList.add('active');
    });
    if (orderIndex != 0)
        navbar.classList.add('shadow');
    else
        navbar.classList.remove('shadow');

    currentPage = navLi[orderIndex].classList[0];
    currentPageId = orderIndex;
    polygonBg.forEach(background => {
        background.classList.remove(lastPage);
        background.classList.add(currentPage);
    })

    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (section.id == currentPage)
            section.classList.add('active');
    })
    arrows.forEach(arrow => {
        arrow.classList.remove('inactive');
        if (arrow.classList.contains('arrow-right') && currentPageId == sectionsId.length - 1)
            arrow.classList.add('inactive');
        if (arrow.classList.contains('arrow-left') && currentPageId == 0)
            arrow.classList.add('inactive');
    })
}
function GetAllSectionsId() {
    let arrayId = [];
    sections.forEach((section) => {
        arrayId.push(section.id);
    })
    return arrayId;
}
function GoToSection(index) {
    NavOnClick(Math.max(0, Math.min(currentPageId + index, sectionsId.length - 1)));
}
console.log('main.js loaded');