export const STORE_AUTH_DATA = "STORE_AUTH_DATA";
export const STORE_USER_IMAGE = "STORE_USER_IMAGE";

export function storeUserDataAction(authData) {
    return {
        type: STORE_AUTH_DATA,
        value: authData
    }
}

export function storeUserImageAction(source) {
    return {
        type: STORE_USER_IMAGE,
        value: source,
    }
}