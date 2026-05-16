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
  <header class="fixed top-0 left-0 right-0 bg-night z-100 lg:static px-4 sm:px-6 lg:px-8 py-3 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-[#20242b]">
    <div class="flex w-full items-center justify-between gap-3 sm:w-auto sm:shrink-0">
      <button
          type="button"
          @click="setScreen('home')"
          class="flex min-w-0 items-center gap-3 rounded-xl text-left transition hover:text-cinnabarMain focus:outline-none"
          aria-label="Перейти на главную"
      >
        <div class="h-9 w-9 shrink-0 rounded-full bg-[conic-gradient(from_160deg,#ED5E1F,#5CDB95,#379683,#EDF5E1,#ED5E1F)] p-[2px] shadow-[0_0_18px_rgba(92,219,149,0.28)] sm:h-10 sm:w-10">
          <div class="h-full w-full rounded-full bg-[#15191f] p-[2px]">
            <div class="h-full w-full overflow-hidden rounded-full bg-night">
            <img src="/profile.webp" alt="Profile" class="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
        <div class="flex min-w-0 flex-col">
          <span class="truncate text-[11px] uppercase tracking-[0.22em] text-gray-400 sm:text-xs sm:tracking-[0.24em]">web developer</span>
        </div>
      </button>

      <div class="flex shrink-0 items-center rounded-full border border-white/10 bg-[#15191f] p-1 sm:hidden">
        <button
            type="button"
            @click="setLang('ru')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] rounded-full transition"
            :class="locale === 'ru' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          RU
        </button>
        <span class="px-1 text-gray-600 text-[10px] select-none">|</span>
        <button
            type="button"
            @click="setLang('en')"
            class="px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] rounded-full transition"
            :class="locale === 'en' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200'"
        >
          EN
        </button>
      </div>
    </div>

    <div class="flex w-full min-w-0 items-center gap-4 sm:w-auto sm:justify-end sm:gap-8">
      <nav class="no-scrollbar flex min-w-0 flex-1 gap-4 overflow-x-auto pb-1 text-[11px] uppercase tracking-[0.2em] text-gray-400 sm:flex-none sm:gap-6 sm:overflow-visible sm:text-xs sm:tracking-[0.24em]">

        <button
            v-for="item in content.navbar"
            :key="item.id"
            @click="setScreen(item.id)"
            class="nav-btn uppercase shrink-0 whitespace-nowrap transition-colors"
            :class="isActive(item.id) ? 'text-gray-200' : 'text-gray-400 hover:text-palette2'"
        >
          {{ t(item.label)  }}
        </button>
      </nav>
      <div class="hidden shrink-0 items-center rounded-full border border-white/10 bg-[#15191f] p-1 sm:flex">
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
