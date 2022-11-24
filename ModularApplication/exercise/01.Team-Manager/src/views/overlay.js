import { html } from "../../node_modules/lit-html/lit-html.js";

  const overlayTemplate = message => html` <div class="overlay">
    <div class="modal">
      <p>${message}</p>
      <a href="/error" class="action">Action</a>
    </div>
  </div>`;
  
export function showOverlay(ctx) {
}
