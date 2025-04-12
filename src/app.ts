import { contactsPage } from "./pages/contacts.js"
import { galleryPage } from "./pages/gallery.js"
import { homePage, sliderImageInterval } from "./pages/home.js" // use .js extension otherwise it wont work

const allLinks = document.querySelectorAll(".nav-link") as NodeListOf<HTMLAnchorElement>
const page = document.getElementById("page-content")
enum NAV_LINKS {
    HOME = "HOME",
    CONTACTS = "CONTACTS",
    GALLERY = "GALLERY"
}

allLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener("click",async(e: Event) => {
        const currentLink = (e.target as HTMLAnchorElement).innerText

        if(currentLink === NAV_LINKS.HOME) {
            history.pushState({},"","/home")
            if(page) {
                page.innerHTML = ""
            }
            page?.appendChild(homePage())
        }

        else if(currentLink === NAV_LINKS.CONTACTS) {
            clearInterval(sliderImageInterval)
            history.pushState({},"","/contacts")
            if(page) {
                page.innerHTML = ""
            }
            page?.appendChild(contactsPage())
        }

        else if(currentLink === NAV_LINKS.GALLERY) {
            clearInterval(sliderImageInterval)
            history.pushState({},"","/gallery")
            if(page) {
                page.innerHTML = ""
            }
             page?.appendChild(await galleryPage())
            
        }
    })
})

// load home page on initial loading
document.addEventListener("DOMContentLoaded", () => {
    history.pushState({},"","/home")
    page?.appendChild(homePage())
});

// Handle forward/back buttons
window.addEventListener("popstate", async() => {

   if(page) {
    page.innerHTML = ""
   }

   const currentPath = window.location.pathname

   if(currentPath === '/home') {
    page?.appendChild(homePage())
   }

   else if(currentPath === '/contacts') {
    clearInterval(sliderImageInterval)
    page?.appendChild(contactsPage())
   }

   else if(currentPath === '/gallery') {
    clearInterval(sliderImageInterval)
    page?.appendChild(await galleryPage())
   }

  });
  

