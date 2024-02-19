import Init from "./Init.class.js";
import Light from "./Light.class.js";
import Camera from "./Camera.class.js";
import Player from "./Player.class.js";

let camera = new Camera();
let player = new Player();
let init = new Init(camera, player);
let light = new Light();
