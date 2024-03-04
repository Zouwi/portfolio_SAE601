
export const Z = 'z'
export const Q = 'q'
export const S = 's'
export const D = 'd'
export const SHIFT = 'shift'
export const DIRECTIONS = [Z, Q, S, D]
export class Controls {
    constructor() {
        this.map = new Map();

        const z = document.querySelector(".svgZ");
        const q = document.querySelector(".svgQ");
        const s = document.querySelector(".svgS");
        const d = document.querySelector(".svgD");
        const shift = document.createElement("div");

        this.map.set(Z, z);
        this.map.set(Q, q);
        this.map.set(S, s);
        this.map.set(D, d);
        this.map.set(SHIFT, shift);

        this.updatePosition();

        this.map.forEach((v, _) => {
            document.body.append(v);
        });
    }

    updatePosition() {
        this.map.get(SHIFT).style.top = `${window.innerHeight - 100}px`

        this.map.get(SHIFT).style.left = `${50}px`
    }

    down (key) {
        if (key) {
            document.querySelector("#touch"+key.toUpperCase()+">*").classList.add("svgChange");
        }
    }

    up (key) {
        if (key) {
            document.querySelector("#touch"+key.toUpperCase()+">*").classList.remove("svgChange");
        }
    }
}

export default Controls;