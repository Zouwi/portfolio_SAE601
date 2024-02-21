import * as THREE from 'three';
import Config from './Config.class.js';

export const Z = 'z'
export const Q = 'q'
export const S = 's'
export const D = 'd'
export const SHIFT = 'shift'
export const DIRECTIONS = [Z, Q, S, D]
class Character {
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



        this.map.forEach((v, k) => {
            //v.appendChild(document.querySelector(".svgZ"));
            /*v.style.color = 'blue';
            v.style.fontSize = '50px';
            v.style.fontWeight = '800';
            v.style.position = 'absolute';
            v.textContent = k;*/
        });

        this.updatePosition();

        this.map.forEach((v, _) => {
            document.body.append(v);
        });
    }

    updatePosition() {
        //this.map.get(Z).style.top = `${window.innerHeight - 150}px`
        //this.map.get(Q).style.top = `${window.innerHeight - 100}px`
        //this.map.get(S).style.top = `${window.innerHeight - 100}px`
        //this.map.get(D).style.top = `${window.innerHeight - 100}px`
        this.map.get(SHIFT).style.top = `${window.innerHeight - 100}px`

        //this.map.get(Z).style.left = `${200}px`
        //this.map.get(Q).style.left = `${200}px`
        //this.map.get(S).style.left = `${300}px`
        //this.map.get(D).style.left = `${400}px`
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

export default Character;