import {BrowserWindow, app} from "electron";
import assert from "assert";
import pie from "./index";

// eslint-disable-next-line sort-imports
import findFreePort from "find-free-port-sync-fixed";
import puppeteer from "puppeteer-core";

const main = async () => {
  const port = findFreePort();

  app.commandLine.appendSwitch(
    "remote-debugging-port",
    `${port}`
  );

  const browser = await pie.connect(
    app,
    puppeteer,
    port
  );

  const window = new BrowserWindow();

  const page = await pie.getPage(
    browser,
    window
  );

  const url = "https://example.com/";
  await window.loadURL(url);
  console.log(page.url());
  assert.equal(
    page.url(),
    url
  );
  window.destroy();
};

main();
