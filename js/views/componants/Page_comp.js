import HeaderBar from './HeaderBar.js';
import Footer from './Footer.js';

export default class Page_comp {
    async render(){;};
    static async renderPage(contentCallback) {;
        return `
          ${await HeaderBar.render()}

          
          <div class="background-image"></div>
          <img src="img/Skyrim-logo.png" alt="Background" class="title-image">
          <div class="main">
          <img src="img/scroll.png" alt="Background" class="main-image">

          <section>
                ${await contentCallback()}
          </section>
          
          <div class = "cache"> </div>
          <section class="gray-div"></section>
            
          </div>
          ${await Footer.render()}
        `;
      }
}

