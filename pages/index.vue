<template>
  <div>
    <div class="flex flex-col h-screen justfy-center bg-green-400">
      <Alert :show="alert" :message="message" class="mt-auto" />
      <div
        class="flex flex-col mb-auto mt-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden md:flex-row md:h-56"
      >
        <div
          class="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800"
        >
          <div class="py-6 px-6 md:px-8 md:py-0">
            <h2
              class="text-gray-700 dark:text-white text-lg font-bold md:text-gray-100"
            >
              Masukan Username anda
            </h2>
            <p
              class="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-gray-400"
            >
              Buat Room / gunakan Room yang sudah anda miliki
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
          <form class="w-full md:w-auto mx-5">
            <div
              class="flex flex-col rounded-lg border dark:border-gray-600 overflow-hidden lg:flex-row mb-3"
            >
              <input
                type="text"
                name="username"
                placeholder="Masukan Username"
                aria-label="Masukan Username"
                v-model="user.name"
                class="py-3 px-6 bg-white dark:bg-gray-800 text-gray-700 outline-none placeholder-gray-500 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              />
            </div>
            <div
              class="flex flex-col rounded-lg border dark:border-gray-600 overflow-hidden lg:flex-row"
            >
              <input
                type="text"
                v-model="user.room"
                name="room"
                placeholder="Masukan Nama Room"
                aria-label="Masukan Nama Room"
                class="py-3 px-6 bg-white dark:bg-gray-800 text-gray-700 outline-none placeholder-gray-500 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              />
            </div>
            <button
             @click.prevent="submit"
              class="rounded-lg mt-3 py-2 px-4 bg-gray-700 text-gray-100 text-sm font-medium tracking-wider uppercase hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Alert from "~/components/Alert"
export default {
  components: {
    Alert
  },
  data() {
    return {
      user: {
        name: "",
        room: "roomdev",
        typingStatus: false,
      },
      valid: true,
      alert: false
    };
  },
  computed: {
    message() {
      const { message } = this.$route.query;
      return message
    },
  }, 
  mounted() {
    this.alert = !!this.message;
  },
  methods: {
    ...mapActions(["createUser"]),
    submit() {
      this.createUser(this.user);
      this.$router.push("/chat");
    },
  }
};
</script>