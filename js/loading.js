const overlay = document.querySelector("#overlay");

const show = () => overlay.style.setProperty("display", "block");
const hide = () => overlay.style.setProperty("display", "none");

export default {show, hide};