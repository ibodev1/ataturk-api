import { DOMParser, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";


interface SourceData {
    id: number | undefined;
    source: string;
    url: string | undefined;
}

const safeText = (str: string) => {
    return str.replace(/↑/g, "").trim();
}

function parseUrl(htmlString: string): string | undefined {
    const regex = /<a\s+[^>]*class="external text"[^>]*\s+href=["']([^"']+)["']/i;
    const match = htmlString.match(regex);
    return match ? match[1] : undefined;
}

const respondSource = (li: Element, id: number): SourceData => {
    const source = safeText(li.textContent);
    const url = parseUrl(li.outerHTML);
    return {
        id,
        source,
        url
    }
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
        const sourcesParent = document && document.querySelector("#mw-content-text > div.mw-parser-output > div.reflist > div > ol");
        if (sourcesParent?.children) {
            const sources: SourceData[] = [];
            let i = 1;
            for (const li of sourcesParent?.children) {
                sources.push(respondSource(li, i++));
            }
            const encoder = new TextEncoder();
            const data = encoder.encode(JSON.stringify(sources ?? [], null, 2));
            Deno.writeFile("data/sources.json", data, { create: true })
        }
    } catch (error) {
        throw error;
    }
})();