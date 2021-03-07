<template>
  <form
    @submit.prevent="
      addFriend(id);
      username = '';
    "
    action=""
    class="p-6 bg-white shadow-lg max-w-sm text-green-400 font-semibold text-left rounded-md"
  >
    <div>
      <div class="py-2">
        <div class="flex">
          <input
            v-model="username"
            @focus="focusInput = true"
            @clickOut="focusInput = false"
            @keyup="validarCambio"
            placeholder="Usuario"
            class=" text-black p-2 w-full rounded-md border border-gray-300 bg-gray-50 shadow-md"
            type="text"
            name="titulo"
            autocomplete="off"
            id="titulo"
          />
          <button
            class="px-2 text-center rounded-md bg-green-500 text-white disabled:opacity-50"
            type="submit"
            v-if="habilitarSubmit"
          >
            Add
          </button>
        </div>
        <div
          class="w-full max-h-63 overflow-y-auto  bg-gray-50 shadow-md text-sm text-black "
        >
          <div
            class="element text-sm text-black p-3 hover:bg-gray-100 cursor-pointer"
            v-for="(user, index) in filterFriends"
            :key="index"
            v-show="focusInput"
          >
            <span
              class="element text-sm text-black p-3 hover:bg-gray-100 cursor-pointer"
              v-if="user"
              @click="setUser(user)"
              >{{ user.usuario }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default Vue.extend({
  data() {
    return {
      username: "",
      id: null,
      focusInput: false,
      lastSelected: "",
    };
  },
  async mounted() {
    await this.getUsersToAdd();
  },
  methods: {
    ...mapActions({
      getUsersToAdd: "user/getUsersToAdd",
      addFriend: "friend/addFriend",
    }),
    setUser(user) {
      this.focusInput = false;
      this.username = user.usuario;
      this.lastSelected = user.usuario;
      this.id = user.id;
    },
    validarCambio() {
      if (this.id != null) {
        if (this.username != this.lastSelected) {
          this.id = null;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      users: "user/GET_USERS_TO_ADD",
    }),
    filterFriends() {
      return this.users != null
        ? this.users.filter((user) => {
            return (
              user.usuario.toLowerCase().indexOf(this.username.toLowerCase()) !=
              -1
            );
          })
        : null;
    },
    habilitarSubmit() {
      return Boolean(this.id);
    },
  },
});
</script>

<style scoped></style>
