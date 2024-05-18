<template>
    <div v-if="showModal" class="fixed  inset-0 z-50 flex items-center justify-center bg-opacity-75">
        <div class="relative bg-green-100 rounded-lg  p-4 max-w-full max-h-full   overflow-hidden">
            <button 
            @click="closeModal"
            class="absolute top-0 right-0 m-2 text-yellow-300"
            >
            X Fermer
            </button>
            <div v-if="mediaType === 'image'" class="flex justify-center">

                <img 
                :src="mediaSrc" 
                :alt="mediaAlt"
                class="max-w-full max-h-full"
                >
            </div>
            <div v-else-if="mediaType === 'video'" class="aspect-w-16 aspect-h-9">

                <iframe 
                :src="mediaSrc" 
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full "
                >
            </iframe>
        </div>
            

            

        </div>
    </div>
</template>
<script>

export default {
    name: 'ModalMedia',
    props: {
        showModal: {
            type: Boolean,
            required:true
        },
        mediaSrc: {
            type: String,
            required:true
        },
        mediaAlt: {
            type: String,
            required:true
        },
        mediaType: {
            type: String,
            required:true
        }
       
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
    
}
</script>
<style lang="">
    
</style>