import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

interface TextData {
    quote: string;
    source_ids: string[] | undefined;
    detail: string | undefined;
}

function parseQuote(quote: string, id: number): TextData | null {
    const regex = /\[(\d+)\]/g;
    let match = regex.exec(quote);
    const source_ids = [];

    while (match !== null) {
        if (match[1]) {
            source_ids.push(match[1]);
        }
        if (match[2]) {
            source_ids.push(match[2]);
        }
        match = regex.exec(quote);
    }

    const detailMatch = quote.match(/\((.*?)\)/);
    const detail = detailMatch ? detailMatch[1] : undefined;

    const parsedQuote = {
        id,
        quote: quote.replace(regex, "").trim(),
        source_ids: source_ids.length > 0 ? source_ids : undefined,
        detail
    };

    return parsedQuote.quote ? parsedQuote : null;
}


(async () => {
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
        const document = new DOMParser().parseFromString(htmlString, "text/html",);
        const quotesParent = document && document.querySelector("#mw-content-text > div.mw-parser-output");
        const quotes: string[] = [];
        quotesParent?.childNodes.forEach((quoteNode) => {
            if (quoteNode.nodeName === "UL") {
                const ul = quoteNode;
                ul.childNodes.forEach((li) => {
                    if (typeof li !== undefined && li.textContent !== "\n") {
                        quotes.push(li.textContent);
                    }
                })
            }
        })
        const quoteData = quotes.map((quote, index) => parseQuote(quote, index + 1));
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(quoteData ?? [], null, 2));
        Deno.writeFile("data/quotes.json", data, { create: true })
    } catch (error) {
        throw error;
    }
})();