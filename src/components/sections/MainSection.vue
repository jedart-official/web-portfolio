<script setup>
import {useMainStore} from "@/stores/main.js";
import {useContent} from "@/composables/useContent.js";
import {useI18n} from "vue-i18n";


const {t} = useI18n();
const {isActive, setScreen} = useMainStore();
const {content} = useContent();
</script>

<template>
  <section v-show="isActive('home')" class="screen relative h-full px-5 sm:px-6 lg:px-10 py-6 lg:py-8">
    <div class="grid grid-cols-1 lg:grid-cols-[1.6fr,1.1fr] gap-6 lg:gap-10">
      <div class="flex flex-col justify-between gap-6">
        <div>
          <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-3">
            {{ t('main.aboutSubTitle') }}
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-cinnabarMain mb-4">
            {{ t('main.aboutTitle') }}
          </h1>
          <p class="text-sm leading-relaxed text-gray-300 max-w-xl">
            {{ t('main.aboutDescription') }}
          </p>

          <div class="mt-5 sm:mt-6 flex flex-wrap gap-3">
            <a href="#"
               class="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-cinnabarMain text-sm font-medium hover:brightness-110 transition">
              {{ t('main.downloadCV') }}
            </a>
            <button
                @click="setScreen('projects')"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-600 text-sm hover:border-cinnabarMain hover:text-cinnabarMain transition">
              {{ t('main.viewProjects') }}
            </button>
            <button
                @click="setScreen('stack')"
                class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-transparent text-sm text-gray-300 hover:text-palette2 hover:border-palette2/60 transition">
              {{ t('main.checkStack') }}
            </button>
          </div>
        </div>
      </div>


      <div class="flex flex-col gap-4 sm:gap-6">
        <div class="rounded-xl bg-[#11151b] border border-[#252a33] p-4">

          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold"> {{ t('main.stackExperience') }}</h2>
            <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gray-500">{{ t('main.overview') }}</span>
          </div>

          <div class="space-y-3 text-[11px]">
            <div v-for="bar in content.skillsBar" :key="bar.label" class="flex items-center gap-3">
              <span class="w-20 text-gray-400">{{ bar.label }}</span>
              <div class="flex-1 h-2 rounded-full bg-[#1a1f27] overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cinnabarMain via-palette3 to-palette5"
                     :style="{width: bar.width, backgroundImage: 'linear-gradient(to right, #ED5E1F, #5CDB95, #379683)' }"
                ></div>
              </div>
              <span class="w-10 text-gray-400 text-right">{{ bar?.note }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="mt-4 lg:mt-4">
      <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
        {{ t('main.whatIDo') }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
        <button
            v-for="card in content.homeCards"
            :key="card.title"
            @click="setScreen(card.target)"
            class="text-left rounded-xl bg-[#15191f] border border-[#262a33] p-3 hover:border-cinnabarMain/80 hover:-translate-y-0.5 transition"
        >
          <span class="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-1">
            {{ card.tag }}
          </span>
          <span class="block text-sm font-medium mb-2">
            {{ card.title }}
          </span>
          <span class="block text-[11px] text-gray-400">
            {{ card.subtitle }}
          </span>
        </button>
      </div>
    </div>

  </section>
</template>
