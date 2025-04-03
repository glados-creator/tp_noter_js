export default class PersonnageViewComp {
    async render(){;};
    static async renderPage(contentCallback) {;
        return `

        <section class="overlay">
                ${await contentCallback()}
        </section>
        `;
      }
}
