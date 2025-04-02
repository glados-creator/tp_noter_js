export default class Popup_comp {
    async render(){;};
    static async renderPOPUP(contentCallback) {
        return `
        <section class="overlay">
                <img src="img/skyrim-logo-graphic-xa101sn0p941hozw.png" height="42" width="42" alt="Background" class="logo">
                ${await contentCallback()}
                <button class="favorite styled" type="button">ok</button>
        </section>
        `;
      }
}
