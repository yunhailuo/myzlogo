<script setup>
const props = defineProps({
    fill: { type: String, default: "currentColor" },
});
</script>

<template>
    <button class="iconbutton" @click="$emit('clicked')">
        <!-- Adopted from https://github.com/ionic-team/ionicons/blob/main/src/svg/download.svg -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 512 512"
            :fill="fill"
        >
            <path
                d="M376,160H272V313.37l52.69-52.68a16,16,0,0,1,22.62,22.62l-80,80a16,16,0,0,1-22.62,0l-80-80a16,16,0,0,1,22.62-22.62L240,313.37V160H136a56.06,56.06,0,0,0-56,56V424a56.06,56.06,0,0,0,56,56H376a56.06,56.06,0,0,0,56-56V216A56.06,56.06,0,0,0,376,160Z"
            />
            <path d="M272,48a16,16,0,0,0-32,0V160h32Z" />
        </svg>
    </button>
</template>

<style scoped>
.iconbutton {
    background: none;
    border: none;
    outline: none;
    padding: 0;
}

.iconbutton:active {
    padding: 0;
    border: none;
    background: none;
}
</style>
