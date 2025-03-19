import Page_comp from "../componants/Page";

export default class ErrorPage extends Page_comp {
    async render(){
        return `
        <section>
        <h1>ERROR Route</h1>
        </section>
        `;
    }
}