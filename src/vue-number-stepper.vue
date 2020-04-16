<template>
  <div class="stepper" 
    @mouseup="endAutoTap" 
    @mouseout="endAutoTap" 
    @touchend="endAutoTap" 
    @touchcancel="endAutoTap">
    <button 
      data-test-target='decrement' 
      :disabled="isDecrementDisabled"
      @click="isDecrementDisabled ? '' : emitDecremented()"
      @mousedown="decrementHandleMousedown"
      @touchstart="decrementHandleMousedown">
      <slot name="decrement">
        <span class="minus-icon"></span>
      </slot>
    </button>

    <button data-test-target='increment' 
      :disabled="isIncrementDisabled" 
      @click="isIncrementDisabled ? '' : emitIncremented()"
      @mousedown="incrementHandleMousedown"
      @touchstart="incrementHandleMousedown">
      <slot name="increment">
        <span class="plus-icon"></span>
      </slot>
    </button>
  </div>
</template>

<script>

export default {
  name: 'VueStepper',
  props: {
    value: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: false
    }, 
    minValue: {
      type: Number,
      required: false,
      default: 0
    },
    stepSize: {
      type: Number,
      required: false,
      default: 1,
      validator: n => n > 0
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    holdToAutoTap: {
      type: Boolean,
      default: true
    },
    autoTapRepeatIncrementMilliseconds: {
      type: Number,
      default: 250
    },
  },
  data() {
    return {
      incrementTimer: undefined,
      decrementTimer: undefined,
    }
  },
  mounted() {
    this.validateProps();
  },
  destroyed() {
   this.endAutoTap();
  },
  computed: {
    isIncrementDisabled() {
      return this.isDisabled || this.value >= this.maxValue;
    },
    isDecrementDisabled() {
      return this.isDisabled || this.value <= this.minValue;
    },
    isLastIncrementValue() {
      return this.value + this.stepSize > this.maxValue; // Hint: What if maxValue is undefined? Int > undefined is always true, so this works even when `maxValue` is not set (maxValue has no default value; minValue does)
    },
    isLastDecrementValue() {
      return this.value - this.stepSize < this.minValue;
    },
    stepSizeAndMaxValueConflict() {
      return this.maxValue && (this.maxValue % this.stepSize) !== 0;
    }
  },
  methods: {
    emitIncremented() {
       this.$emit("input", this.value + this.stepSize);
    },
    emitDecremented() {
       this.$emit("input", this.value - this.stepSize);
    },
    incrementHandleMousedown() {
      if(!this.holdToAutoTap) return;
      this.incrementTimer = setInterval(()=>{
        this.isLastIncrementValue ?
          this.endAutoTap() :
          this.emitIncremented();
      }, this.autoTapRepeatIncrementMilliseconds)
    },
    decrementHandleMousedown() {
      if(!this.holdToAutoTap) return;
      this.decrementTimer = setInterval(()=>{
        this.isLastDecrementValue ?
          this.endAutoTap() :
          this.emitDecremented();
      }, this.autoTapRepeatIncrementMilliseconds)
    },
    endAutoTap() {
      if(this.incrementTimer) clearInterval(this.incrementTimer);
      if(this.decrementTimer) clearInterval(this.decrementTimer);
    },
    validateProps() {
      if(this.value < this.minValue) throw new TypeError(`\`value\` (= ${this.value}) may not be less than than \`minValue\` (= ${this.minValue}). (${this.value} < ${this.minValue} == ${this.value < this.minValue})`);
      if(this.maxValue && this.maxValue < this.minValue) throw new TypeError(`\`maxValue\` (= ${this.maxValue}) may not be less than than \`minValue\` (= ${this.minValue}). (${this.maxValue} < ${this.minValue} == ${this.maxValue < this.minValue})`);
      if(this.stepSizeAndMaxValueConflict) throw new TypeError(`\`maxValue\` (= ${this.maxValue}) must be a multiple of \`stepSize\` (= ${this.stepSize}). (${this.maxValue} % ${this.stepSize} -> ${this.maxValue % this.stepSize} , should be 0)`);
    }
  },
  watch: {
    stepSize() {
      this.validateProps();
    },
    maxValue() {
      this.validateProps();
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>

$color-stepper-background: #EEEEEF;

@mixin round-left($rounding-amount) {
  border-radius: $rounding-amount 0px 0px $rounding-amount;
}

@mixin round-right($rounding-amount) {
  border-radius: 0px $rounding-amount $rounding-amount 0px;
}


.stepper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: $color-stepper-background;
  -webkit-user-select: none; // Hide the text-selection magnifier on Mobile Safari

  font-size: 1rem;
  border-radius: 8px;
  width: fit-content;

  button {
    display:flex;
    flex-direction:row;
    border: none;
    position: relative;
    background: transparent;
    padding: 0.4rem 0.9rem;
    border-radius: 0px;
    margin: 0px;
    -webkit-appearance:none;

    
    &:hover:not(:disabled) {
      background: darken($color-stepper-background, 5);
    }

    &:active:not(:disabled) {
      background: darken($color-stepper-background, 15);
    }

    &:first-of-type {
      @include round-left(8px);
    }

    &:last-of-type {
      @include round-right(8px);
    }

    &:disabled {
      opacity: 0.3;
    }
  }



  button:last-of-type::before {
    position: absolute;
    left: 0;
    content:" ";
    display: block;
    height: 60%;
    width: 1px;
    background: #D6D6D9;;
  }

  .minus-icon {
    height: 20px;
    width: 20px;
    transform: translateY(1px);
    background: transparent url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9 Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4x Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2 ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0Jv eD0iMCAwIDMwIDMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMu b3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5 OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6 Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAt cnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9p bjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjU7Ij4KICAgIDxnIHRyYW5zZm9y bT0ibWF0cml4KDEsMCwwLDEsLTE3OC44NCwtNzcuNjg0NikiPgogICAgICAgIDxn IHRyYW5zZm9ybT0ibWF0cml4KDEuMDM2MDUsMCwwLDEsLTUuMTY1NCwtNjkuNjI2 NikiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTc5LjA1MSwxNDguODExTDIwNC45 NDIsMTQ4LjgxMSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6YmxhY2s7c3Ryb2tl LXdpZHRoOjIuOTVweDsiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=') no-repeat center center;
  }

  .plus-icon {
    height: 18px;
    width: 18px;
    margin-top: 1px;
    margin-bottom: 1px;
    background: transparent url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9 Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4x Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2 ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0Jv eD0iMCAwIDI5IDI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3Lncz Lm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5 OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRw Oi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlw LXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpv aW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS41OyI+CiAgICA8ZyB0cmFuc2Zv cm09Im1hdHJpeCgxLDAsMCwxLC0yNzIuMzk3LC02NS4yMjI0KSI+CiAgICAgICAg PGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLC02OS44OTg0KSI+CiAgICAg ICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTY2MTM4LDAsMCwxLDEwMC45 MDksMC4yNzE3OTQpIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNzkuMDUx LDE0OC44MTFMMjA0Ljk0MiwxNDguODExIiBzdHlsZT0iZmlsbDpub25lO3N0cm9r ZTpibGFjaztzdHJva2Utd2lkdGg6My4wNXB4OyIvPgogICAgICAgICAgICA8L2c+ CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDUuODk0NzRlLTE3LC0w Ljk2MjY4NSwxLDYuMTIzMjNlLTE3LDEzNy41OTMsMzMzLjkxNSkiPgogICAgICAg ICAgICAgICAgPHBhdGggZD0iTTE3OS4wNTEsMTQ4LjgxMUwyMDQuOTQyLDE0OC44 MTEiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoz LjA2cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+ Cjwvc3ZnPgo=') no-repeat center center;
    
  }
}
</style>