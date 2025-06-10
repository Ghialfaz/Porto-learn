<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue"

const G_COUNT = 8

function random(min, max) {
  return Math.random() * (max - min) + min
}

function createFallingG(id) {
  const left = random(0, 100)
  const delay = random(0, 2.5)
  const duration = random(2.5, 4.5)
  const opacity = random(0.15, 0.35)
  const blur = random(1, 4)
  const size = random(2.5, 5)
  return {
    id,
    style: {
      left: `${left}vw`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      opacity,
      filter: `blur(${blur}px)`,
      fontSize: `${size}rem`,
      color: `#C4925F`,
    },
  }
}

const fallingGs = ref(Array.from({length: G_COUNT}, (_, i) => createFallingG(i)))

const fullName = 'Irgi Apriana Abas.'
const shortName = 'Irgi A.A.'
const typedName = ref('')
const showCursor = ref(true)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.matchMedia('(max-width: 640px)').matches
}


onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  startTyping()
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})

watch(isMobile, () => {
  if (typingInterval) clearTimeout(typingInterval)
  typedName.value = ''
  startTyping()
})

const typingSpeed = 140
const pauseAfterTyped = 1200
const pauseAfterDelete = 500
let typingInterval = null

function startTyping() {
  let i = 0
  let typing = true
  const curentName = isMobile.value ? shortName : fullName

  function type() {
    if (typing) {
      if (i <= curentName.length) {
        typedName.value = curentName.slice(0, i)
        i++
        typingInterval = setTimeout(type, typingSpeed)
      } else {
        typing = false
        typingInterval = setTimeout(type, pauseAfterTyped)
      }
    } else {
      if (i >= 0) {
        typedName.value = curentName.slice(0, i)
        i--
        typingInterval = setTimeout(type, typingSpeed / 1.5)
      } else {
        typing = true
        i = 0
        typingInterval = setTimeout(type, pauseAfterDelete)
      }
    }
  }
  type()
}

</script>

<template>
  <div un-flex="~ col md:row">
  <Navigation />
    <main
      h-screen w-full scroll-smooth
      un-p="x-12 y-6 lg:x-24 lg:y-12"
      un-overflow="x-hidden y-auto"
      un-scrollbar="~ thumb-color-accent-10 track-color-secondary"
    >
      <section id="home" relative h-full flex items-center>
        <div justify-center un-flex="~ col">
          <div class="falling-g-container" aria-hidden="true">
            <span
              v-for="g in fallingGs"
              :key="g.id"
              class="falling-g"
              :style="g.style"
            >
            G
            </span>
          </div>

          <span font-display font-semibold tracking-wide un-text="lg foreground/80">Hi! My name is</span>
          <h1 font-display font-bold tracking-tight un-text="6xl foreground lg:7xl">
            <span
            un-inline-flex
            un-items-baseline
            un-w="full"
            md:un-min-w="[22ch]"
            un-max-w="full"
            un-break-words
            un-whitespace="normal"
            >
              <span un-inline>
                <span style="color: #c4925f">{{ typedName.slice(0,4) }}</span><span style="color: #fff">{{ typedName.slice(4) }}</span>
              </span>
              <span v-if="showCursor" class="typing-cursor" un-inline>|</span>
            </span>
          </h1>
          <p un-text="lg foreground/80">
            a passionate 4th semester Information Technology student with a deep curiosity for coding, problem solving, and exploring the endless possibilities of technology.
          </p>

          <Button
          link="https://example.com"
          icon="i-carbon-document"
          icon-position="left"
          button-text="Download CV"
          mt-4
          />

          <div
          absolute bottom-0 items-center text-accent-10
          un-translate-x="-1/2"
          un-left="1/2"
          un-flex="~ col"
          >
          <div i-carbon-touch-1-down h-8 w-8 animate-bounce style="color: #fff;" />
          <span font-display text-xs font-bold style="color: #fff;">Scroll Down</span>
          </div>
        </div>
      </section>

      <section
      id="skills"
      ref="sectionRefs[0]"
      mt-24 pt-24
      >
      <Heading
        text="Skills"
      />
      <div gap-4 un-grid="~ cols-1 lg:cols-2">
        <SkillsCard />
      </div>
    </section>

    <section
    id="projects"
    ref="sectionRefs[1]"
    mt-24 pt-24
    >
    <Heading
      text="Projects"
    />
    <div un-grid="~ cols-1 lg:cols-2 xl:cols-1" gap-6>
      <ProjectsCard />
    </div>

    <button
      link="/"
      icon="carbon-logo-github"
      icon-position="right"
      button-text="View More"
      un-m="x-auto t-10"
      un-p="x-5 y-2"
      text-sm
    />
  </section>

  <section
  id="contact"
  ref="sectionRefs[2]"
  mt-24 pt-24
  >
  <Heading
    text="Contact"
  />
  <div un-gap="16 lg:8" un-grid="~ cols-1 lg:cols-2">
    <div gap-4 un-flex="~ col">
      <p un-text="lg foreground">
        For any questions or potential collaborations, feel free to contact me via email. You can also find me on various social media platforms.
      </p>

      <div flex items-center gap-4>
        <div class="h-px w-6 bg-foreground" />
        <p class="text-foreground">
          Email for phone contact
        </p>
      </div>
      <div flex items-center gap-4>
        <div class="h-px w-6 bg-foreground" />
        <a class="text-foreground" href="mailto:rexalfaz45@gmail.com">rexalfaz45@gmail.com</a>
      </div>
      <div flex items-center gap-4>
        <div class="h-px w-6 bg-foreground" />
        <p class="text-foreground">
          Banten, Indonesia
        </p>
      </div>

      <div mt-8 flex gap-4 text-foreground>
        <a transition-color duration-200 hover:text-accent-10 href="">
          <div i-carbon-logo-github h-6 w-6 />
        </a>
        <a transition-color duration-200 hover:text-accent-10 href="">
          <div i-carbon-logo-discord h-6 w-6 />
        </a>
        <a transition-color duration-200 hover:text-accent-10 href="">
          <div i-carbon-logo-facebook h-6 w-6 />
        </a>
      </div>
    </div>

    <form gap-4 un-flex="~ col" action="" method="POST">
      <div flex gap-2>
        <input id="name" type="text" placeholder="Your Name" required input-text>
        <input id="email" type="text" placeholder="Your Email" required input-text>
      </div>
      <textarea id="message" name="message" placeholder="Message" cols="30" rows="10" required input-text />
      <button
        text-sm btn
        un-p="x-5 y-2"
        type="submit"
      >
        <span font-bold>Submit</span>
        <i i-carbon-send-alt h-6 w-6 />
      </button>
    </form>
  </div>
  </section>

      <Footer />
    </main>
  </div>
</template>