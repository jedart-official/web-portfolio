<script setup>

import MainHeader from "@/components/MainHeader.vue";
import MainSection from "@/components/sections/MainSection.vue";
import StackSection from "@/components/sections/StackSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import CareerSection from "@/components/sections/CareerSection.vue";
import MainFooter from "@/components/MainFooter.vue";
import {computed, onMounted} from "vue";
import {useMainStore} from "@/stores/main.js";
import {storeToRefs} from "pinia";



const store = useMainStore();
const {activeScreen, showDown, scroller, themeClass} = storeToRefs(store);
const {onScroll} = store;


function scrollToBottom() {
  const el = scroller.value;
  if (!el) return;
  el.scrollTo({top: el.scrollHeight, behavior: "smooth"});
}


const currentSection = computed(() => {
  const map = {
    home: MainSection,
    stack: StackSection,
    projects: ProjectsSection,
    career: CareerSection,
  };

  return map[activeScreen.value] ?? MainSection;
});

onMounted(() => {
  onScroll();
});

</script>

<template>
  <div
      :class="themeClass"
      class="app-shell w-full max-w-6xl mx-0 lg:mx-4 bg-night lg:rounded-2xl shadow-2xl border border-[#181a1f] flex flex-col overflow-hidden font-sans min-h-[620px] lg:h-[640px]"
  >
    <MainHeader></MainHeader>

    <div @scroll.passive="onScroll" ref="scroller" class="app-scrollbar relative flex-1 overflow-y-auto">
      <div class="relative min-h-full">
        <div
            class="ambient-layer pointer-events-none hidden lg:block absolute inset-0 opacity-40 z-0"
            style="
        background-image:
          radial-gradient(circle at 10% 20%, rgba(255,255,255,0.18) 0, transparent 44%),
          radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06) 0, transparent 55%),
          radial-gradient(circle at 50% 100%, rgba(255,255,255,0.05) 0, transparent 55%);
        mix-blend-mode: screen;
      "
        ></div>

        <div class="relative z-10 lg:mt-0 mt-24">

            <Transition
                mode="out-in"
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
              <component :is="currentSection" :key="activeScreen" />
            </Transition>


        </div>
      </div>
      <button
          type="button"
          @click="scrollToBottom"
          aria-label="Прокрутить вниз"
          :class="[
        'absolute bottom-4 right-4 z-20',
        'hidden h-10 w-10 lg:grid place-items-center rounded-full',
        'scroll-down-button bg-[#15191f] backdrop-blur border border-white/15 shadow-lg',
        'text-white hover:bg-[#15191f]/80 active:scale-95 transition',
        'focus:outline-none focus:ring-2 focus:ring-white/30',
  showDown
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-1'
      ]"
      >
        <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
          <path d="M12 5v12"/>
          <path d="M7 13l5 5 5-5"/>
        </svg>
      </button>
    </div>

    <MainFooter></MainFooter>
  </div>
</template>
