import Entrance from "./entrance.js";
import Navbar from "./navbar.js";

let entrance = new Entrance();

let navbar = new Navbar();

setTimeout(() => {
    entrance.remove();
}, 5000);