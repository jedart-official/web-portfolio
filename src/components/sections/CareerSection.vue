<script setup>
import { useMainStore } from "@/stores/main.js";
import { useContent } from "@/composables/useContent.js";
import { useI18n } from "vue-i18n";
import {storeToRefs} from "pinia";

const { t } = useI18n();
const store = useMainStore();
const { isActive } = store;
const {activeTheme} = storeToRefs(store);
const { content } = useContent();

const jobLogo = (job) => {
  if (activeTheme.value === "light") {
    return job.logoLight ?? job.lightLogo ?? job.logo?.light ?? job.logo;
  }

  return job.logoDark ?? job.darkLogo ?? job.logo?.dark ?? job.logo;
};
</script>

<template>
  <section
    v-show="isActive('career')"
    class="screen relative h-full px-5 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col"
  >
    <div data-gsap-reveal class="mb-6">
      <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
        {{ t('career.careerSubTitle') }}
      </p>
      <h2 class="text-2xl sm:text-3xl font-semibold text-cinnabarMain mb-2">
        {{ t('career.careerTitle') }}
      </h2>
      <p class="text-sm text-gray-300 max-w-xl">
        {{ t('career.careerDescription') }}
      </p>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 pb-10 scrollbar-thin">
      <div class="career-timeline relative space-y-6 before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-white/5 sm:before:left-8">
        <div
          v-for="(job, index) in content.career"
          :key="index"
          data-gsap-reveal
          class="relative pl-10 sm:pl-20 group"
        >
          <div class="career-timeline-dot absolute left-[13px] top-2 h-2.5 w-2.5 rounded-full border-2 border-cinnabarMain bg-night z-10 sm:left-[29px] group-hover:scale-125 transition-transform"></div>
          
          <div class="career-card surface-panel rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 transition hover:border-cinnabarMain/30 hover:bg-white/[0.04]">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div class="flex items-start gap-4">
                <div v-if="jobLogo(job)" class="career-logo h-12 w-12 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 flex items-center justify-center overflow-hidden">
                   <img :src="jobLogo(job)" :alt="job.company" class="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity">
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-100 leading-snug">{{ job.company }}</h3>
                  <p class="text-cinnabarMain font-medium text-sm mt-0.5">{{ job.role }}</p>
                </div>
              </div>
              <div class="text-left sm:text-right flex flex-col items-start sm:items-end">
                <span class="career-duration text-xs font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 whitespace-nowrap">
                  {{ job.duration }}
                </span>
                <span class="text-[10px] uppercase tracking-wider text-gray-500 mt-2">
                  {{ job.period }}
                </span>
              </div>
            </div>

            <ul class="space-y-3">
              <li 
                v-for="(task, idx) in job.tasks" 
                :key="idx"
                class="career-task flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
              >
                <span class="career-task-dot mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cinnabarMain/40"></span>
                <span>{{ task }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.surface-panel {
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.3);
}
</style>
