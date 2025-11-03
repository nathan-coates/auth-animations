/**
 * @typedef {import("solid-js/store").SetStoreFunction} SetStoreFunction
 */

/**
 * @param {SetStoreFunction} set
 */
export const addClientId = (set) => {
    set("client_id", "client_12345");
};

/**
 * @param {SetStoreFunction} set
 */
export const addRedirectUri = (set) => {
    set("redirect_uri", "https://clientapp.com/callback");
};

/**
 * @param {SetStoreFunction} set
 */
export const addState = (set) => {
    set("state", "xyzABC123");
};

/**
 * @param {SetStoreFunction} set
 */
export const addCodeChallenge = (set) => {
    set("code_challenge", "E9Melhoa2OwvF...");
};

/**
 * @param {SetStoreFunction} set
 */
export const addCodeChallengeMethod = (set) => {
    set("code_challenge_method", "S256");
};

/**
 * @param {SetStoreFunction} set
 */
export const addCode = (set) => {
    set("code", "SplxlOBeZQQYbYS6WxSbIA");
};

/**
 * @param {SetStoreFunction} set
 */
export const addCodeVerifier = (set) => {
    set("code_verifier", "dBjftJeZ4CVP...");
};

/**
 * @param {SetStoreFunction} set
 */
export const addAccessToken = (set) => {
    set("access_token", "eyJhbGciOiOiJ...");
};

/**
 * @param {SetStoreFunction} set
 */
export const addRefreshToken = (set) => {
    set("refresh_token", "8xLOxBtZp8");
};

/**
 * @param {SetStoreFunction} set
 */
export const addExpiresIn = (set) => {
    set("expires_in", 3600);
};

/**
 * @param {SetStoreFunction} set
 */
export const addTokenTypeAndScope = (set) => {
    set("token_type", "Bearer");
    set("scope", "read write");
};
