import Utils from "./js/services/Utils.js";
import Home_page from "./js/views/pages/Home.js";
import Error_Page from "./js/views/pages/ErrorPage.js";

// TODO : do

const routes = {
    "/"           : Home_page,
    "/User"       : User_page,
    "/preset"     : Preset_page,
    "/comparaison": Comparaison_page,
}

const router = async () => {
    const content   = document.querySelector("#content");
    let   request   = Utils.parseRequestURL();
    console.log("router request :",request);
    let   parsedurl = `/${request.resource || ""}${request.id ? "" : "/0"}${request.verb ? `/${request.verb}` : ""}`;
    console.log("router parsedURL :",parsedurl);
    let   page      = routes[parsedurl] ? (new routes[parsedurl]()) : (new Error_Page());
    console.log("PAGE : ",page);
    console.log("TYPEOF PAGE : ",typeof page);
    content.innerHTML = await page.render();
};

window.addEventListener("load",router);
window.addEventListener("hashchange",router);