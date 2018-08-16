<template>
  <div class="gallery-wrapper">
    <h1>Gallery</h1>
    <div class="gallery">
      <div class="image-container" v-for="image of images" :key="image._id">
        <gallery-image
          :id="image._id"
          :name="image.name"
          :formats="image.formats"></gallery-image>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GalleryImage from "@/components/GalleryImage.vue";

export default {
  components: { GalleryImage },
  computed: mapState({
    images: state => state.images
  }),
  methods: {
    ...mapActions(["loadImages"])
  },
  mounted() {
    this.loadImages();
  }
};
</script>

<style lang="scss" scoped>
.gallery-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
}
</style>



