<template>
  <q-page class="q-pa-md">
    <h4>Your Power Up Account</h4>

    <q-list padding bordered>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Screen name:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-show="!aliasModel.edit"
            >{{ aliasModel.alias }} <q-btn icon="edit" @click="editAlias"
          /></q-item-label>
          <span v-show="aliasModel.edit">
            <q-input
              v-model="aliasModel.alias"
              class="field-vspace"
              label="Screen Name / Alias"
              outlined
              stack-label
              maxlength="50"
              hint="How you will be known to Power Up members."
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]" />
            <q-btn icon="cancel" @click="resetAlias" />
            <q-btn icon="check" @click="updateAlias"
          /></span>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Avatar:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-avatar v-if="userStore.avatarUrl">
            <img :src="userStore.avatarUrl" />
          </q-avatar>
          <q-item-label v-if="userStore.avatarUrl === null"
            >Unknown</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Member since:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            formatDayMonthYear(userStore.createdAt)
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Settings</q-item-label>
      <q-item v-ripple tag="label">
        <q-item-section side>
          <q-checkbox v-model="emailModel" @click="toggleEmailComm" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Email Communication</q-item-label>
          <q-item-label v-if="!userStore.isEmailOkay" caption>
            I agree to receive email about Power Up Magazine.
          </q-item-label>
          <q-item-label v-if="userStore.isEmailOkay" caption>
            On {{ formatDayMonthYear(userStore.emailCommsAcceptedAt) }}, you
            said email from us is OK.
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <info-dialog
            :prompt="dialogValues.emailComms.prompt"
            :title="dialogValues.emailComms.title"
            :message="dialogValues.emailComms.message"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>
          <q-item-label class="text-bold">Email:</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="userStore.email">{{
            userStore.email
          }}</q-item-label>
          <q-item-label v-else class="text-italic">unknown</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Level Up</q-item-label>
      <q-item v-if="userStore.isAuthor">
        <q-item-section>
          You are all set. Go to the Article Workbench and get typing.
        </q-item-section>
      </q-item>
      <q-item v-if="!userStore.isAuthor">
        <q-item-label
          >You can submit articles that you have written to Power Up Magazine
          for publication. Simply agree to the following terms.</q-item-label
        >
      </q-item>
      <q-item>
        <div class="text-h6">Terms</div>
        <ul>
          <li>
            Only submit material that you have written yourself. Any published
            writing (i.e., visible to others
          </li>
          <li>
            Your work may be declined from publication if it does not meet the
            standards of Power Up editors.
          </li>
          <li>
            Unless otherwise specified, you will not receive compensation for
            your writing.
          </li>
        </ul>
      </q-item>
      <q-item v-if="!userStore.isAuthor">
        <q-item-section>
          <q-btn
            label="Click to agree and become a Power Up writer"
            no-caps
            @click="handleBecomeAuthor"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import { formatDayMonthYear } from '../../composables/powerUpUtils'
import InfoDialog from '../../components/InfoDialog'

export default defineComponent({
  components: {
    InfoDialog,
  },
  setup() {
    const userStore = useUserStore()
    const dialogValues = {
      emailComms: {
        prompt: 'Email Pledge',
        title: 'Only the Good Stuff',
        message:
          'We will only send you email about Power Up Magazine. We will not share your email address with anyone.',
      },
    }
    const aliasModel = ref({
      alias: '',
      edit: false,
    })
    const emailModel = ref(false)

    return {
      formatDayMonthYear,
      dialogValues,
      userStore,
      aliasModel,
      emailModel,
    }
  },
  async mounted() {
    await this.userStore.fetchMyProfile()
    this.aliasModel.alias = this.userStore.alias
    this.emailModel = this.userStore.isEmailOkay
  },
  methods: {
    toggleEmailComm() {
      this.userStore.updateAgreeToEmail()
    },
    editAlias() {
      this.aliasModel.edit = true
    },
    updateAlias() {
      this.userStore.updateMyProfile({
        alias: this.aliasModel.alias,
      })
      this.aliasModel.edit = false
    },
    resetAlias() {
      this.aliasModel.alias = this.userStore.alias
      this.aliasModel.edit = false
    },
    saveEmail(email) {
      this.userStore.updateMyProfile({
        email,
      })
    },
    handleBecomeAuthor() {
      this.userStore.askToBecomeAuthor()
    },
  },
})
</script>

<style>
h4 {
  margin: 0em;
  margin-bottom: 0.5em;
}
</style>
