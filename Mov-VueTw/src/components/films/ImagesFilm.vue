<template>
  <div class="container mx-auto border-b-2 border-green-300 pb-4">
    <h2 class="m-7 text-4xl font-semibold underline">Images du Film :</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <div class="mr-2 mt-2" v-for="image in imagesVideo" :key="image.id">
        <img
          :src="videoImages(image)"
          alt="images de la vidéo"
          class="hover:opacity-80 transition ease-in-out duration-150"
          @click="selectMedia(image)"
        />

        <span class="text-lg">Images / Promo officielles</span>
      </div>
    </div>
  </div>
</template>

<script>
import requete from '@/service/api'

export default {
  name: 'ImagesFilm',
  props: {
    imagesVideo: {
      required: true
    }
  },
  methods: {
    videoImages(image) {
      return 'https://image.tmdb.org/t/p/original/' + image.file_path
    },
    selectMedia(image) {
      this.$emit('mediaSelected', {
        mediaSrc: this.videoImages(image),
        mediaAlt: image.file_path,
        mediaType: 'image'
      })
    },

    async axiosImage() {
      try {
        const imagesResponse = await requete.get('/movie/866398/images', {
          params: {
            include_image_language: 'fr',
            language: 'fr'
          }
        })
        const imagee = imagesResponse.data
        console.log(imagee)
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    //console.log(this.imagesVideo)
    this.axiosImage()
  }
}
</script>

<style lang=""></style>
