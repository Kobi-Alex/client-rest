<template>
  <router-link :to="{ name: 'ExamsList' }" class="btn btn-outline-info">
    <i><font-awesome-icon icon="circle-arrow-left" /></i>
  </router-link>
  <div class="p-3 text-white">
    <form @submit.prevent="submitHandle" v-if="examObj">
      <div class="mb-3">
        <label class="labels c-label">Title</label>
        <input
          type="name"
          class="form-control bg-transparent c-input"
          placeholder="enter title"
          v-model.trim="examObj.title"
        />
      </div>
      <div class="mb-3">
        <label class="labels c-label">Description</label>
        <textarea
          class="form-control bg-dark c-input"
          placeholder="enter description"
          v-model.trim="examObj.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label class="labels c-label">Duration time</label>
        <input
          type="number"
          step="5"
          min="30"
          max="360"
          class="form-control bg-transparent c-input"
          placeholder="enter duration time"
          v-model="examObj.durationTime"
        />
      </div>
      <div class="mb-3">
        <label class="labels c-label">Passing Score</label>
        <input
          type="number"
          step="0.5"
          min="40"
          max="100"
          class="form-control bg-transparent c-input"
          placeholder="enter passing score"
          v-model="examObj.passingScore"
        />
      </div>
      <!-- <div class="mb-3">
        <label class="labels c-label">Status</label>
        <select
          class="form-select bg-transparent c-input"
          aria-label="Default select example"
          v-model="examObj.status"
        >
          <option
            class="text-dark"
            v-for="s in statuses"
            :key="s.value"
            :value="s.value"
          >
            {{ s.title }}
          </option>
        </select>
      </div> -->
      <button class="btn btn-outline-info" :disabled="loading">
         Update
      </button>
      <button class="btn btn-outline-danger mx-1" :disabled="loading" @click.prevent="deleteHanlde">Delete</button>
    </form>
  </div>
   <div class="d-flex justify-content-center" v-if="!examObj">
      <div
        class="spinner-border align-center text-primary text-center"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import examService from "@/_services/examService.js";
import handleResponse from "@/_helpers/handleResponse.js";
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props) {
    const toast = getCurrentInstance().appContext.app.$toast;
    const loading = ref(false);
    const router = useRouter();

    const { getExamById, updateExam, removeExam } = examService();

    const examObj = ref(null);
    // const statuses = ref([
    //   {
    //     title: "NotAvailable",
    //     value: 0,
    //   },
    //   {
    //     title: "Available",
    //     value: 1,
    //   },
    //   {
    //     title: "Finished",
    //     value: 2,
    //   },
    // ]);

    onMounted(async () => {
      let response = await getExamById(props.id);

      if (response && response.value) {
        if (response.value.status === 200) {
          examObj.value = response.value.data;
        } else {
          handleResponse(response.value).forEach((element) => {
            toast.error(element, {
              position: "top",
              duration: 5000,
            });
          });
        }
      }
    });

    /**
     * Updates exam
     */
    const submitHandle = async () => {
      loading.value = true;

      let response = await updateExam(examObj.value.id, examObj.value);

      loading.value = false;

      if (response && response.value) {
        if (response.value.status === 204) {
          toast.success("The exam updated successfully");
        } else {
          handleResponse(response.value).forEach((element) => {
            toast.error(element, {
              position: "top",
              duration: 5000,
            });
          });
        }
      }
    };

    const deleteHanlde =async() => {
      loading.value = true;
      let response = await removeExam(props.id);

      if(response && response.value) {
        if(response.value.status === 204) {
          toast.success('The exam removed successfully');

          router.push({name: 'ExamsList'});
        } else {
          handleResponse(response.value).forEach((element) => {
            toast.error(element, {
              position: "top",
              duration: 5000,
            });

          });
        }
      }

      loading.value = false;
    }

    return { loading, examObj, submitHandle, deleteHanlde };
  },
};
</script>

<style>
</style>