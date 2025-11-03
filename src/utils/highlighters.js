/**
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
function highlightedJSONString(key, value) {
    return `<div class="ml-8"><span class="${key} font-extrabold">"${key}"</span>: <span class="payload_value">"${value}"</span>,</div>`;
}

/**
 * @param {string} key
 * @param {number} value
 * @returns {string}
 */
function highlightedJSONNumber(key, value) {
    return `<div class="ml-8"><span class="${key} font-extrabold">"${key}"</span>: <span class="payload_value">${value}</span>,</div>`;
}

/**
 * @param {object} obj
 * @returns {string}
 */
export function generateHighlightedJSON(obj) {
    let htmlString = "<div>{</div>";

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "number") {
            htmlString += highlightedJSONNumber(key, value);
        } else {
            htmlString += highlightedJSONString(key, value);
        }
    }

    htmlString += `<div>}</div>`;
    return htmlString;
}

/**
 * @param {object} obj
 * @returns {string}
 */
export function generateHighlightedURLParams(obj) {
    let htmlString = "";

    Object.entries(obj).forEach(([key, value], index) => {
        const prefix = index !== 0 ? "&" : "";
        htmlString +=
            `<div>${prefix}<span class="${key} font-extrabold">${key}</span>=<span class="payload_value">${value}</span></div>`;
    });

    return htmlString;
}

/**
 * @param {object} obj
 * @returns {string}
 */
export function generateHighlightedHeaders(obj) {
    let htmlString = "";

    Object.entries(obj).forEach(([key, value], _index) => {
        htmlString +=
            `<div><span class="${key} font-extrabold">${key}</span>: <span class="payload_value">${value}</span></div>`;
    });

    return htmlString;
}
