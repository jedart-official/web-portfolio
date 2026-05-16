<script setup>
  import {useMainStore} from "@/stores/main.js";
  import {useContent} from "@/composables/useContent.js";
  import {useI18n} from "vue-i18n";
  import {storeToRefs} from "pinia";

  const {t} = useI18n();
  const store = useMainStore();
  const {isActive, setScreen, setLang} = store;
  const {locale} = storeToRefs(store)
  const {content} = useContent();



</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-night z-100 lg:static px-5 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#20242b]">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-cinnabarMain flex items-center justify-center overflow-hidden">
        <img src="/profile.webp" alt="Profile" class="w-full h-full object-cover"/>
      </div>
      <div class="flex flex-col">
        <span class="text-xs uppercase tracking-[0.24em] text-gray-400">web developer</span>
      </div>
      <div class="ml-auto flex sm:hidden items-center rounded-full border border-white/10 bg-[#15191f] p-1">
        <button
            type="button"
            @click="setLang('ru')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full transition"
            :class="locale === 'ru' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          RU
        </button>
        <span class="px-1 text-gray-600 text-[10px] select-none">|</span>
        <button
            type="button"
            @click="setLang('en')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full transition"
            :class="locale === 'en' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          EN
        </button>
      </div>
    </div>

    <div class="flex gap-8">
      <nav class="flex gap-4 sm:gap-6 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-gray-400 overflow-x-auto pb-1">

        <button
            v-for="item in content.navbar"
            :key="item.id"
            @click="setScreen(item.id)"
            class="nav-btn whitespace-nowrap transition-colors"
            :class="isActive(item.id) ? 'text-gray-200' : 'text-gray-400 hover:text-palette2'"
        >
          {{ t(item.label)  }}
        </button>
      </nav>
      <div class="hidden sm:flex items-center rounded-full border border-white/10 bg-[#15191f] p-1">
        <button
            type="button"
            @click="setLang('ru')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full transition"
            :class="locale === 'ru' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          RU
        </button>
        <span class="px-1 text-gray-600 text-[10px] select-none">|</span>
        <button
            type="button"
            @click="setLang('en')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full transition"
            :class="locale === 'en' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          EN
        </button>
      </div>
    </div>

  </header>
</template>
