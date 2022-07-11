const search = document.getElementById("search")
const posts = document.getElementById('posts')
const div = document.getElementById('div')
let buttons = document.getElementById('button')
let btn = document.getElementById('btn')
let ListOfitems = []

search.addEventListener('input', (e) => {
    //searching by name and house
    searchString = e.target.value.toLowerCase()
    const filteredItems = ListOfitems.filter(({ name, house }) => {
        return name.toLowerCase().includes(searchString) || house.toLowerCase().includes(searchString)
    })
    maping(filteredItems)
})


const getData = async () => {
    try {
        const data = await fetch("http://hp-api.herokuapp.com/api/characters")
        itemsList = await data.json()

        //in the array has only 24 items with images
        ListOfitems = await itemsList.filter((fill, index) => index <= 24)

        //to mapping items on the browser for the first time
        maping(ListOfitems)

    } catch (err) {
        console.error(err);
    }
}


const maping = (items) => {

    const mapingItems = items.map(({ image, name, dateOfBirth, house }) => (

        `<div class= "content" >
            <img src="${image}"/>
            <div class="characters">
                <div class="subdiv">
                    <label>Name</label>
                    <h2>${name}</h2>
                </div>
                <div class="subdiv">
                    <label class="label">date of birth</label>
                    <h4>${dateOfBirth}</h4>
                </div>
                <div class="subdiv">
                    <label>House</label>
                    <h4>${house}</h4>
                </div>
                <div id="link__block">
                    <a href='details.html'>Details</a>
                </div>
            </div>    
        </div> `
    )).join('');
    posts.innerHTML = mapingItems;
}

getData()


