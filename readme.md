# Vue Number Stepper 
[![Build Status](https://travis-ci.org/AnalyzePlatypus/vue-number-stepper.svg?branch=master)](https://travis-ci.org/AnalyzePlatypus/vue-number-stepper.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/AnalyzePlatypus/vue-number-stepper/badge.svg?branch=master)](https://coveralls.io/github/AnalyzePlatypus/vue-number-stepper?branch=master)


Feature complete iOS-style stepper control for Vue.js

[Live demo](https://vue-number-stepper.netlify.app)

## Features

* Inspired by Apple's redesigned `UIStepper` from iOS 13.
* Works with `v-model`
* Configurable minimum & maximum values
* Works with custom step values (skip by 10, etc.)
* Long press to rapidly tap through values
* Rigorously tested with 100% branch coverage
* Fully accessible and compatible with screen readers

> UX tip: Steppers are best for selecting Poisson numbers - small amounts with low variability, such as 0-10. [Check out this article for more details](https://learnui.design/blog/4-rules-intuitive-ux.html)

## Installation

```
npm i vue-number-stepper
```

## Usage

```html
<VueNumberStepper 
  v-model="mainDemoStepperValue" 
  :maxValue="42" 
  :minValue="0" 
  :stepSize="1" 
  :isDisabled="false" 
  :holdToAutoTap="true" 
  :autoTapRepeatIncrementMilliseconds="100"/>
```

## Props

> All props besides `value` are optional 

| Props | Type | Notes |
|---|---|---|
| `value` | Number | The current valeu of the stepper. `v-model` takes care of this for you.
| `maxValue` | Number | Must be greater than `minValue`. Must be divisible by `stepSize`|
| `minValue` | Number | default is 0 |
| `stepSize` | Number | Must be greater than 0. |
| `isDisabled` | Boolean | Use this to disable the control entirely |
| `holdToAutoTap` | Boolean | `true` by default. Use this to disable hold-to-tap |
| `autoTapRepeatIncrementMilliseconds` | Number | `100` by default. Controls the amount of milliseconds between incerement/decrement events when the button is held down. | 

