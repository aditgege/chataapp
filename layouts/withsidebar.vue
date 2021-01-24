<template>
<div class="md:flex flex-col md:flex-row md:min-h-screen w-full">
  <div class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" >
    <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">CHATKU</a>
      <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
      </button>
    </div>
    <nav class=" block flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
      <p>Active user :</p>
      <a v-for="(u, index) in users" :key="`user-${index}`" @click.prevent class="flex  px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
        <span class="my-auto mr-3 text-green-500">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
          </svg>
        </span>
        <span>
          {{ u.name }}
        </span>
      </a>
    </nav>
  </div>
    <Nuxt />
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ChatLayout",
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapState(["user", "users"]),
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
  },
  methods: {
    ...mapActions(["joinRoom", "leftRoom"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
  },
};
</script>