import HeaderBar from './HeaderBar.js';
import Footer from './Footer.js';

export default class Page_comp {
    async render(){;};
    static async renderPage(contentCallback) {;
        return `
          ${await HeaderBar.render()}
          <div class="background-image"></div>
          <div class="main">
            <img src="img/scroll.png" alt="Background" class="main-image">
            <div class="gray-div"></div>
            ${await contentCallback()}
          </div>
          ${await Footer.render()}
        `;
      }
}