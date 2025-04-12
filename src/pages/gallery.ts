import { FormData, RealEstate } from "../types.js";

async function getEstates(): Promise<RealEstate[]> {
    const response = await fetch("./realEstate.json")
    const data = await response.json()
    return data
}

function toggleShowMore(e: Event): void {     // show/hide hidden information by clicking ShowMore button
    const showMoreButton = e.target as HTMLButtonElement
    const hiddenContent = showMoreButton.parentNode?.previousSibling as HTMLDivElement
    
    if(hiddenContent.className === 'hidden') {
        hiddenContent.classList.remove("hidden")
        showMoreButton.innerText = "Show Less"
    }
    else {
        hiddenContent.classList.add("hidden")
        showMoreButton.innerText = "Show More"
    }

}

function updatePaginationIndex(currentPage: number): void {
    const allNumberBoxes = document.querySelectorAll(".number-box") as NodeListOf<HTMLSpanElement>
    allNumberBoxes.forEach((box) => box.classList.remove("active"))
    allNumberBoxes[currentPage - 1].classList.add("active")
}

export async function galleryPage(): Promise<Node> {

    // used as 'start' for .slice method
    let fromIndex: number = 0;
    // used as 'end' for .slice method
    let toIndex: number = 5;
    let currentPage: number = 1;
    const pageSize: number = 5;

    let realEstates: RealEstate[] = await getEstates()
    
    // numberOfPages is used to determine the new page numbers in pagination container after filtering
       let numberOfPages = Math.ceil(realEstates.length / pageSize)
    
    // this data will be send using post request to filter the real estates
    let formData: FormData = {
        search: "",
        sortByPrice: "",
        apartmentsCheck: false,
        housesCheck: false
    }

    async function filterEstates(): Promise<void> {
        let estates = await getEstates()
        const {search,sortByPrice,apartmentsCheck,housesCheck} = formData
        
        // search filter
        if(search.length > 0) {
           estates = estates.filter((estate) => 
                estate.location.toLowerCase().includes(search.toLowerCase()));
        }
        
        // sort by price filter
        if(sortByPrice === 'low-to-high') {
            estates.sort((a,b) => a.price - b.price)
        }
        else if(sortByPrice === 'high-to-low') {
            estates.sort((a,b) => b.price - a.price)
        }
        else if( sortByPrice === 'Sort By Price...') {
            estates.sort((a,b) => a.id - b.id)
        }
        
        // show only apartments filter
        if(apartmentsCheck) {
           estates = estates.filter((estate) => estate.type === "Apartment")
        }

        // show only houses filter
        if(housesCheck) {
            estates = estates.filter((estate) => estate.type === "House")
         }

        // numberOfPages is used to determine the new page numbers in pagination container after filtering
        numberOfPages = Math.ceil(estates.length / pageSize)
        const paginatedEstates = estates.slice(fromIndex,toIndex)
        // assign the latest updated estates to realEstates variable to prevent problems with nextPage function
        // and pagination navigation
        realEstates = estates
        updateRealEstateCardsAndPagination(paginatedEstates)
        updatePaginationIndex(currentPage)
    }


    async function nextPage() {
        const totalPages = Math.ceil(realEstates.length / pageSize);
        if (currentPage < totalPages) {
            fromIndex += pageSize;
            toIndex += pageSize;
            currentPage++;
           await filterEstates()
        }
    };
    
    async function previousPage() {
        if (currentPage > 1) {
            fromIndex -= pageSize;
            toIndex -= pageSize;
            currentPage--;
           await filterEstates()
        }
    };

    function updateRealEstateCardsAndPagination(realEstates: RealEstate[]): void {
        // clear old content
        const propertiesContainer = document.querySelector(".properties-container")!
        propertiesContainer.innerHTML = ""
        
        // clear old content
        const paginationContainer = document.querySelector(".pagination-container")!
        paginationContainer.innerHTML = ""
        
        // add the new content
        for(let i = 0; i < realEstates.length; i++) {
            const divPropertyCard = document.createElement("div") // start property card
            divPropertyCard.classList.add("property-card")
        
            const h4PropertyType = document.createElement("h4")
            h4PropertyType.innerText = `Type: ${realEstates[i].type}`
            h4PropertyType.classList.add("property-type")
            divPropertyCard.appendChild(h4PropertyType)
        
            const divPropertyImgContainer = document.createElement("div")
            divPropertyImgContainer.classList.add("property-img-container")
        
            const image = document.createElement("img")
            image.src = `${realEstates[i].photos[0]}`
            divPropertyImgContainer.appendChild(image)
            divPropertyCard.appendChild(divPropertyImgContainer)
        
            const pPrice = document.createElement("p")
            pPrice.classList.add("property-price")
            pPrice.innerText = `Price: ${realEstates[i].price}`
            divPropertyCard.appendChild(pPrice)
        
            const pLocation = document.createElement("p")
            pLocation.classList.add("property-location")
            pLocation.innerText = `Location: ${realEstates[i].location}`
            divPropertyCard.appendChild(pLocation)
            
            const divHidden = document.createElement("div")
            divHidden.classList.add("hidden")
            
            const pSize = document.createElement("p")
            pSize.classList.add("size")
            pSize.innerText = `Size: ${realEstates[i].size} square meters`
            divHidden.appendChild(pSize)
    
            const pRooms = document.createElement("p")
            pRooms.classList.add("room")
            pRooms.innerText = `Rooms: ${realEstates[i].rooms}`
            divHidden.appendChild(pRooms)
    
            const pAnemityInfo = document.createElement("p")
            pAnemityInfo.classList.add("anemity-info")
            pAnemityInfo.innerText = "Anemities:"
            divHidden.appendChild(pAnemityInfo)
    
            for(let j = 0; j < realEstates[i].amenities.length; j++) {
                const pAmenity = document.createElement("p")
                pAmenity.classList.add("amenity")
                pAmenity.innerText = `${realEstates[i].amenities[j]}`
                divHidden.appendChild(pAmenity)
            }
    
            const iframe = document.createElement("iframe")
            iframe.src = `${realEstates[i].locationUrl}`
            iframe.width = "300"
            iframe.height = "150"
            iframe.style.border = "0"
            iframe.setAttribute("allowfullscreen","")
            iframe.setAttribute("loading","lazy")
            iframe.setAttribute("referrerpolicy","no-referrer-when-downgrade")
            divHidden.appendChild(iframe)
    
            divPropertyCard.appendChild(divHidden)
        
            const divPropertyBtnContainer = document.createElement("div")
            divPropertyBtnContainer.classList.add("property-btn-container")
        
            const showMoreButton = document.createElement("button")
            showMoreButton.classList.add("basic-btn")
            showMoreButton.innerText = "Show More"
            showMoreButton.addEventListener("click",toggleShowMore)
            divPropertyBtnContainer.appendChild(showMoreButton)
            divPropertyCard.appendChild(divPropertyBtnContainer)
        
            propertiesContainer.appendChild(divPropertyCard) // end property card
        }
        
        // pagination content
        const previousPageButton = document.createElement("button")
        previousPageButton.classList.add("basic-btn")
        previousPageButton.innerText = "Previous Page"
        previousPageButton.addEventListener("click",previousPage)
        paginationContainer.appendChild(previousPageButton)
    
        for(let x = 0; x < numberOfPages; x++) {
            const pageNumber = x + 1
            const numberBox = document.createElement("span")
            numberBox.classList.add("number-box")
            if(pageNumber === 1) {
                numberBox.classList.add("active")
            }
            numberBox.innerText = `${pageNumber}`
            paginationContainer.appendChild(numberBox)
        }
    
        const nextPageButton = document.createElement("button")
        nextPageButton.classList.add("basic-btn")
        nextPageButton.innerText = "Next Page"
        nextPageButton.addEventListener("click",nextPage)
        paginationContainer.appendChild(nextPageButton)
    }

    // ------------- creating HTML DOM elements -------------------
    const section = document.createElement('section')
    section.classList.add("gallery-section")

    const h1 = document.createElement("h1")
    h1.innerText = "Gallery Page"
    section.appendChild(h1)

    const form = document.createElement("form")
    form.classList.add("property-search")
    form.method = "post"

    // ------------submit form-------------
    form.addEventListener("submit", async(e:Event) => {
        e.preventDefault()
        const search = (document.querySelector(".search-input") as HTMLInputElement).value;
        const sortByPrice = (document.querySelector(".sort-by-price") as HTMLSelectElement).value;
        const apartmentsCheck = (document.querySelector(".radio-only-apartments") as HTMLInputElement).checked;
        const housesCheck = (document.querySelector(".radio-only-houses") as HTMLInputElement).checked;

        formData = {
            search,
            sortByPrice,
            apartmentsCheck,
            housesCheck
        }

        currentPage = 1;
        fromIndex = 0;
        toIndex = 5;

        await filterEstates()
    })

    const searchInput = document.createElement("input")
    searchInput.classList.add("search-input")
    searchInput.type = "text"
    searchInput.name = "search-property"
    searchInput.placeholder = "Enter a location... e.g. sofia and press apply filters"
   
    form.appendChild(searchInput)
    section.appendChild(form)

    const sortBySelect = document.createElement("select")
    sortBySelect.classList.add("sort-by-price")
    sortBySelect.name = "sort-by-price"

    const defaultOption = document.createElement("option")
    defaultOption.text = "Sort By Price..."
    defaultOption.selected = true
    sortBySelect.add(defaultOption)

    const option1 = document.createElement("option")
    option1.value = "low-to-high"
    option1.text = "from low to high"
    sortBySelect.add(option1)

    const option2 = document.createElement("option")
    option2.value = "high-to-low"
    option2.text = "from high to low"
    sortBySelect.add(option2)

    form.appendChild(sortBySelect)

    const fieldset = document.createElement("fieldset")
    const legend = document.createElement("legend")
    legend.innerText = "Show only:"
    fieldset.appendChild(legend)

    const checkBoxDivContainer = document.createElement("div")
    checkBoxDivContainer.classList.add("checkbox-container")

    const radioApartments = document.createElement("input")
    radioApartments.type = "radio"
    radioApartments.name = "type"
    radioApartments.classList.add("radio-only-apartments")
    checkBoxDivContainer.appendChild(radioApartments)

    const labelApartments = document.createElement("label")
    labelApartments.htmlFor = "apartments"
    labelApartments.innerText = "apartments"
    checkBoxDivContainer.appendChild(labelApartments)

    fieldset.appendChild(checkBoxDivContainer)

    const divRadio = document.createElement("div")
    divRadio.classList.add("checkbox-container")

    const radioHouses = document.createElement("input")
    radioHouses.type = "radio"
    radioHouses.name = "type"
    radioHouses.classList.add("radio-only-houses")
    divRadio.appendChild(radioHouses)

    const labelHouses = document.createElement("label")
    labelHouses.htmlFor = "houses"
    labelHouses.innerText = "houses"
    divRadio.appendChild(labelHouses)
    fieldset.appendChild(divRadio)

    const divRadio2 = document.createElement("div")
    divRadio.classList.add("checkbox-container")

    const radioBoth = document.createElement("input")
    radioBoth.type = "radio"
    radioBoth.name = "type"
    radioBoth.classList.add("radio-only-houses")
    divRadio2.appendChild(radioBoth)

    const labelBoth = document.createElement("label")
    labelBoth.htmlFor = "both"
    labelBoth.innerText = "both"
    divRadio2.appendChild(labelBoth)
    fieldset.appendChild(divRadio2)

    form.appendChild(fieldset)

    const divFormButtons = document.createElement("div")

    const submitButton = document.createElement("button")
    submitButton.classList.add("submit-btn")
    submitButton.type = "submit"
    submitButton.innerText = "Apply Filters"

    divFormButtons.appendChild(submitButton)
    form.appendChild(divFormButtons)

    const article2 = document.createElement("article")
    article2.classList.add("properties-container")

        // this loop is responsible for the initial loading of the estates
    for(let i = 0; i < pageSize; i++) {
        const divPropertyCard = document.createElement("div") // start property card
        divPropertyCard.classList.add("property-card")
    
        const h4PropertyType = document.createElement("h4")
        h4PropertyType.innerText = `Type: ${realEstates[i].type}`
        h4PropertyType.classList.add("property-type")
        divPropertyCard.appendChild(h4PropertyType)
    
        const divPropertyImgContainer = document.createElement("div")
        divPropertyImgContainer.classList.add("property-img-container")
    
        const image = document.createElement("img")
        image.src = `${realEstates[i].photos[0]}`
        divPropertyImgContainer.appendChild(image)
        divPropertyCard.appendChild(divPropertyImgContainer)
    
        const pPrice = document.createElement("p")
        pPrice.classList.add("property-price")
        pPrice.innerText = `Price: ${realEstates[i].price}`
        divPropertyCard.appendChild(pPrice)
    
        const pLocation = document.createElement("p")
        pLocation.classList.add("property-location")
        pLocation.innerText = `Location: ${realEstates[i].location}`
        divPropertyCard.appendChild(pLocation)

        const divHidden = document.createElement("div")
        divHidden.classList.add("hidden")
        
        const pSize = document.createElement("p")
        pSize.classList.add("size")
        pSize.innerText = `Size: ${realEstates[i].size} square meters`
        divHidden.appendChild(pSize)

        const pRooms = document.createElement("p")
        pRooms.classList.add("room")
        pRooms.innerText = `Rooms: ${realEstates[i].rooms}`
        divHidden.appendChild(pRooms)

        const pAnemityInfo = document.createElement("p")
        pAnemityInfo.classList.add("amenity-info")
        pAnemityInfo.innerText = "Amenities:"
        divHidden.appendChild(pAnemityInfo)

        for(let j = 0; j < realEstates[i].amenities.length; j++) {
            const pAmenity = document.createElement("p")
            pAmenity.classList.add("amenity")
            pAmenity.innerText = `${realEstates[i].amenities[j]}`
            divHidden.appendChild(pAmenity)
        }

        const iframe = document.createElement("iframe")
        iframe.src = `${realEstates[i].locationUrl}`
        iframe.width = "300"
        iframe.height = "150"
        iframe.style.border = "0"
        iframe.setAttribute("allowfullscreen","")
        iframe.setAttribute("loading","lazy")
        iframe.setAttribute("referrerpolicy","no-referrer-when-downgrade")
        divHidden.appendChild(iframe)

        divPropertyCard.appendChild(divHidden)
    
        const divPropertyBtnContainer = document.createElement("div")
        divPropertyBtnContainer.classList.add("property-btn-container")
    
        const showMoreButton = document.createElement("button")
        showMoreButton.classList.add("basic-btn")
        showMoreButton.innerText = "Show More"
        showMoreButton.addEventListener("click",toggleShowMore)
        divPropertyBtnContainer.appendChild(showMoreButton)
        divPropertyCard.appendChild(divPropertyBtnContainer)
    
        article2.appendChild(divPropertyCard)
        section.appendChild(article2) // end property card
    }
    

    const article3 = document.createElement("article")
    article3.classList.add("pagination-container")

    const previousPageButton = document.createElement("button")
    previousPageButton.classList.add("basic-btn")
    previousPageButton.innerText = "Previous Page"
    previousPageButton.addEventListener("click",previousPage)
    article3.appendChild(previousPageButton)

    for(let x = 0; x < numberOfPages; x++) {
        const pageNumber = x + 1
        const numberBox = document.createElement("span")
        numberBox.classList.add("number-box")
        if(pageNumber === 1) {
            numberBox.classList.add("active")
        }
        numberBox.innerText = `${pageNumber}`
        article3.appendChild(numberBox)
    }

    const nextPageButton = document.createElement("button")
    nextPageButton.classList.add("basic-btn")
    nextPageButton.innerText = "Next Page"
    nextPageButton.addEventListener("click",nextPage)
    article3.appendChild(nextPageButton)
    section.appendChild(article3)

    return section
}