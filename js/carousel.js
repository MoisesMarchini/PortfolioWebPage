const carouselIndicators = document.querySelectorAll('.carousel__indicator .indicator');

let currentItem = 0;
let itemWidth = 0;
const carouselItems = document.querySelectorAll('.carousel__item');
const carouselWrapper = document.querySelector('.portfolio__carousel__wrapper');
const totalCarouselItems = carouselItems.length - 1;

const onScrollStop = callback => {
    let isScrolling;
    carouselWrapper.addEventListener(
        'scroll',
        e => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                callback();
            }, 150);
        },
        false
    );
};
onScrollStop(() => {
    GetItemWidth();
    var scrollFactor = carouselWrapper.scrollLeft;
    let offset = 20;
    let currentItemScrollWidth = itemWidth * currentItem;
    let itemPicked = -1;
    let difBetweenScroll = Math.abs(currentItemScrollWidth - scrollFactor);
    for (let i = 0; i < carouselItems.length; i++) {
        let itemDifBetweenScroll = Math.abs((itemWidth * i) - scrollFactor) - offset;
        if (itemDifBetweenScroll <= difBetweenScroll) {
            difBetweenScroll = itemDifBetweenScroll;
            itemPicked = i;
        }
    }
    if (itemPicked >= 0) {
        currentItem = itemPicked;
        ScrollCarrousel();
        SetIndicatorActive();
    }
});

carouselIndicators.forEach((indicator, indicatorIndex) => {
    indicator.addEventListener('click', () => {
        currentItem = indicatorIndex;
        SetIndicatorActive();
        ScrollCarrousel();
    })
})
carouselItems.forEach((item, indexId) => {

    item.addEventListener('click', () => {

        currentItem = indexId;
        SetIndicatorActive();
        ScrollCarrousel();
    })
})
function ScrollCarrousel() {
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselItems[currentItem].classList.add('active');
    carouselItems[currentItem].scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth"
    });
}

function SetIndicatorActive() {
    carouselIndicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.remove('active');
        if (indicatorIndex == currentItem)
            indicator.classList.add('active');
    })
}

function GetItemWidth() {
    itemWidth = carouselItems[0].scrollWidth;
}
console.log('carousel.js loaded');
