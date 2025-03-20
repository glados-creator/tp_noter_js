const Utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/");
        let request = {
            resource: null,
            id: null,
            verb: null
        };
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];
        return request;
    },
    AutoFetch: async ({url,callback = (json) =>json}) => {
        const options = {
            methode: "GET",
            header: {
                "Content-Type": "application/json"
            }
        };

        try {
            const rep = await fetch(ENDPOINT+url, options);
            const json = await rep.json();
            return callback(json);
        } catch (error) {
            console.error(error);
            return {};
        }
    }
};

export default Utils;