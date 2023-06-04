/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"dvbJAbOewUTtaLqq","label":"Honkai: Star Rail","bookmarks":[{"id":"pF53U4UfzUdUqb9A","label":"prydwen","url":"https://www.prydwen.gg/star-rail/"},{"id":"7zCv0Fxaa8DoZhpm","label":"planet","url":"https://act.hoyolab.com/sr/app/interactive-map/index.html#/map/38?shown_types=24,49,306,2,3,4,5,6,7,8,9,10,11,12,134,135,195,196,230&center=0.50,3.00&zoom=0.00"}]},{"id":"ZpuYdWxCmYytQZf7","label":"Genshin Impact","bookmarks":[{"id":"2lH4T71fc1NMComS","label":"seelie","url":"https://seelie.me./"},{"id":"1xCGrJTRBZpPyZzk","label":"map","url":"https://act.hoyolab.com/ys/app/interactive-map/index.html?lang=en-us#/map/2?shown_types=&center=541.00,-246.00&zoom=-2.00"}]},{"id":"B4yiel0NEnrFHeyN","label":"Arknights","bookmarks":[{"id":"tGkSXYs1R47Ke7hZ","label":"aceship","url":"https://aceship.github.io/AN-EN-Tags/index.html"},{"id":"9T7YTtvPzHwGOVGZ","label":"characters","url":"https://gamepress.gg/arknights/tier-list/arknights-operator-tier-list"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
