<template>
  <transition name="fade">
    <div class="frame">
      <div class="name">
        {{ image.name }}
      </div>
      <div class="formats">
        <gallery-link text="PNG" :asLink="image.formats.includes('png')" @click="$emit('click', image, 'png')"></gallery-link> |
        <gallery-link text="JPEG" :asLink="image.formats.includes('jpg')" @click="$emit('click', image, 'jpg')"></gallery-link>
      </div>
      <div class="thumbnail">
        <img :src="src">
      </div>
    </div>
  </transition>
</template>

<script>
import GalleryLink from "@/components/GalleryLink.vue";
import { getThumbnail } from "@/lib/image.service";

export default {
  components: {
    GalleryLink
  },
  props: {
    image: Object
  },
  data() {
    return {
      thumbnail: ""
    };
  },
  computed: {
    src() {
      if (this.thumbnail) {
        return `data:image/png;base64,${this.thumbnail}`;
      } else {
        return "loading.png";
      }
    }
  },
  async mounted() {
    const data = await getThumbnail(this.image.id);
    this.thumbnail = data.thumbnail;
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.frame {
  font-size: 100%;
  padding: 15px;
}

.name {
  text-align: center;
}

.formats {
  margin-top: 5px;
  font-size: 80%;
  text-align: center;
}

.thumbnail {
  margin-top: 15px;
}
</style>

