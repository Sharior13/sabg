import { initiateSocket } from "./socket.js";
import { initiateRender } from "./renderer.js";
import { initiateInput } from "./input.js";

initiateSocket(initiateInput());
initiateRender();