import { ENDPOINT } from "../config.js";
import Utils from "./Utils.js";
export default class ProviderArticle {

    static FetchPersonnageTop10 = async ({limite=20}) => {
        return Utils.AutoFetch(`?_limit=${limit}`,(json) => json);
    }

    static GetArticles = async (id) => {
        const options = {
            methode : "GET",
            header : {
                "Content-Type" : "application/json"
            }
        };

        try {
            const rep = await fetch(`${ENDPOINT}?id=${id}`,options);
            const json = await rep.json();
            return json[0];
        } catch (error) {
            console.error(error);
            return {};
        }
    }

}