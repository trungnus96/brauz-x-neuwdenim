export function loadScript(url = "", callback = () => {}) {
  if (url) {
    const type = `text/javascript`;
    // check if script loaded already?
    const duplicated_scripts = document.querySelectorAll(
      `script[type="${type}"][src="${url}"]`
    );
    if (duplicated_scripts.length > 0) {
      callback();
    } else {
      const script = document.createElement("script");
      script.setAttribute("type", type);
      script.setAttribute("src", url);
      document.body.appendChild(script);
      script.onload = callback;
    }
  }
}
