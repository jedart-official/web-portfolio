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
      <a  target="_blank" :href="'malto:' + content.contacts.email">
        <span>✉️<span class="text-gray-200">{{ content.contacts.email }}</span>
      </span>
      </a>
      <a target="_blank" :href="'https://t.me/' + content.contacts.telegram">
        <span>💬 <span class="text-gray-200">{{ content.contacts.telegram }}</span></span>
      </a>
      <a target="_blank" :href="'https://github.com/' + content.contacts.github">
      <span>🌐 <span class="text-gray-200">{{ content.contacts.github }}</span></span>
      </a>
    </div>
  </footer>
</template>

