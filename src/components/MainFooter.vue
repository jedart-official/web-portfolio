<script setup>
import {useI18n} from "vue-i18n";
import {useContent} from "@/composables/useContent.js";

const {t} = useI18n();
const {content} = useContent();
</script>

<template>
  <footer
      class="px-5 sm:px-6 lg:px-8 py-3 sm:py-4 border-t border-[#20242b] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
    <div class="flex flex-wrap items-center gap-3 sm:gap-4">
      <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gray-500">{{t('base.footer.contacts')}}</span>
      <a
          :href="'mailto:' + content.contacts.email"
          class="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-gray-200 transition hover:border-cinnabarMain/70 hover:text-cinnabarMain focus:outline-none focus:ring-2 focus:ring-cinnabarMain/60"
          :aria-label="`Email: ${content.contacts.email}`"
          :title="content.contacts.email"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="m4.75 7 7.25 6 7.25-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="hidden sm:inline">{{ content.contacts.email }}</span>
      </a>
      <a
          target="_blank"
          rel="noopener noreferrer"
          :href="'https://t.me/' + content.contacts.telegram"
          class="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-gray-200 transition hover:border-[#2aabee]/80 hover:text-[#2aabee] focus:outline-none focus:ring-2 focus:ring-[#2aabee]/60"
          :aria-label="`Telegram: ${content.contacts.telegram}`"
          :title="content.contacts.telegram"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.8 4.6 18.5 20c-.2 1-.8 1.2-1.6.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.3 3.7c.9-.3 1.7.2 1.5.9Z"/>
        </svg>
        <span class="hidden sm:inline">{{ content.contacts.telegram }}</span>
      </a>
      <a
          target="_blank"
          rel="noopener noreferrer"
          :href="'https://github.com/' + content.contacts.github"
          class="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-gray-200 transition hover:border-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          :aria-label="`GitHub: ${content.contacts.github}`"
          :title="content.contacts.github"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.2c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1 2.9.8.1-.6.3-1 .6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.6-.3.9 0 1.8.1 2.6.3 2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5 0-5.5-4.5-10-10-10Z"/>
        </svg>
        <span class="hidden sm:inline">{{ content.contacts.github }}</span>
      </a>
    </div>
  </footer>
</template>

