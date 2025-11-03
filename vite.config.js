import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";
import devtools from "solid-devtools/vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
    plugins: [devtools(), solidPlugin(), tailwindcss(), solidSvg()],
    server: {
        port: 3000,
    },
    build: {
        target: "esnext",
    },
    resolve: {
        alias: {
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@flows": fileURLToPath(new URL("./src/flows", import.meta.url)),
            "@actors": fileURLToPath(new URL("./src/actors", import.meta.url)),
            "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        },
    },
});
