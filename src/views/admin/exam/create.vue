<template>
  <router-link :to="{ name: 'ExamsList' }" class="btn btn-outline-info">
    <i><font-awesome-icon icon="circle-arrow-left" /></i>
  </router-link>
  <div class="p-3 text-white">
    <form @submit.prevent="submitHandle">
      <div class="mb-3">
        <label class="labels c-label">Title</label>
        <input
          type="test"
          class="form-control bg-transparent c-input"
          placeholder="enter title"
          v-model.trim="examObj.title"
        />
      </div>
      <div class="mb-3">
        <label class="labels c-label">Description</label>
        <textarea
          class="form-control bg-dark c-input border-0"
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
        <span v-if="!loading">Create</span>
        <span v-else>Creating...</span>
      </button>
    </form>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import examService from "@/_services/examService.js";
import handleResponse from "@/_helpers/handleResponse.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const toast = getCurrentInstance().appContext.app.$toast;
    const loading = ref(false);
    const router = useRouter();

    const { createExam } = examService();

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
    const examObj = ref({
      title: "",
      description: "",
      durationTime: 30,
      passingScore: 40,
      // status: 0,
    });

    /**
     * Creates new Exam
     */
    const submitHandle = async () => {
      // if (!examObj.value.title) {
      //   toast.error("Title is required", {
      //     position: "top",
      //     duration: 3000,
      //   });

      //   return;
      // }

      // if (!examObj.value.description) {
      //   toast.error("Description is required", {
      //     position: "top",
      //     duration: 3000,
      //   });

      //   return;
      // }

      loading.value = true;

      let response = await createExam(examObj.value);

      loading.value = false;

      if (response && response.value) {
        if (response.value.status === 201) {
          toast.success("The test created successfully");
          examObj.value = {
            title: "",
            description: "",
            durationTime: 30,
            passingScore: 40,
            // status: 0,
          };

          router.push({
            name: "ExamQuestions",
            params: { id: response.value.data.id },
          });
        } else {
          console.log(response.value);
          handleResponse(response.value).forEach((element) => {
            toast.error(element, {
              position: "top",
              duration: 5000,
            });
          });
        }
      }
    };

    return { loading, examObj, submitHandle };
  },
};
</script>

<style>
</style>