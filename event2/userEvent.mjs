import { userService } from "./service.mjs";
import { eventEmitter } from "./event.mjs";

eventEmitter.on("test", (i) => {
  console.log("escutando", i, eventEmitter.listenerCount("test"));

  userService.execute("escutando" + i);
});
