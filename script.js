const container = document.querySelector(".container");
const title = document.querySelector(".title");
const btn = document.querySelector("#btn");
let load = document.querySelector(".loader");
let isfetched = false;
//pre-loader
window.addEventListener("load", () => {
    load.classList.add("loader-hidden");
    load.addEventListener("transitioned", () => {
        document.body.removeChild("loader");
    })
})
//loader
function loader() {
    if (isfetched) {
        load.classList.add("loader-hidden");
    } else {
        fetchPost();
        load.classList.remove("loader-hidden");
    }
}
//making http request
// end point of server/api
const url = "https://jsonplaceholder.typicode.com/posts";
const fetchPost = async () => {
    try {
        isfetched = true;
        const response = await fetch(url);
        const data = await response.json();
        //remove loader
        loader();
        //display to DOM
        const result = data.map(post => {
            return `
        <div class="card">
            <div class="card-title">
              <h2>${post.title}</h2>
            </div>
            <div class="card-body">
              <p>
                ${post.body}
              </p>
            </div>
          </div>
        `
        });
        container.innerHTML = result.join("");
    } catch (error) {
        console.log(error);
    }
};

btn.addEventListener("click", loader);