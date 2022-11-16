import { html, nothing, render } from "./node_modules/lit-html/lit-html.js";
import { contacts as data } from "./contacts.js";

const contacts = data.map(c => Object.assign({}, c, { active: false }));
const root = document.getElementById("contacts");

const contactCard = contact =>
  html` <div class="contact card">
    <div>
      <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${contact.name}</h2>
      <button @click=${onToggle.bind(null, contact)} class="detailsBtn">
        Details
      </button>
      ${contact.active
        ? html` <div class="details" id=${contact.id}>
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
          </div>`
        : nothing}
    </div>
  </div>`;

update();

function update() {
  render(contacts.map(contactCard), root);
}

function onToggle(contact) {
  contact.active = !contact.active;
  render(contacts.map(contactCard), root);
}

//Second decision
// const contactCard = contact =>
//   html` <div class="contact card">
//     <div>
//       <i class="far fa-user-circle gravatar"></i>
//     </div>
//     <div class="info">
//       <h2>Name: ${contact.name}</h2>
//       <button id=${contact.id} class="detailsBtn">Details</button>
//       ${contact.active
//         ? html` <div class="details">
//             <p>Phone number: ${contact.phoneNumber}</p>
//             <p>Email: ${contact.email}</p>
//           </div>`
//         : nothing}
//     </div>
//   </div>`;

// root.addEventListener("click", toggleDetails);
// render(contacts.map(contactCard), root);

// function toggleDetails(e) {
//   if (e.target.classList.contains("detailsBtn")) {
//     const id = e.target.id;
//     const contact = contacts.find(c => c.id == id);
//     contact.active = !contact.active;
//     render(contacts.map(contactCard), root);
//   }
// }
