


export default class Popup_comp {
    async render(){;};
    static async renderPage(contentCallback) {;
        return `
        <section class="overlay">
        <img src="img/skyrim-logo-graphic-xa101sn0p941hozw.png" height="42" width="42" alt="Background" class="logo">
        <div> 
            ${await contentCallback()}
        </div>
        <button class="favorite styled" type="button">Add to favorites</button>
        </section>
        `

      }
}