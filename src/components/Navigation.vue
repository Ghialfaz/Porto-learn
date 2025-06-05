<script setup>
import {ref} from 'vue'
const isTopBarOpen = ref(false)
</script>

<template>
    <nav class="fixed top-0 left-0 z-999 w-full flex items-center justify-between px-6 md:px-12 py-4 md:py-6 backdrop-blur-lg bg-primary/70 shadow-lg"
    >
    <a href="/">
        <div class="i-custom-icon" style="width:40px; height: 40px"></div>
    </a>

    <ul class="hidden md:flex items-center gap-6 md:gap-10 text-foreground select-none">
        <li>
            <a class="font-semibold transition duration-200 hover:text-accent-10 px-4 py-2 rounded-md" href="#home" style="cursor:pointer; user-select: none;">Home</a>
        </li>
        <li>
            <a class="font-semibold transition duration-200 hover:text-accent-10 px-4 py-2 rounded-md" href="#skills" style="cursor:pointer; user-select: none;">Skills</a>
        </li>
        <li>
            <a class="font-semibold transition duration-200 hover:text-accent-10 px-4 py-2 rounded-md" href="#projects" style="cursor:pointer; user-select: none;">Projects</a>
        </li>
        <li>
            <a class="font-semibold transition duration-200 hover:text-accent-10 px-4 py-2 rounded-md" href="#contact" style="cursor:pointer; user-select: none;">Contact</a>
        </li>
    </ul>

    <button
        class="md:hidden flex items-center justify-center rounded-full p-3 text-foreground transition duration-300"
        :class="{ 'rotate-180': isTopBarOpen }"
        @click="isTopBarOpen = !isTopBarOpen"
        aria-label="Open navigation menu"
        style="transition: transform 0.4s cubic-bezier(.4,2,.6,1);"
    >
        <div :class="isTopBarOpen ? 'i-carbon-close-large' : 'i-carbon-menu'" style="width:28px; height:28px; transition: transform 0.4s cubic-bezier(.4,2,.6,1);"></div>
    </button>
    </nav>

    <transition name="slide-down">
        <div
        v-if="isTopBarOpen"
        class="fixed inset-0 z-[998] flex flex-col items-center justify-center bg-primary/90 text-foreground backdrop-blur-lg md:hidden"
        @click.self="isTopBarOpen = false"
        >

        <ul class="flex flex-col items-center gap-8 text-xl">
            <li>
                <a class="font-semibold transition duration-200 hover:text-accent-10" href="#home" @click="isSidebarOpen = false">Home</a>
            </li>
            <li>
                <a class="font-semibold transition duration-200 hover:text-accent-10" href="#skills" @click="isSidebarOpen = false">Skills</a>
            </li>
            <li>
                <a class="font-semibold transition duration-200 hover:text-accent-10" href="#projects" @click="isSidebarOpen = false">Projects</a>
            </li>
            <li>
                <a class="font-semibold transition duration-200 hover:text-accent-10" href="#contact" @click="isSidebarOpen = false">Contact</a>
            </li>
        </ul>
    </div>
    </transition>
</template>