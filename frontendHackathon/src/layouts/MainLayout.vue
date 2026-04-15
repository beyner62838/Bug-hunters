<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'

const route = useRoute()
const isSidebarOpen = ref(false)

const pageTitle = computed(() => route.meta?.title ?? 'RedAlimenta')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-hero-mesh opacity-90"></div>
    <div class="flex min-h-screen">
      <AppSidebar :is-open="isSidebarOpen" @close="closeSidebar" />
      <div class="flex min-h-screen min-w-0 flex-1 flex-col">
        <AppHeader :title="pageTitle" @toggle-sidebar="toggleSidebar" />
        <main class="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
