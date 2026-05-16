<script setup>
  import {useMainStore} from "@/stores/main.js";
  import {useContent} from "@/composables/useContent.js";
  import {useI18n} from "vue-i18n";

  const {t} = useI18n();
  const {isActive} = useMainStore();
  const {content} = useContent();
</script>

<template>
  <section v-show="isActive('stack')" class="screen relative h-full px-5 sm:px-6 lg:px-10 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[1.05fr,1.05fr] gap-6">

    <div class="flex flex-col gap-6">
      <div>
        <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
          {{t('stack.stackSubTitle')}}
        </p>
        <h2 class="text-2xl sm:text-3xl font-semibold text-cinnabarMain mb-3">
          {{t('stack.stackTitle')}}
        </h2>
        <p class="text-sm text-gray-300 mb-4">
          {{t('stack.stackDescription')}}
        </p>
      </div>

      <div class="space-y-4 text-sm">
        <div v-for="group in content.skillsTags" :key="group.title">
          <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-1">
            {{ group.title }}
          </p>
          <div class="flex flex-wrap gap-2">
              <span v-for="tag in group.tags" :key="tag" class="px-3 py-1 rounded-full bg-[#151a21] border border-[#27303b] text-xs">
                {{ tag }}
              </span>
          </div>
        </div>


      </div>
    </div>


    <div class="flex flex-col">
      <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
        {{t('stack.visualSkillMap')}}
      </p>
      <div class="grid grid-cols-2 gap-2">
          <div :key="item.id" v-for="item in content.visualSkills" class="rounded-xl bg-[#171c23] border border-[#272e3a] p-3 flex items-center justify-between">
            <span class="text-xs text-gray-300">{{item.title}}</span>
            <span :class="item.badge.bg + ' ' + item.badge.text" class="px-2 py-0.5 rounded-xl text-[10px] font-semibold">{{item.badge.label}}</span>
          </div>
      </div>
    </div>
  </section>
</template>

