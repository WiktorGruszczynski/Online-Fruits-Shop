import getServerUrl from "./getServerUrl";



const post = async (url: string, data: string|Object, headers:Object|null = { "Content-Type": "application/json" }) => {
        var body: any;
        const type = typeof(data);

        if (type === "string"){
            body = `${data}`;
        }


        if (type === "object"){
            if (data.constructor.name == "FormData"){
                body = data
            }
            else{
                body = JSON.stringify(data);
            }
        }

        if (type === "number"){
            body = data.toString()
        }

        const init = JSON.parse("{}");
        init.method = "POST";

        if (headers){
            init.headers = headers;
        }

        init.body = body;
        

        return await fetch(getServerUrl+url, init)
    

}

export default post;