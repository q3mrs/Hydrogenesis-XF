import { getObfId, getRoute } from "./obf-helpers";

function isUrl(val = ""): boolean {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && !val.includes(" "));
}

const initHome = () => {
  const searchUrl = localStorage.getItem("engine") || "https://duckduckgo.com/?q=";
  const input = document.getElementById(getObfId("search")) as HTMLInputElement | null;
  const tagline = document.getElementById(getObfId("tagline"));

  if (tagline) {
    const messages = [
      "youtube will be added soon.",
      "yeah it just works.",
      "fast enough for you?",
      "fuck fortinet",
      "panic button ready. just in case.",
      "browse stuff.",
    ];
    const pick = messages[Math.floor(Math.random() * messages.length)];
    tagline.textContent = pick;
    tagline.classList.remove("opacity-0");
  }

  if (input && !input.dataset.bound) {
    input.dataset.bound = "true";
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        let url = input.value || "";
        if (!isUrl(url)) {
          url = searchUrl + url;
        } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
          url = `https://${url}`;
        }
        sessionStorage.setItem("goUrl", url);
        location.replace(getRoute("tabs"));
      }
    });
  }
};

document.addEventListener("astro:page-load", initHome);
document.addEventListener("DOMContentLoaded", initHome);
if (document.readyState === "interactive" || document.readyState === "complete") {
  initHome();
}
