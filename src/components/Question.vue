<template>
  <div class="div1">
    <h3>{{ question.id }}. {{ question.name }}</h3>
    <div v-for="test in question.testOptions" :key="test" class="div2">
      <input
        type="radio"
        :value="test"
        v-model="selectQuestion"
        :checked="checked"
      />
      <label>{{ test }}</label>
    </div>
    <h4>Ваш ответ: {{ selectQuestion }}</h4>
    <h4>Результат: {{ result }}</h4>
    <button class="btn" @click="checkSelected" v-if="visible">Ответить</button>
    <button class="btn" @click="resetAnswer" v-else>Сбросить</button>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      selectQuestion: "",
      answer: "",
      result: "",
      visible: true,
      checked: false,
    };
  },
  methods: {
    checkSelected() {
      this.result =
        this.selectQuestion === this.question.answer
          ? "Ответ верный"
          : "Ответ неверный";
      this.visible = false;
    },
    resetAnswer() {
      this.selectQuestion = "";
      this.result = "";
      this.visible = true;
      this.checked = false;
    },
  },
};
</script>

<style scoped>
.div1 {
  padding: 10px;
  border-bottom: solid teal;
}
.div2 {
  margin: 10px;
}
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
