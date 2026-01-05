import { initiateSocket } from "./socket.js";
import { initiateRender, setMap } from "./renderer.js";
import { initiateInput } from "./input.js";

initiateSocket(setMap, initiateInput());
initiateRender();