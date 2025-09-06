<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '', // added confirmPassword
  isAustralian: false,
  reason: '',
  gender: '', // initial value empty, paired with placeholder option
  suburb: 'Clayton' // added suburb with one-way binding default
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null, // added confirmPassword error
  gender: null,
  reason: null
})

/** Utility: mask password with dots */
const maskPassword = (pwd) => (pwd ? '•'.repeat(Math.min(pwd.length, 12)) : '')

/** Validation: Username (real-time + final) */
const validateName = (finalCheck) => {
  const v = formData.value.username.trim()
  if (!v) {
    errors.value.username = finalCheck ? 'Username is required' : errors.value.username
    return
  }
  if (v.length < 3) {
    errors.value.username = finalCheck ? 'Name must be at least 3 characters' : 'Too short'
    return
  }
  errors.value.username = null
}

/** Validation: Password (real-time + final) */
const validatePassword = (finalCheck) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!password) {
    errors.value.password = finalCheck ? 'Password is required' : errors.value.password
  } else if (password.length < minLength) {
    errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

/** Validation: Confirm Password (must match Password) */
const validateConfirmPassword = (finalCheck) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (finalCheck) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

/** Validation: Gender (required) */
const validateGender = (finalCheck) => {
  const v = formData.value.gender
  if (!v) {
    errors.value.gender = finalCheck ? 'Please select a gender' : errors.value.gender
  } else {
    errors.value.gender = null
  }
}

/** Validation: Reason (min 10 characters + friend detection) */
const validateReason = (finalCheck) => {
  const v = formData.value.reason.trim().toLowerCase()
  if (!v) {
    errors.value.reason = finalCheck ? 'Reason is required' : errors.value.reason
  } else if (v.length < 10) {
    errors.value.reason = 'Please enter at least 10 characters'
  } else {
    errors.value.reason = null
  }
}

/** Form submit: run final validations, only proceed if all pass */
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true) // run confirm password validation
  validateGender(true)
  validateReason(true)

  if (
    errors.value.username ||
    errors.value.password ||
    errors.value.confirmPassword ||
    errors.value.gender ||
    errors.value.reason
  ) {
    return
  }
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

/** Reset form: clear both field values and errors */
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '', // reset confirmPassword
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton' // keep default on reset to show one-way binding
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    gender: null,
    reason: null
  }
}
</script>

<template>
  <!--  W4. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">W5. Library Registration Form</h1>
        <p class="text-center">
          This form includes validation. Registered users are displayed in a data table below (PrimeVue).
        </p>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- Username -->
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @input="() => validateName(false)"
                @blur="() => validateName(true)"
                :class="{ 'is-invalid': !!errors.username }"
              />
              <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
            </div>

            <!-- Password -->
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @input="() => validatePassword(false)"
                @blur="() => validatePassword(true)"
                :class="{ 'is-invalid': !!errors.password }"
              />
              <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                :class="{ 'is-invalid': !!errors.confirmPassword }"
              />
              <div v-if="errors.confirmPassword" class="text-danger mt-1">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <!-- Checkbox -->
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
                :class="{ 'is-invalid': !!errors.gender }"
              >
                <option value="" disabled>-- Please select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason (≥10 chars + friend detection) -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @input="() => validateReason(false)"
              @blur="() => validateReason(true)"
              :class="{ 'is-invalid': !!errors.reason }"
            ></textarea>
            <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
            <!-- show positive feedback if contains 'friend' -->
            <div
              v-if="formData.reason.toLowerCase().includes('friend')"
              class="text-success mt-1"
            >
              Great to have a friend
            </div>
          </div>

          <!-- Suburb (one-way binding using v-bind) -->
          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input
              type="text"
              class="form-control"
              id="suburb"
              v-bind:value="formData.suburb"
            />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- PrimeVue DataTable -->
  <div class="row mt-5">
    <h4>This is a PrimeVue DataTable.</h4>
    <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column header="Password">
        <template #body="slotProps">
          {{ maskPassword(slotProps.data.password) }}
        </template>
      </Column>
      <Column header="Australian Resident">
        <template #body="slotProps">
          {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
      <Column field="suburb" header="Suburb"></Column>
    </DataTable>
  </div>

  <!-- Card list -->
  <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ maskPassword(card.password) }}</li>
          <li class="list-group-item">
            Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
          </li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
          <li class="list-group-item">Suburb: {{ card.suburb }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#confirm-password:focus,
#isAustralian:focus,
#suburb:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
.is-invalid {
  border-color: #dc3545 !important;
}
</style>
