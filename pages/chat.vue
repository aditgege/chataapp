/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/
<template>
<div  ref="chat" class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
   <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 ">
      <div class="flex items-center space-x-4">
         <div class="flex flex-col leading-tight">
         </div>
      </div>
      <div class="flex items-center space-x-2">
        <button @click="exit" type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>
      </div>
   </div>
   <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <Message
       v-for="(message,index) in messages"
       :key="`message-${index}`"
       :name="message.name"
       :text="message.text"
       :time="message.time"
       :status="getStatus(message)"
       :owner="message.id === user.id"
       :message="message"
     />
       <!-- :status="user.seen == true && message.id === user.id ? 'dibaca': 'terkirim'" -->

     {{ user.seen }}
     <p
        v-for="(typingUser, index) in typingUsers"
        :key="`typingUser-${index}`"
        class="text-gray-700 text-sm"
      >
        {{ typingUser.name }} is typing...
      </p>
   </div>
   <input-messages />

</div>
</template>
<script>
import Message from "~/components/Message"
import InputMessages from '../components/InputMessages.vue'
import { mapState, mapGetters, mapActions } from "vuex";


export default {
    layout: 'withsidebar',
    components: {
        Message,
        InputMessages
    },
    computed: {
    ...mapState(["user", "messages", "users", "seen"]),
    ...mapGetters(["typingUsers", "messageSeen"]),
  },
  watch: {
    messages(newVal, oldVal) {
      setTimeout(() => {
        if (newVal !== oldVal) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
      }, 0);
    },
  },
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
  methods: {
    ...mapActions(["leftRoom", "setMessageSeen"]),
    getStatus(message) {
      let res = this.seen.find(e => e.text == message.text && e.time == message.time)
      if(res !== undefined) {
        return 'Dibaca'
      }else{
        return 'Terkirim'
      }
    },
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
    visibilityChanged() {
      // this.setMessageSeen(true)
    }
  }
}
</script>
<style>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
