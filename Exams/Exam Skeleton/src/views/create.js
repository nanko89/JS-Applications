import { html } from "../lib.js";
import { create } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const creatTemplate = onCreate => html``;

export async function showCreate(ctx) {
  ctx.render(creatTemplate(createSubmitHandler(onCreate)));

  async function onCreate({}) {
    // //add fields
    //     if(!title || !description){
    //       return alert('All fields are required!');
    //     }
    // //add fields
    //     await create({});
    // //update redirect
    //     ctx.page.redirect('/catalog')
  }
}
