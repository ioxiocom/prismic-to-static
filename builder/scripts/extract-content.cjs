/*
 * Script to extract the Prismic page contents to their most basic HTML form
 *
 * - Reads all `*.html` files recursively from the `build` directory
 * - Parses the HTML and extracts only the HTML from within the first <main> element
 * - Saves it to `*.extracted.html` in the same directory the file was found in
 */

const fs = require("fs")

const { globSync } = require("glob")
const jsdom = require("jsdom")

// Find the contents of <main> from a piece of HTML text and return only that
function extractMain(htmlText) {
  const dom = new jsdom.JSDOM(htmlText)
  const main = dom.window.document.querySelector("main")
  return main.innerHTML
}

function extractFile(srcPath) {
  const sourceHtml = fs.readFileSync(srcPath, { encoding: "utf-8", flag: "r" })
  const extractedHtml = extractMain(sourceHtml)
  const dstPath = srcPath.replace(/\.html$/, ".extracted.html")
  fs.writeFileSync(dstPath, extractedHtml, { encoding: "utf-8", flag: "w" })

  console.log(`Extracted ${srcPath} to ${dstPath}`)
}

function extractAllFiles() {
  const htmlSources = globSync("build/**/*.html")

  for (let srcPath of htmlSources) {
    if (srcPath.endsWith(".extracted.html")) {
      continue
    }

    extractFile(srcPath)
  }
}

extractAllFiles()
