import os from "os";
import http from "http";
import { exec, spawn } from "child_process";

const url = "http://localhost:8080";

function openChrome() {
    const platform = os.platform();
    let command = "";

    if (platform === "darwin") {
        command = `open -n -a "Google Chrome" --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security ${url}`;
    } else if (platform === "win32") {
        const chromePath = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"`;
        command = `${chromePath} --user-data-dir="C:\\chrome_dev_test" --disable-web-security ${url}`;
    } else if (platform === "linux") {
        command = `google-chrome --user-data-dir="/tmp/chrome_dev_test" --disable-web-security ${url}`;
    } else {
        console.error("Unsupported OS.");
        return;
    }

    exec(command, (err) => {
        if (err) console.error("Failed to launch Chrome:", err);
    });
}

function waitForServerAndOpenChrome() {
    const check = () => {
        http.get(url, () => {
            console.log("✅ Vite server is ready, opening Chrome...");
            openChrome();
        }).on("error", () => {
            setTimeout(check, 1000);
        });
    };
    check();
}

function startVite() {
    const vite = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['vite'], {
        stdio: 'inherit'
    });

    waitForServerAndOpenChrome();

    vite.on("close", (code) => {
        console.log(`Vite process exited with code ${code}`);
    });
}

startVite();
