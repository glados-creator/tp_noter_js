import HeaderBar from './HeaderBar.js';
import Footer from './Footer.js';

export default class Page_comp {
    async render(){;};
    static async renderPage(contentCallback) {;
        return `
          ${await HeaderBar.render()}
          <div class="background-image"></div>
          <div class="main">
          <section>
          <img src="img/scroll.png" alt="Background" class="main-image">
          </section>
          <section class="gray-div"></section>
            ${await contentCallback()}
          </div>
          ${await Footer.render()}
        `;
      }
}