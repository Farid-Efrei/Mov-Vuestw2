<template>
  <footer class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <!-- Logo and Text -->
      <div class="flex items-center space-x-4">
        <img src="@/assets/Capture.png" alt="Logo" class="h-24 w-auto" />
        <span>© 2024 Popcorn's, le site dédié au cinéma Populaire. All rights reserved.</span>
      </div>

      <!-- Contact Link -->
      <div>
        <a href="/contact" class="hover:text-gray-300">Contact</a>
      </div>

      <!-- Social Media Icons -->
      <div class="flex space-x-4">
        <a href="https://facebook.fr" target="_blank" class="hover:text-gray-300">
          <img src="@/assets/facebook.png" alt="Facebook" class="h-6 w-6" />
        </a>
        <a href="https://twitter.com" target="_blank" class="hover:text-gray-300">
          <img src="@/assets/twitter.png" alt="Twitter" class="h-6 w-6" />
        </a>
        <a href="https://instagram.com" target="_blank" class="hover:text-gray-300">
          <img src="@/assets/insta.jpg" alt="Instagram" class="h-6 w-6" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterCompo'
}
</script>

<style scoped>
/* Tu peux ajouter des styles spécifiques ici si nécessaire */
</style>
