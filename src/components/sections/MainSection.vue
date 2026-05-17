<script setup>
import {computed} from "vue";
import {useMainStore} from "@/stores/main.js";
import {useContent} from "@/composables/useContent.js";
import {useI18n} from "vue-i18n";


const {t} = useI18n();
const {isActive, setScreen} = useMainStore();
const {content} = useContent();

const skillLabelMap = {
  php: "PHP",
  yii2: "Yii2",
  sql: "SQL",
  css: "CSS",
  html: "HTML",
  js: "JS",
  "rest-api": "REST API",
  mysql: "MySQL",
  redis: "Redis",
  queue: "Queue",
  gitlab: "GitLab",
  cache: "Cache",
  git: "Git",
  amocrm: "AmoCRM",
  bootstrap: "Bootstrap",
  vue: "Vue",
  typescript: "TypeScript",
  nuxt: "Nuxt",
  laravel: "Laravel",
  docker: "Docker",
};

const skillIconMap = {
  yii2: {icon: "Y2", iconBg: "#1f6feb", iconColor: "#ffffff", deviconClass: "devicon-yii-plain colored"},
  php: {icon: "php", iconBg: "#777bb4", iconColor: "#ffffff", deviconClass: "devicon-php-plain colored"},
  laravel: {icon: "L", iconBg: "#ff2d20", iconColor: "#ffffff", deviconClass: "devicon-laravel-plain colored"},
  nuxt: {icon: "N", iconBg: "#00dc82", iconColor: "#050608", deviconClass: "devicon-nuxtjs-plain colored"},
  vue: {icon: "V", iconBg: "#42b883", iconColor: "#050608", deviconClass: "devicon-vuejs-plain colored"},
  typescript: {icon: "TS", iconBg: "#3178c6", iconColor: "#ffffff", deviconClass: "devicon-typescript-plain colored"},
  "rest-api": {icon: "API", iconBg: "#ed5e1f", iconColor: "#050608"},
  mysql: {icon: "MY", iconBg: "#00758f", iconColor: "#ffffff", deviconClass: "devicon-mysql-plain colored"},
  sql: {icon: "DB", iconBg: "#379683", iconColor: "#ffffff"},
  redis: {icon: "R", iconBg: "#dc382d", iconColor: "#ffffff", deviconClass: "devicon-redis-plain colored"},
  queue: {icon: "Q", iconBg: "#5cdb95", iconColor: "#050608"},
  cache: {icon: "C", iconBg: "#907163", iconColor: "#ffffff"},
  docker: {icon: "D", iconBg: "#2496ed", iconColor: "#ffffff", deviconClass: "devicon-docker-plain colored"},
  gitlab: {icon: "GL", iconBg: "#fc6d26", iconColor: "#050608", deviconClass: "devicon-gitlab-plain colored"},
  git: {icon: "G", iconBg: "#f05032", iconColor: "#ffffff", deviconClass: "devicon-git-plain colored"},
  amocrm: {icon: "A", iconBg: "#00a4ff", iconColor: "#ffffff"},
  bootstrap: {icon: "B", iconBg: "#7952b3", iconColor: "#ffffff", deviconClass: "devicon-bootstrap-plain colored"},
  html: {icon: "H", iconBg: "#e34f26", iconColor: "#ffffff", deviconClass: "devicon-html5-plain colored"},
  css: {icon: "C", iconBg: "#1572b6", iconColor: "#ffffff", deviconClass: "devicon-css3-plain colored"},
  js: {icon: "JS", iconBg: "#f7df1e", iconColor: "#050608", deviconClass: "devicon-javascript-plain colored"},
};

const skillPriority = [
  "yii2",
  "php",
  "laravel",
  "nuxt",
  "vue",
  "typescript",
  "rest-api",
  "mysql",
  "sql",
  "redis",
  "queue",
  "cache",
  "docker",
  "gitlab",
  "git",
  "amocrm",
  "bootstrap",
  "html",
  "css",
  "js",
];

const getSkillPriority = (skill) => {
  const index = skillPriority.indexOf(skill);
  return index === -1 ? skillPriority.length : index;
};

const iconStyle = (skill) => ({
  backgroundColor: skill.iconBg ?? "rgba(255, 255, 255, 0.08)",
  color: skill.iconColor ?? "#edf5e1",
});

const projectSkills = computed(() => {
  const counts = content.value.projects.reduce((result, project) => {
    project.skills?.forEach((skill) => {
      result[skill] = (result[skill] ?? 0) + 1;
    });

    return result;
  }, {});

  const maxCount = Math.max(...Object.values(counts), 0);

  return Object.entries(counts)
      .map(([skill, count]) => ({
        id: skill,
        label: skillLabelMap[skill] ?? skill,
        icon: skillIconMap[skill]?.icon ?? skill.slice(0, 2).toUpperCase(),
        iconBg: skillIconMap[skill]?.iconBg,
        iconColor: skillIconMap[skill]?.iconColor,
        deviconClass: skillIconMap[skill]?.deviconClass,
        count,
        width: maxCount ? `${Math.round((count / maxCount) * 100)}%` : "0%",
      }))
      .sort((first, second) => {
        return second.count - first.count
            || getSkillPriority(first.id) - getSkillPriority(second.id)
            || first.label.localeCompare(second.label);
      });
});
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
            <a href="/resume.pdf"
               download
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
        <div class="surface-panel rounded-xl bg-[#11151b] border border-[#252a33] p-4">

          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold"> {{ t('main.stackExperience') }}</h2>
            <span class="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gray-500">{{ t('main.overview') }}</span>
          </div>

          <div class="relative">
            <div class="max-h-120 space-y-3 overflow-y-auto pr-2 text-[11px] scrollbar-thin sm:max-h-64">
              <div v-for="skill in projectSkills" :key="skill.id" class="flex items-center gap-3">
                <span class="flex w-24 items-center gap-2 text-gray-400">
                  <span
                      v-if="!skill.deviconClass"
                      class="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none"
                      :style="iconStyle(skill)"
                  >
                    {{ skill.icon }}
                  </span>
                  <i
                      v-else
                      :class="skill.deviconClass"
                      class="grid h-5 min-w-5 place-items-center text-base leading-none"
                  ></i>
                  {{ skill.label }}
                </span>
                <div class="progress-track flex-1 h-2 rounded-full bg-[#1a1f27] overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-cinnabarMain via-palette3 to-palette5"
                       :style="{width: skill.width, backgroundImage: 'linear-gradient(to right, #ED5E1F, #5CDB95, #379683)' }"
                  ></div>
                </div>
                <span class="w-10 text-gray-400 text-right">{{ skill.width }}</span>
              </div>
            </div>
            <div class="fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#11151b] to-transparent"></div>
          </div>

        </div>
      </div>
    </div>

    <div class="mt-4 lg:mt-4">
      <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
        {{ t('main.whatIDo') }}
      </p>
      <div class="surface-panel relative rounded-xl border border-[#252a33] bg-[#11151b] p-3">
        <div class="max-h-85 space-y-2 overflow-y-auto pr-2 scrollbar-thin sm:max-h-48">
          <article
              v-for="card in content.homeCards"
              :key="card.title"
              class="surface-card rounded-xl bg-[#15191f] border border-[#262a33] p-3"
          >
          <span class="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-1">
            {{ card.tag }}
          </span>
            <span class="block text-sm font-medium mb-2 text-gray-100">
            {{ card.title }}
          </span>
            <span class="block text-[11px] leading-relaxed text-gray-400">
            {{ card.subtitle }}
          </span>
          </article>
        </div>
        <div class="fade-bottom pointer-events-none absolute inset-x-3 bottom-3 h-10 bg-gradient-to-t from-[#11151b] to-transparent"></div>
      </div>
    </div>

  </section>
</template>
