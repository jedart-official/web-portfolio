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
import gsap from "gsap";



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

const prefersReducedMotion = () => {
  return typeof window !== "undefined"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const revealTargets = (el) => gsap.utils.toArray(el.querySelectorAll("[data-gsap-reveal]"));
const progressTargets = (el) => gsap.utils.toArray(el.querySelectorAll("[data-gsap-progress]"));

const beforeSectionEnter = (el) => {
  if (prefersReducedMotion()) {
    return;
  }

  gsap.set(el, {autoAlpha: 0});
  gsap.set(revealTargets(el), {autoAlpha: 0, y: 18});
  gsap.set(progressTargets(el), {scaleX: 0, transformOrigin: "left center"});
};

const sectionEnter = (el, done) => {
  const targets = revealTargets(el);
  const progress = progressTargets(el);

  if (prefersReducedMotion()) {
    gsap.set([el, ...targets, ...progress], {clearProps: "all"});
    done();
    return;
  }

  const timeline = gsap.timeline({
    defaults: {ease: "power3.out"},
    onComplete: () => {
      gsap.set([el, ...targets, ...progress], {clearProps: "transform,opacity,visibility"});
      done();
    },
  });

  timeline
      .to(el, {autoAlpha: 1, duration: 0.16, ease: "power1.out"})
      .to(targets, {autoAlpha: 1, y: 0, duration: 0.56, stagger: 0.055}, 0.04)
      .to(progress, {scaleX: 1, duration: 0.7, stagger: 0.035, ease: "power2.out"}, 0.16);
};

const sectionLeave = (el, done) => {
  if (prefersReducedMotion()) {
    done();
    return;
  }

  gsap.set(el, {display: ""});
  gsap.to(el, {
    autoAlpha: 0,
    y: -8,
    duration: 0.18,
    ease: "power1.in",
    onComplete: done,
  });
};

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
                appear
                :css="false"
                @before-enter="beforeSectionEnter"
                @enter="sectionEnter"
                @leave="sectionLeave"
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
