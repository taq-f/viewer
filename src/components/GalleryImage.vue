<template>
  <div>
    <div class="name">
      {{ name }}
    </div>
    <div class="formats">
      PNG | JPEG
    </div>
    <div>
      <img :src="src" alt="" srcset="">
    </div>
  </div>
</template>

<script>
import { getThumbnail } from "@/lib/image.service";

export default {
  props: {
    id: String,
    name: String,
    formats: Array
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
    const data = await getThumbnail(this.id);
    this.thumbnail = data.thumbnail;
  }
};
</script>

<style lang="scss" scoped>
.name {
  text-align: center;
}
.formats {
  text-align: center;
}
</style>

