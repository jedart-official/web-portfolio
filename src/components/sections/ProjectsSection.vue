<script setup>
  import {computed, nextTick, onBeforeUnmount, ref, watch} from "vue";
  import {useMainStore} from "@/stores/main.js";
  import {useContent} from "@/composables/useContent.js";
  import {useI18n} from "vue-i18n";

  const {t} = useI18n();
  const {isActive} = useMainStore();
  const {content} = useContent();
  const selectedProjectId = ref(null);
  const modalPanel = ref(null);

  const themeMap = {
    dashboard: {
      bg: "bg-gradient-to-br from-[#11151b] to-[#1b232e] border-[#262d38]",
      tag: "text-gray-500",
      badge: "bg-palette3 text-night",
      text: "text-gray-300",
      footer: "border-[#252b35] text-gray-400",
    },
    crm: {
      bg: "bg-gradient-to-br from-[#161116] via-[#201317] to-[#281b1f] border-[#3a262b]",
      tag: "text-gray-400",
      badge: "bg-cinnabarMain text-palette2",
      text: "text-palette2",
      footer: "border-[#3a262b] text-palette2/90",
    },
    portfolio: {
      bg: "bg-gradient-to-br from-[#0f1715] via-[#142421] to-[#133531] border-[#1e3c35]",
      tag: "text-gray-400",
      badge: "bg-palette5 text-palette2",
      text: "text-palette2",
      footer: "border-[#1e3c35] text-palette2/90",
    },
  };

  const projectTheme = (project) => themeMap[project.theme] ?? themeMap.dashboard;
  const selectedProject = computed(() => {
    return content.value.projects.find((project) => project.id === selectedProjectId.value) ?? null;
  });

  const openProject = (project) => {
    selectedProjectId.value = project.id;
  };

  const closeProject = () => {
    selectedProjectId.value = null;
  };

  const handleWindowKeydown = (event) => {
    if (event.key === "Escape") {
      closeProject();
    }
  };

  const projectBackgroundStyle = (project) => {
    const background = project.background;

    if (!background) {
      return {};
    }

    if (typeof background === "string") {
      return {
        backgroundImage: background,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
    }

    return {
      backgroundImage: background.image,
      backgroundPosition: background.position ?? "center",
      backgroundRepeat: background.repeat ?? "no-repeat",
      backgroundSize: background.size ?? "cover",
    };
  };

  const projectLogoStyle = (project, placement) => {
    const settings = project.logo?.[placement];

    if (!settings) {
      return {};
    }

    return {
      height: settings.height,
      right: settings.right,
      bottom: settings.bottom,
      top: settings.top,
      opacity: settings.opacity,
    };
  };

  watch(selectedProjectId, (projectId) => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.overflow = projectId ? "hidden" : "";

    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleWindowKeydown);

      if (projectId) {
        window.addEventListener("keydown", handleWindowKeydown);
        nextTick(() => modalPanel.value?.focus());
      }
    }
  });

  onBeforeUnmount(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleWindowKeydown);
    }
  });
</script>

<template>
  <section
      v-show="isActive('projects')"
      class="screen relative h-full px-5 sm:px-6 lg:px-10 py-6 lg:py-8 flex flex-col"
  >
    <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-5 gap-4 lg:gap-6">
      <div>
        <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
          {{t('projects.casesSubTitle')}}
        </p>
        <h2 class="text-2xl sm:text-3xl font-semibold text-cinnabarMain mb-2">
          {{t('projects.casesTitle')}}
        </h2>
        <p class="text-sm text-gray-300 max-w-xl">
          {{t('projects.casesDescription')}}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
      <article
          v-for="project in content.projects"
          :key="project.id"
          role="button"
          tabindex="0"
          :aria-label="`${t('projects.openDetails')}: ${project.title}`"
          class="group relative overflow-hidden rounded-3xl p-4 flex flex-col border min-h-[180px] cursor-pointer text-left shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cinnabarMain/70 focus:outline-none focus:ring-2 focus:ring-cinnabarMain/60"
          :class="projectTheme(project).bg"
          @click="openProject(project)"
          @keydown.enter.prevent="openProject(project)"
          @keydown.space.prevent="openProject(project)"
      >
        <div
            v-if="project.background"
            class="pointer-events-none absolute inset-0 opacity-70 transition duration-300 group-hover:opacity-90"
            :style="projectBackgroundStyle(project)"
        ></div>
        <img
            v-if="project.logo?.src"
            :src="project.logo.src"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute right-3 bottom-2 h-36 w-auto opacity-30 mix-blend-screen drop-shadow-2xl transition duration-300 group-hover:scale-105 group-hover:opacity-40"
            :style="projectLogoStyle(project, 'card')"
        >
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/10 via-night/25 to-night/75"></div>

        <div class="relative z-10 flex h-full flex-col">
          <div class="mb-3 flex items-start justify-between gap-2">
            <div class="flex flex-col gap-1.5">
              <span
                  class="text-[10px] sm:text-[11px] uppercase tracking-[0.24em]"
                  :class="projectTheme(project).tag"
              >
                {{ project.tag }}
              </span>
              
              <div v-if="project.categories" class="flex flex-wrap gap-1.5 mt-0.5">
                <span 
                  v-for="category in project.categories" 
                  :key="category"
                  class="px-1.5 py-0.5 rounded-md text-[8px] uppercase tracking-wider border border-white/10 bg-white/5 text-gray-400"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <span
                class="px-2 py-1 rounded-full text-[10px] font-semibold shrink-0"
                :class="!project.badgeColor ? projectTheme(project).badge : ''"
                :style="project.badgeColor ? { backgroundColor: project.badgeColor, color: '#000' } : {}"
            >
              {{ project.badge }}
            </span>
          </div>

          <h3 class="text-base sm:text-lg font-semibold mb-2">
            {{ project.title }}
          </h3>

          <p class="text-xs mb-3 line-clamp-3" :class="projectTheme(project).text">
            {{ project.description }}
          </p>

          <div
              class="mt-auto flex items-center justify-end gap-3 pt-3 border-t text-[11px]"
              :class="projectTheme(project).footer"
          >
            <span class="shrink-0 text-cinnabarMain opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
              {{ t('projects.openDetails') }}
            </span>
          </div>
        </div>
      </article>

    </div>

    <Teleport to="body">
      <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div
            v-if="selectedProject"
            class="fixed inset-0 z-100 flex items-center justify-center bg-night/80 px-4 py-6 backdrop-blur-md"
            @click.self="closeProject"
        >
          <section
              ref="modalPanel"
              class="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c0f14] shadow-2xl"
              role="dialog"
              aria-modal="true"
              :aria-labelledby="`project-modal-title-${selectedProject.id}`"
              tabindex="-1"
          >
            <div
                v-if="selectedProject.background"
                class="pointer-events-none absolute inset-x-0 top-0 h-52 opacity-70"
                :style="projectBackgroundStyle(selectedProject)"
            ></div>
            <img
                v-if="selectedProject.logo?.src"
                :src="selectedProject.logo.src"
                alt=""
                aria-hidden="true"
                class="pointer-events-none absolute right-4 top-8 h-72 w-auto opacity-16 mix-blend-screen drop-shadow-2xl sm:right-16 sm:h-80"
                :style="projectLogoStyle(selectedProject, 'modalBackground')"
            >
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/20 via-[#0c0f14]/85 to-[#0c0f14]"></div>

            <div class="relative z-10 max-h-[88vh] overflow-y-auto no-scrollbar p-5 sm:p-6 lg:p-7">
              <div class="mb-6 flex items-start justify-between gap-4">
                <div class="flex items-start gap-4">
                  <img
                      v-if="selectedProject.logo?.src"
                      :src="selectedProject.logo.src"
                      :alt="selectedProject.logo.alt ?? selectedProject.title"
                      class="mt-1 h-14 w-14 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] object-contain p-2 shadow-lg shadow-black/20 sm:h-16 sm:w-16"
                  >
                  <div>
                  <p
                      class="mb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.26em]"
                      :class="projectTheme(selectedProject).tag"
                  >
                    {{ selectedProject.tag }}
                  </p>
                  <h3
                      :id="`project-modal-title-${selectedProject.id}`"
                      class="text-2xl sm:text-3xl font-semibold text-cinnabarMain"
                  >
                    {{ selectedProject.title }}
                  </h3>
                  </div>
                </div>

                <button
                    type="button"
                    class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-xl leading-none text-white transition hover:border-cinnabarMain/70 hover:text-cinnabarMain focus:outline-none focus:ring-2 focus:ring-cinnabarMain/60"
                    :aria-label="t('projects.closeDetails')"
                    @click="closeProject"
                >
                  ×
                </button>
              </div>

              <div class="grid gap-5 lg:grid-cols-[1.2fr,0.8fr] items-start">
                <div class="space-y-5">
                  <div>
                    <p class="mb-2 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                      {{ t('projects.description') }}
                    </p>
                    <p class="text-sm leading-relaxed text-gray-200">
                      {{ selectedProject.details?.summary ?? selectedProject.description }}
                    </p>
                  </div>

                  <div v-if="selectedProject.details?.implementation?.length">
                    <p class="mb-3 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                      {{ t('projects.implementation') }}
                    </p>
                    <ul class="space-y-2">
                      <li
                          v-for="item in selectedProject.details.implementation"
                          :key="item"
                          class="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-relaxed text-gray-300"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="selectedProject.details?.result">
                    <p class="mb-2 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                      {{ t('projects.result') }}
                    </p>
                    <p class="text-sm leading-relaxed text-gray-300">
                      {{ selectedProject.details.result }}
                    </p>
                  </div>
                </div>

                <aside class="lg:sticky lg:top-0 space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <a
                      v-if="selectedProject.url"
                      :href="selectedProject.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex w-full items-center justify-center rounded-2xl border border-cinnabarMain/40 bg-cinnabarMain/10 px-4 py-2.5 text-sm font-medium text-cinnabarMain transition hover:border-cinnabarMain hover:bg-cinnabarMain/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cinnabarMain/60"
                  >
                    {{ t('projects.openSite') }}
                  </a>

                  <div v-if="selectedProject.details?.tags?.length">
                    <p class="mb-3 text-[10px] uppercase tracking-[0.24em] text-gray-500">
                      {{ t('projects.tags') }}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span
                          v-for="tag in selectedProject.details.tags"
                          :key="tag"
                          class="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-gray-200"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

