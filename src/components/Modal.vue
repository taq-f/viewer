<template>
  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <img :src="src">
      </section>
      <footer class="modal-card-foot">
        <a class="button">
          <span class="icon is-small">
            <i class="fas fa-external-link-alt"></i>
          </span>
          <span>Open</span>
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { getImageURL } from "@/lib/image.service";

@Component
export default class Modal extends Vue {
  active = false;
  image = undefined;
  format = "";

  get src() {
    if (this.image) {
      return getImageURL(this.image, this.format);
    } else {
      return ""; // TODO no image
    }
  }

  open(image, format) {
    this.image = image;
    this.format = format;
    const el = document.createElement("div");
    document.body.appendChild(el);
    this.$mount(el);

    this.active = true;
  }

  close() {
    this.active = false;
  }
}
</script>

