import Page_comp from "../componants/Page_comp.js";
import Popup_comp from "../componants/pop_up_comp.js";

export default class ErrorPage extends Page_comp {
    async render() {
        return Page_comp.renderPage(() => Popup_comp.renderPOPUP(() =>
        
        `
        <section class="main-content">
          <h1> error 404 </h1>
          <p>Sorry, something went wrong!</p>
        </section>
        `
  )
        );
        
    }
}
