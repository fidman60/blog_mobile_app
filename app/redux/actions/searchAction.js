export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CHARGE_MODAL = "CHARGE_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function toggleModalAction() {
    return {
        type: TOGGLE_MODAL,
    }
}

export function chargeModal(navigation) {
    return {
        type: CHARGE_MODAL,
        value: navigation
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    }
}