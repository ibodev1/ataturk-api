import { DOMParser, HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const getDocument = async (): Promise<HTMLDocument | null> => {
    try {
        const fetchHeaders = new Headers();
        const fetchUrl = new URL("https://tr.wikiquote.org/wiki/Mustafa_Kemal_Atat%C3%BCrk");
        fetchHeaders.append("Content-Type", "text/html; charset=UTF-8");
        const response = await fetch(
            fetchUrl,
            {
                headers: fetchHeaders
            }
        );
        const htmlBuffer = await response.arrayBuffer();
        const htmlDecoder = new TextDecoder("utf-8");
        const htmlString = htmlDecoder.decode(htmlBuffer);
        const document = new DOMParser().parseFromString(htmlString, "text/html");
        return document ?? null;
    } catch (error) {
        throw error;
    }
}

export default getDocument;