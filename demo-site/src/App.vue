<template>
  <div id="app" class="app-wrapper">
    <h1>Vue Number Stepper</h1>
    
    <h2>Value: {{mainDemoStepperValue}}</h2>
    <VueNumberStepper v-model="mainDemoStepperValue" :maxValue="maxValue" :minValue="minValue" :stepSize="stepSize" :isDisabled="isDisabled" :holdToAutoTap="holdToAutoTap" :autoTapRepeatIncrementMilliseconds="autoTapRepeatIncrementMilliseconds"/>

    <section class="settings-card">
      <h2>Props</h2>
      <div class="setting-row">
        <label for="">Min value: <span class="value">{{minValue}}</span></label>
        <input type="number" v-model="minValue">
      </div>

      <div class="setting-row">
        <label for="">Max value: <span class="value">{{maxValue}}</span></label>
        <input type="number" v-model="maxValue">
      </div>

       <div class="setting-row">
        <label for="">Step size: <span class="value">{{stepSize}}</span></label>
        <VueNumberStepper v-model="stepSize" minValue="1"/>
      </div>

      <div class="setting-row">
        <label for="">Disabled: <span class="value">{{isDisabled}}</span></label>
        <VueSwitch v-model="isDisabled"/>
      </div>

      <div class="setting-row">
        <label for="">Hold to Autotap: <span class="value">{{holdToAutoTap}}</span></label>
        <VueSwitch v-model="holdToAutoTap"/>
      </div>

       <div class="setting-row">
        <label for="">Autotap interval (ms)</label>
        <input type="number" class="" v-model="autoTapRepeatIncrementMilliseconds">
      </div>
    </section>
  </div>
</template>

<script>

import VueNumberStepper from "../../src/vue-number-stepper.vue";
import VueSwitch from "vue-ios-switch";

export default {
  name: 'App',
  data() {
    return {
      mainDemoStepperValue: 42,
      maxValue: 100,
      minValue: 0,
      stepSize: 1,
      isDisabled: false,
      holdToAutoTap: true,
      autoTapRepeatIncrementMilliseconds: 100
    }
  },
  components: {
    VueNumberStepper,
    VueSwitch
  }
}
</script>

<style lang="scss">


$spacer: 32px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.settings-card  {
  margin-top: $spacer;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  // margin-bottom: 8px;
  padding: $spacer / 4 $spacer / 2;
  padding-left: 0px;
  margin-left: $spacer / 2;
  border-top: 1px solid rgb(240, 240, 240);

  label > .value{
    font-weight: 600;
  }

  input[type="number"] {
    border-radius: 8px;
    border: 2px solid #EEEEEF;
    font-size: 1.25rem;
    width: 4rem;
    text-align: right;
  }
}

.settings-card {
  border-radius: 16px;
  border: 1px solid #EEEEEF;
}
</style>
