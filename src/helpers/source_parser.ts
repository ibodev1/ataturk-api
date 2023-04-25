import type { Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { Source } from "../types/index.ts"
import getDocument from '../utils/document.ts';

const safeText = (str: string) => {
    return str.replace(/↑/g, "").trim();
}

function parseUrl(htmlString: string): string | undefined {
    const regex = /<a\s+[^>]*class="external text"[^>]*\s+href=["']([^"']+)["']/i;
    const match = htmlString.match(regex);
    return match ? match[1] : undefined;
}

const respondSource = (li: Element, id: number): Source => {
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
        const document = await getDocument();
        const sourcesParent = document && document.querySelector("#mw-content-text > div.mw-parser-output > div.reflist > div > ol");
        if (sourcesParent?.children) {
            const sources: Source[] = [];
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