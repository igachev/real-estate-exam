import { HomeSlideImage } from "../types";

export let sliderImageInterval: ReturnType<typeof setInterval>;

export function homePage(): Node {
    
    clearInterval(sliderImageInterval)

    const sliderImages: HomeSlideImage[] = [
        {imgName: "images/sean-pollock-PhYq704ffdA-unsplash.jpg",text: 'Great place for buying,selling,renting real estates'},
        {imgName: "images/joey-kyber-Pihl8kTtX-s-unsplash.jpg",text: 'Excellent customer service'},
        {imgName: "images/samson-ZGjbiukp_-A-unsplash.jpg",text: 'great deals,offers,discounts'}
    ];
    let imageIndex = 0;

    const sectionElement = document.createElement("section")
    sectionElement.classList.add("home-section")

    const h1Element = document.createElement("h1")
    h1Element.innerText = "Home Page"
    sectionElement.appendChild(h1Element)

    const welcomeMessage = document.createElement("p")
    welcomeMessage.classList.add("welcome-message")
    welcomeMessage.innerText = "Welcome to the world of real estate. Explore a collection of properties with detailed information and stunning photos."
    sectionElement.appendChild(welcomeMessage)

    const articleElement = document.createElement("article")

    const leftIcon = document.createElement("i")
    leftIcon.classList.add("fa-solid")
    leftIcon.classList.add("fa-chevron-left")

    const leftBtn = document.createElement("button")
    leftBtn.classList.add("basic-btn")
    leftBtn.appendChild(leftIcon)

    const leftBtnContainer = document.createElement("div")
    leftBtnContainer.classList.add("slider-btn-container")
    leftBtnContainer.appendChild(leftBtn)

    const rightIcon = document.createElement("i")
    rightIcon.classList.add("fa-solid")
    rightIcon.classList.add("fa-chevron-right")

    const rightBtn = document.createElement("button")
    rightBtn.classList.add("basic-btn")
    rightBtn.appendChild(rightIcon)

    const rightBtnContainer = document.createElement("div")
    rightBtnContainer.classList.add("slider-btn-container")
    rightBtnContainer.appendChild(rightBtn)

    const imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container")

    const image = document.createElement("img")
    image.src = "images/sean-pollock-PhYq704ffdA-unsplash.jpg"
    imgContainer.appendChild(image)

    const textForImage = document.createElement("p")
    textForImage.innerText = "Great place for buying,selling,renting real estates"
    imgContainer.appendChild(textForImage)

    articleElement.appendChild(leftBtnContainer)
    articleElement.appendChild(imgContainer)
    articleElement.appendChild(rightBtnContainer)

    sectionElement.appendChild(articleElement)

    const nextImage = () => {
        if(imageIndex < sliderImages.length - 1) {
            imageIndex++
            image.src = sliderImages[imageIndex].imgName
            textForImage.innerText = sliderImages[imageIndex].text
        }
        else {
            imageIndex = 0;
            image.src = sliderImages[imageIndex].imgName
            textForImage.innerText = sliderImages[imageIndex].text
        }
    }

    const previousImage = () => {
        if(imageIndex > 0) {
            imageIndex--
            image.src = sliderImages[imageIndex].imgName
            textForImage.innerText = sliderImages[imageIndex].text
        }
        else {
            imageIndex = 2;
            image.src = sliderImages[imageIndex].imgName
            textForImage.innerText = sliderImages[imageIndex].text
        }
    }

    leftBtn.addEventListener("click",previousImage)
    rightBtn.addEventListener("click",nextImage)

   sliderImageInterval = setInterval(() => {
            nextImage()
    }, 5000);

    return sectionElement
}
