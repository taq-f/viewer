<template>
  <div class="gallery-wrapper">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search..." v-on:keyup="searchTermChange.next($event.target.value)">
      <span class="icon is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
    <div class="gallery">
      <div class="image-container" v-for="image of images" :key="image._id">
        <gallery-image
          :image="image"
          @click="showImage"></gallery-image>
      </div>
    </div>
    <!-- <modal :image="image" :format="format"></modal> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import GalleryImage from "@/components/GalleryImage.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: { GalleryImage, Modal },
  data() {
    return {
      searchTermChange: new Subject()
    };
  },
  computed: mapState({
    images: state => state.images
  }),
  methods: {
    ...mapActions(["loadImages"]),
    showImage(image, format) {
      new Modal().open(image, format);
    }
  },
  mounted() {
    this.loadImages();
    this.searchTermChange
      .asObservable()
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(v => {
        this.loadImages(v);
      });
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

.image-container {
  margin-left: 10px;
  margin-top: 10px;
}
</style>



