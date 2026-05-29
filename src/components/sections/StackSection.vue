<script setup>
  import {computed} from "vue";
  import {useMainStore} from "@/stores/main.js";
  import {useContent} from "@/composables/useContent.js";
  import {useI18n} from "vue-i18n";
  import {storeToRefs} from "pinia";

  const {t} = useI18n();
  const store = useMainStore();
  const {isActive} = store;
  const {activeTheme} = storeToRefs(store);
  const {content} = useContent();

  const skillMeta = {
    yii2: {label: "Yii2", group: "backend", icon: "Y2", iconBg: "#1f6feb", iconColor: "#ffffff", deviconClass: "devicon-yii-plain colored"},
    php: {label: "PHP", group: "backend", icon: "php", iconBg: "#777bb4", iconColor: "#ffffff", deviconClass: "devicon-php-plain colored"},
    laravel: {label: "Laravel", group: "backend", icon: "L", iconBg: "#ff2d20", iconColor: "#ffffff", deviconClass: "devicon-laravel-plain colored"},
    "rest-api": {label: "REST API", group: "backend", icon: "API", iconBg: "#ed5e1f", iconColor: "#050608"},
    queue: {label: "Queue", group: "backend", icon: "Q", iconBg: "#5cdb95", iconColor: "#050608"},
    cache: {label: "Cache", group: "backend", icon: "C", iconBg: "#907163", iconColor: "#ffffff"},
    html: {label: "HTML", group: "frontend", icon: "H", iconBg: "#e34f26", iconColor: "#ffffff", deviconClass: "devicon-html5-plain colored"},
    css: {label: "CSS", group: "frontend", icon: "C", iconBg: "#1572b6", iconColor: "#ffffff", deviconClass: "devicon-css3-plain colored"},
    js: {label: "JS", group: "frontend", icon: "JS", iconBg: "#f7df1e", iconColor: "#050608", deviconClass: "devicon-javascript-plain colored"},
    vue: {label: "Vue", group: "frontend", icon: "V", iconBg: "#42b883", iconColor: "#050608", deviconClass: "devicon-vuejs-plain colored"},
    nuxt: {label: "Nuxt", group: "frontend", icon: "N", iconBg: "#00dc82", iconColor: "#050608", deviconClass: "devicon-nuxtjs-plain colored"},
    typescript: {label: "TypeScript", group: "frontend", icon: "TS", iconBg: "#3178c6", iconColor: "#ffffff", deviconClass: "devicon-typescript-plain colored"},
    bootstrap: {label: "Bootstrap", group: "frontend", icon: "B", iconBg: "#7952b3", iconColor: "#ffffff", deviconClass: "devicon-bootstrap-plain colored"},
    mysql: {label: "MySQL", group: "data", icon: "MY", iconBg: "#00758f", iconColor: "#ffffff", deviconClass: "devicon-mysql-plain colored"},
    sql: {label: "SQL", group: "data", icon: "DB", iconBg: "#379683", iconColor: "#ffffff"},
    redis: {label: "Redis", group: "data", icon: "R", iconBg: "#dc382d", iconColor: "#ffffff", deviconClass: "devicon-redis-plain colored"},
    docker: {label: "Docker", group: "tools", icon: "D", iconBg: "#2496ed", iconColor: "#ffffff", deviconClass: "devicon-docker-plain colored"},
    gitlab: {label: "GitLab", group: "tools", icon: "GL", iconBg: "#fc6d26", iconColor: "#050608", deviconClass: "devicon-gitlab-plain colored"},
    git: {label: "Git", group: "tools", icon: "G", iconBg: "#f05032", iconColor: "#ffffff", deviconClass: "devicon-git-plain colored"},
    amocrm: {label: "AmoCRM", group: "integrations", icon: "A", iconBg: "#00a4ff", iconColor: "#ffffff"},
  };

  const groupOrder = ["backend", "frontend", "data", "tools"];
  const staticStackSkills = {
    data: [
      {id: "postgresql-static", label: "PostgreSQL", icon: "PG", iconBg: "#336791", iconColor: "#ffffff", deviconClass: "devicon-postgresql-plain colored"},
    ],
    tools: [
      {id: "github-static", label: "GitHub", icon: "GH", iconBg: "#f0f6fc", iconColor: "#050608", deviconClass: "devicon-github-original"},
    ],
  };

  const integrationItems = computed(() => [
    {
      id: "amocrm",
      title: "AmoCRM",
      icon: "A",
      iconBg: "#00a4ff",
      iconColor: "#ffffff",
      logo: {
        src: "/logos/integrations/amocrm.svg",
        backgroundColor: "#00a4ff",
      },
      description: t("stack.integrations.items.amocrm"),
    },
    {
      id: "kaspi",
      title: "Kaspi",
      icon: "K",
      iconBg: "#e30613",
      iconColor: "#ffffff",
      logo: {
        src: "/logos/integrations/kaspi.svg",
      },
      description: t("stack.integrations.items.kaspi"),
    },
    {
      id: "freedom",
      title: "Freedom",
      icon: "F",
      iconBg: "#00a651",
      iconColor: "#ffffff",
      logo: {
        dark: "/logos/integrations/freedom-dark.svg",
        light: "/logos/integrations/freedom-light.svg",
      },
      description: t("stack.integrations.items.freedom"),
    },
    {
      id: "tarlan-payments",
      title: "Tarlan Payments",
      icon: "TP",
      iconBg: "#111827",
      iconColor: "#ffffff",
      logo: {
        src: "/logos/integrations/tarlan.svg",
        backgroundColor: "#ffffff",
      },
      description: t("stack.integrations.items.tarlanPayments"),
    },
  ]);

  const integrationLogoSrc = (item) => {
    if (!item.logo) {
      return null;
    }

    return activeTheme.value === "light"
        ? item.logo.light ?? item.logo.src
        : item.logo.dark ?? item.logo.src;
  };

  const skillPriority = [
    "yii2",
    "php",
    "laravel",
    "rest-api",
    "queue",
    "cache",
    "nuxt",
    "vue",
    "typescript",
    "html",
    "css",
    "js",
    "bootstrap",
    "mysql",
    "sql",
    "redis",
    "docker",
    "gitlab",
    "git",
    "amocrm",
  ];

  const groupLabels = computed(() => ({
    backend: t("stack.groups.backend"),
    frontend: t("stack.groups.frontend"),
    data: t("stack.groups.data"),
    tools: t("stack.groups.tools"),
    integrations: t("stack.groups.integrations"),
  }));

  const getSkillPriority = (skill) => {
    const index = skillPriority.indexOf(skill);
    return index === -1 ? skillPriority.length : index;
  };

  const iconStyle = (skill) => ({
    backgroundColor: skill.iconBg ?? "rgba(255, 255, 255, 0.08)",
    color: skill.iconColor ?? "#edf5e1",
  });

  const skillStats = computed(() => {
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
          label: skillMeta[skill]?.label ?? skill,
          group: skillMeta[skill]?.group ?? "tools",
          icon: skillMeta[skill]?.icon ?? skill.slice(0, 2).toUpperCase(),
          iconBg: skillMeta[skill]?.iconBg,
          iconColor: skillMeta[skill]?.iconColor,
          deviconClass: skillMeta[skill]?.deviconClass,
          count,
          percent: maxCount ? Math.round((count / maxCount) * 100) : 0,
        }))
        .sort((first, second) => {
          return second.count - first.count
              || getSkillPriority(first.id) - getSkillPriority(second.id)
              || first.label.localeCompare(second.label);
        });
  });

  const skillGroups = computed(() => {
    return groupOrder
        .map((group) => ({
          id: group,
          title: groupLabels.value[group],
          skills: [
            ...skillStats.value
                .filter((skill) => skill.group === group)
                .sort((first, second) => getSkillPriority(first.id) - getSkillPriority(second.id)),
            ...(staticStackSkills[group] ?? []),
          ],
        }))
        .filter((group) => group.skills.length);
  });
</script>

<template>
  <section v-show="isActive('stack')" class="screen relative h-full px-5 sm:px-6 lg:px-10 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[1.05fr,1.05fr] gap-6">

    <div class="flex flex-col gap-6">
      <div data-gsap-reveal>
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
        <div v-for="group in skillGroups" :key="group.id" data-gsap-reveal>
          <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-1">
            {{ group.title }}
          </p>
          <div class="flex flex-wrap gap-2">
              <span v-for="skill in group.skills" :key="skill.id" class="skill-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151a21] border border-[#27303b] text-xs">
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
          </div>
        </div>


      </div>

      <div data-gsap-reveal class="surface-panel rounded-xl border border-[#272e3a] bg-[#11151b] p-4">
        <div class="mb-4">
          <p class="mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500">
            {{ t("stack.integrations.subtitle") }}
          </p>
          <h3 class="mb-2 text-lg font-semibold text-gray-100">
            {{ t("stack.integrations.title") }}
          </h3>
          <p class="text-xs leading-relaxed text-gray-400">
            {{ t("stack.integrations.description") }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <article
              v-for="item in integrationItems"
              :key="item.id"
              class="surface-card rounded-xl border border-[#27303b] bg-[#151a21] p-3"
          >
            <div class="mb-2 flex items-center gap-2">
              <span
                  v-if="!integrationLogoSrc(item)"
                  class="grid h-8 min-w-8 place-items-center rounded-lg px-1 text-[9px] font-semibold leading-none"
                  :style="{backgroundColor: item.iconBg, color: item.iconColor}"
              >
                {{ item.icon }}
              </span>
              <span
                  v-else
                  class="grid h-8 min-w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] px-2"
                  :style="{backgroundColor: item.logo.backgroundColor}"
              >
                <img
                    :src="integrationLogoSrc(item)"
                    :alt="item.title"
                    class="block h-auto max-h-6 max-w-[5.75rem] object-contain"
                >
              </span>
              <h4 class="text-xs font-semibold text-gray-100">
                {{ item.title }}
              </h4>
            </div>
            <p class="text-[11px] leading-relaxed text-gray-400">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </div>


    <div class="flex flex-col">
      <p data-gsap-reveal class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
        {{t('stack.visualSkillMap')}}
      </p>
      <div class="surface-panel relative rounded-xl border border-[#272e3a] bg-[#11151b] p-3">
        <div class="max-h-[983px] space-y-3 overflow-y-auto pr-2 scrollbar-thin">
          <div :key="item.id" v-for="item in skillStats" data-gsap-reveal class="surface-card rounded-xl bg-[#171c23] border border-[#272e3a] p-3">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="inline-flex items-center gap-2 text-xs font-medium text-gray-300">
                <span
                    v-if="!item.deviconClass"
                    class="grid h-6 min-w-6 place-items-center rounded-lg px-1 text-[9px] font-semibold leading-none"
                    :style="iconStyle(item)"
                >
                  {{ item.icon }}
                </span>
                <i
                    v-else
                    :class="item.deviconClass"
                    class="grid h-6 min-w-6 place-items-center text-lg leading-none"
                ></i>
                {{item.label}}
              </span>
              <span class="text-[10px] text-gray-500">{{ item.percent }}%</span>
            </div>
            <div class="progress-track h-2 overflow-hidden rounded-full bg-[#1a1f27]">
              <div
                  data-gsap-progress
                  class="h-full rounded-full bg-gradient-to-r from-cinnabarMain via-palette3 to-palette5"
                  :style="{width: `${item.percent}%`, backgroundImage: 'linear-gradient(to right, #ED5E1F, #5CDB95, #379683)' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="fade-bottom pointer-events-none absolute inset-x-3 bottom-3 h-10 bg-gradient-to-t from-[#11151b] to-transparent"></div>
      </div>
    </div>
  </section>
</template>
