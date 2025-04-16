import { envs } from "./config/envs.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(() => {
  main();
})();


async function main() { 
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}