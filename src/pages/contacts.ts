
export function contactsPage(): Node {
    const section = document.createElement("section")
    section.classList.add("contacts-section")

    const h1 = document.createElement("h1")
    h1.innerText = "Contacts Page"
    section.appendChild(h1)

    const h4 = document.createElement("h4")
    h4.innerText = "We look forward doing business with you!"
    section.appendChild(h4)

    const article1 = document.createElement("article")
    article1.classList.add("map")

    const iframe = document.createElement("iframe")
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2935.995279290262!2d25.390709176612564!3d42.619056118698786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a85581c598de43%3A0x1d21c72b69a82965!2z0KbQtdC90YLRitGAINCa0LDQt9Cw0L3Qu9GK0Lo!5e0!3m2!1sbg!2sbg!4v1743087996775!5m2!1sbg!2sbg"
    iframe.width = "600"
    iframe.height = "450"
    iframe.style.border = "0"
    iframe.setAttribute("allowfullscreen","")
    iframe.setAttribute("loading","lazy")
    iframe.setAttribute("referrerpolicy","no-referrer-when-downgrade")
    article1.appendChild(iframe)
    section.appendChild(article1)

    const p1 = document.createElement("p")
    p1.innerText = "We are here to help and answer any question you might have.We look forward to hearing from you!"
    section.appendChild(p1)

    const article2 = document.createElement("article")
    article2.classList.add("contact-details")

    const p2 = document.createElement("p")
    const i1 = document.createElement("i")
    i1.classList.add("fa-solid")
    i1.classList.add("fa-phone")
    p2.appendChild(i1)
    p2.appendChild(document.createTextNode(" +359 123 456 789"));
    article2.appendChild(p2)

    const p3 = document.createElement("p")
    const i2 = document.createElement("i")
    i2.classList.add("fa-solid")
    i2.classList.add("fa-envelope")
    p3.appendChild(i2)
    p3.appendChild(document.createTextNode(" example123@gmail.com"));
    article2.appendChild(p3)

    section.appendChild(article2)

    const h5 = document.createElement("h5")
    h5.innerText = "Here is what to expect:"
    section.appendChild(h5)

    const article3 = document.createElement("article")
    article3.classList.add("expectations")

    const div1 = document.createElement("div")
    div1.classList.add("expectation-container")

    const div2 = document.createElement("div")
    const i3 = document.createElement("i")
    i3.classList.add("fa-solid")
    i3.classList.add("fa-check")
    div2.appendChild(i3)
    div1.appendChild(div2)

    const p4 = document.createElement("p")
    p4.innerText = "A deep dive into your situation and the ideal outcome"
    div1.appendChild(p4)

    const div3 = document.createElement("div")
    div3.classList.add("expectation-container")

    const div4 = document.createElement("div")
    const i4 = document.createElement("i")
    i4.classList.add("fa-solid")
    i4.classList.add("fa-check")
    div4.appendChild(i4)
    div3.appendChild(div4)

    const p5 = document.createElement("p")
    p5.innerText = "Insights and clarity how we can help you"
    div3.appendChild(p5)

    article3.appendChild(div1)
    article3.appendChild(div3)

    section.appendChild(article3)

    return section
}