<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div mb-10 flex flex-col items-center justify-center>
        <h2
            font-display font-bold
            un-text="5xl foreground center"
            class="text-center"
        >
        {{ text }}
        </h2>
    </div>
</template>