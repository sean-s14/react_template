const isMoreThanOneCookie = (cookies) => {
    return cookies.split(" ").length > 1;
}

const extractTypeAndVal = (cookie) => {
    console.log("Cookie :", cookie);
    const cookieArr = cookie.split("=");
    const name = cookieArr[0];
    const value = cookieArr[1];
    const nameArr = name.split(".");
    const social = nameArr[0];
    const isToken = nameArr[1] === "aToken";
    if (!isToken) return { type: null, val: null };
    return { name: name, type: social, val: value };
}

/**
 * The following assumes that the document.cookie name will be in the form: social.aToken
 * Whereby "social" is the type
 * @example { type: 'google', val: 's%3A1%2F%2F03js_tzwvo1GVCgYIARAAGAMS...' }
 * @returns { type: 'type', val: '###' }
 */
const getCookieInfo = () => {
    let default_cookie = {name:null, type: null, val: null};
    if (!document.cookie) return default_cookie;
    let cookie_info;
    try{
        const cookies = document.cookie.split(" ");
        if (cookies.length === 1) {
            cookie_info = extractTypeAndVal(cookies[0]);
        } else if (cookies.length > 1) {
            cookies.forEach(cookie => {
                cookie_info = extractTypeAndVal(cookie);
            });
        } else {
            throw new Error(```
                Could not split cookie with type 
                ${typeof document.cookie} and value of 
                ${JSON.stringify(document.cookie)}
            ```);
        }
    } catch(e) {
        console.error(e);
        return default_cookie;
    }
    return cookie_info;
}

const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export { isMoreThanOneCookie, getCookieInfo, deleteCookie };