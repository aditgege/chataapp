<template>
<div class="chat-message">
    <div class="flex items-end" :class="owner ? 'justify-end': ''">
    <div class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
        <div><span :class="owner ? 'bg-green-500 text-white': 'bg-gray-300  text-gray-600'" class="px-4 py-2 rounded-lg inline-block rounded-bl-none ">{{text}}</span></div>
        <span class="text-xs text-green-500 mt-0"><span v-if="!owner">{{ name }}</span> <small>{{ time }}</small></span>
    </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['name', 'text', 'time', 'owner']
}
</script>