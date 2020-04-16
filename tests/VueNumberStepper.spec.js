import VueStepper from "../src/vue-number-stepper.vue";

import { mount, shallowMount } from "@vue/test-utils";

import "./testHelper";


const SELECTORS = {
  INCREMENT_BUTTON: "*[data-test-target='increment']",
  DECREMENT_BUTTON: "*[data-test-target='decrement']",
}

describe('VueStepper', () => {

  describe('validate', () => {
    let originalConsoleError;

    beforeAll(()=> {
       originalConsoleError = console.error;
       console.error = () => {};
    });

    afterAll(()=>{
      console.error = originalConsoleError;
    });
    
    it('should not allow maxValue to be smaller than minValue', () => {
      expect(() => {
        mount(VueStepper, {propsData: {value: 0, maxValue: 0, minValue: 2}});
      }).toThrow(TypeError);
    })
  })
  describe('disabled', () => {
    const initialValue = 42;
    let component;

    beforeEach(()=> {
      component = shallowMount(VueStepper, {propsData: {value: initialValue, isDisabled: true}});
    });

    it('should not emit increment', () => {
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("click");
      expect(component.emittedByOrder()).toHaveLength(0);
    })

    it('should not emit increment', () => {
      component.find(SELECTORS.DECREMENT_BUTTON).trigger("click");
      expect(component.emittedByOrder()).toHaveLength(0);
    })

    it('should disable the increment button', async () => {
      expect(component).toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
    })

    it('should disable the decrement button', async () => {
      expect(component).toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
    })
  })

  describe('normal, no limits', () => {
    const initialValue = 42;
    const incrementedValue = initialValue + 1;
    const decrementedValue = initialValue - 1;
    let component;

    beforeEach(()=> {
      component = mount(VueStepper, {propsData: {value: initialValue}});
    });

    it('should emit the incremented value', () => {
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("click");
      expect(component.emittedByOrder()[0].args[0]).toBe(incrementedValue);
    })

    it('should emit the decremented value', () => {
      component.find(SELECTORS.DECREMENT_BUTTON).trigger("click");
      expect(component.emittedByOrder()[0].args[0]).toBe(decrementedValue);
    })

    it('should not disable the increment button', async () => {
      expect(component).not.toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
    })

    it('should not disable the decrement button', async () => {
      expect(component).not.toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
    })
  })

  describe('min value', () => {

    const minValue = 42;
    const belowMinValue = 41;
    const aboveMinValue = 43;
    let component;

    beforeEach(()=> {
      component = mount(VueStepper, {propsData: {value: minValue, minValue: minValue}});
    });

    describe('is at minValue', () => {
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: minValue, minValue: minValue}});
      });

      it('should disable the decrement button', async () => {
        expect(component).toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })

      it('should not disable the increment button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })
    })

    describe('is equal to minValue', () => {      
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: minValue, minValue: minValue}});
      });

      it('should disable the decrement button', async () => {
        expect(component).toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })

      it('should not disable the increment button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })
    })

    describe('is greater than minValue', () => {
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: aboveMinValue, minValue: minValue}});
      });

      it('should not disable the decrement button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })

      it('should not disable the increment button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })
    })
  })

  describe('max value', () => {

    const maxValue = 42;
    const belowMaxValue = 41;
    const aboveMaxValue = 43;
    let component;

    describe('is at maxValue', () => {
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: maxValue, maxValue: maxValue}});
      });

      it('should disable the increment button', async () => {
        expect(component).toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })

      it('should not disable the decrement button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })
    })

    describe('is less than maxValue', () => {
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: belowMaxValue, maxValue: maxValue}});
      });

      it('should not disable the decrement button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })

      it('should not disable the increment button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })
    })

    describe('is greater than maxValue', () => {
      beforeEach(()=> {
        component = mount(VueStepper, {propsData: {value: aboveMaxValue, maxValue: maxValue}});
      });

      it('should disable the increment button', async () => {
        expect(component).toHaveDisabledElement(SELECTORS.INCREMENT_BUTTON);
      })

      it('should not disable the decrement button', async () => {
        expect(component).not.toHaveDisabledElement(SELECTORS.DECREMENT_BUTTON);
      })
    })
  })

  describe('custom step', () => {
    let component;

    it('should have a step size of 1 by default', () => {
      component = mount(VueStepper, {propsData: {value: 0}});
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("click");
      const event = component.emittedByOrder()[0];
      expect(event.args[0]).toBe(1);
    })

    it('should increment using the custom step', () => {
      component = mount(VueStepper, {propsData: {value: 0, stepSize: 3}});
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("click");
      const expected = 3;
      const actual = component.emittedByOrder()[0].args[0];
      expect(actual).toBe(expected);
    })

    it('should decrement using the custom step', () => {
      component = mount(VueStepper, {propsData: {value: 3, stepSize: 3}});
      component.find(SELECTORS.DECREMENT_BUTTON).trigger("click");
      const expected = 0;
      const actual = component.emittedByOrder()[0].args[0];
      expect(actual).toBe(expected);
    })

    describe('with maxValue', () => {
      let originalConsoleError;

      beforeAll(()=> {
         originalConsoleError = console.error;
         console.error = () => {};
      });

      afterAll(()=>{
        console.error = originalConsoleError;
      });

      it('should throw if mounted and `maxValue` is not a multiple of `stepSize`', () => {
        expect(()=>{
          component = mount(VueStepper, {propsData: {value: 0, stepSize: 2, maxValue: 3}});
        }).toThrow()
      })

      it('should throw if `maxValue` is changed to a value that is not a multiple of `stepSize`', async () => {
        component = mount(VueStepper, {propsData: {value: 0, stepSize: 2, maxValue: 4}});
        component.setProps({maxValue: 3});
        
        expect(() => {
          component.vm.$options.watch.maxValue.call(component.vm);
        }).toThrow(TypeError);
      })

      it('should throw if `stepSize` is changed to a value that `maxValue` is not divisible by', async () => {
        component = mount(VueStepper, {propsData: {value: 0, stepSize: 2, maxValue: 4}});
        component.setProps({stepSize: 3});
        expect(() => {
          component.vm.$options.watch.maxValue.call(component.vm);
        }).toThrow(TypeError);
      })
    })
  })

  describe('autotap', () => {
    const defaultValue = 42;
    const maxValue = 50;
    const minValue = 0;
    const incrementedValue = defaultValue + 1;
    const decrementedValue = defaultValue - 1;
    const autoTapRepeatIntervalMs = 250;
    let component;

    beforeEach(()=> {
      jest.useFakeTimers();
      component = mount(VueStepper, {propsData: {value: defaultValue, maxValue, minValue, autoTapRepeatIncrementMilliseconds: autoTapRepeatIntervalMs}});
    });

    describe('autotap disabled', () => {
      it('increment should not autotap if `holdToAutoTap` is false', () => {
        component = mount(VueStepper, {propsData: {value: defaultValue, holdToAutoTap: false}});
        component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
        jest.advanceTimersByTime(autoTapRepeatIntervalMs);
        const events = component.emittedByOrder();
        expect(events.length).toBe(0);
      })

      it('decrement should not autotap if `holdToAutoTap` is false', () => {
        component = mount(VueStepper, {propsData: {value: defaultValue, holdToAutoTap: false}});
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
        jest.advanceTimersByTime(autoTapRepeatIntervalMs);
        const events = component.emittedByOrder();
        expect(events.length).toBe(0);
      })
    })

    describe('lifecycle hooks', () => {
      it('should clear all timers when destroyed', () => {
        component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
        component.destroy();
        expect(clearInterval).toHaveBeenCalledTimes(2);
      })
    })

    describe('increment', () => {
     it('should emit an event for every `autoTapRepeatIntervalMs` milliseconds that the mouse button is held down', async () => {
       const cycleCount = 4;
       component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
       jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
       const events = component.emittedByOrder();
       expect(events.length).toBe(cycleCount);
       expect(events.map(e => e.args[0])).toEqual([incrementedValue, incrementedValue, incrementedValue, incrementedValue]) // Actually incrementing `value` is the responsibility of the parent component. In the test environment the number isn't actually incremnted, so this case the same value is emitted 4 times
     })

     it('should stop emitting events when the mouse is released', async () => {
      const cycleCount = 4;
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
      jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mouseup");
      jest.advanceTimersByTime(autoTapRepeatIntervalMs);
      expect(component.emittedByOrder().length).toBe(cycleCount);
     })

     it('should stop emitting events when the mouse is moved', async () => {
      const cycleCount = 4;
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
      jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mouseout");
      jest.advanceTimersByTime(autoTapRepeatIntervalMs);
      expect(component.emittedByOrder().length).toBe(cycleCount);
     })

     it('should not emit events when the max is already reached', async (done) => {
      component = mount(VueStepper, {propsData: {value: maxValue - 1, maxValue, minValue, autoTapRepeatIncrementMilliseconds: autoTapRepeatIntervalMs}});
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
      component.setProps({value: maxValue});
      jest.advanceTimersByTime(500);
      const eventCount = component.emittedByOrder().length;
      expect(eventCount).toBe(0);
      done();
     })

     it('should continue emitting events if there is no max', async () => {
       const expectedEventCount = 100;
      component = mount(VueStepper, {propsData: {value: 0, minValue, autoTapRepeatIncrementMilliseconds: 1}});
      component.find(SELECTORS.INCREMENT_BUTTON).trigger("mousedown");
      jest.advanceTimersByTime(100);
      const eventCount = component.emittedByOrder().length;
      expect(eventCount).toBe(expectedEventCount);
     })
    })

    describe('decrement', () => {
      it('should emit an event for every `autoTapRepeatIntervalMs` milliseconds that the mouse button is held down', async () => {
        const cycleCount = 4;
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
        jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
        const events = component.emittedByOrder();
       expect(events.length).toBe(cycleCount);
       expect(events.map(e => e.args[0])).toEqual([decrementedValue, decrementedValue, decrementedValue, decrementedValue]) // Actually incrementing `value` is the responsibility of the parent component. In the test environment the number isn't actually incremnted, so this case the same value is emitted 4 times
      })
 
      it('should stop emitting events when the mouse is released', async () => {
       const cycleCount = 4;
       component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
       jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
       component.find(SELECTORS.DECREMENT_BUTTON).trigger("mouseup");
       jest.advanceTimersByTime(autoTapRepeatIntervalMs);
       expect(component.emittedByOrder().length).toBe(cycleCount);
      })

      it('should stop emitting events when the mouse is moved', async () => {
        const cycleCount = 4;
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
        jest.advanceTimersByTime(autoTapRepeatIntervalMs * cycleCount);
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mouseout");
        jest.advanceTimersByTime(autoTapRepeatIntervalMs);
        expect(component.emittedByOrder().length).toBe(cycleCount);
       })

       it('should stop emitting events when the min is reached', async () => {
        component = mount(VueStepper, {propsData: {value: minValue + 2, maxValue, minValue, autoTapRepeatIncrementMilliseconds: autoTapRepeatIntervalMs}});
        component.find(SELECTORS.DECREMENT_BUTTON).trigger("mousedown");
        component.setProps({value: minValue + 1});
        jest.advanceTimersByTime(autoTapRepeatIntervalMs);
        component.setProps({value: minValue });
        jest.advanceTimersByTime(autoTapRepeatIntervalMs);
        const actualEventCount = component.emittedByOrder().length;
        expect(actualEventCount).toBe(1);
       })
    })
  })
})