import { eventEmitter } from "./event.mjs";
eventEmitter.setMaxListeners(100);

import "./userEvent.mjs";

for (let i = 0; i < 1000000000000000000000; i++) {
  eventEmitter.emit("test", i);
}
