import InputDispatcher from './components/input'
import AutoCompleteDispatcher from './components/auto-complete'
import InputNumberDispatcher from './components/input-number'
import SelectDispatcher from './components/select'
import RadioGroupDispatcher from './components/radio-group'
import RadioDispatcher from './components/radio'
import CheckboxGroupDispatcher from './components/checkbox-group'
import CheckboxDispatcher from './components/checkbox'
import DatePickerDispatcher from './components/date-picker'
import TimePickerDispatcher from './components/time-picker'
import SwitchDispatcher from './components/switch'
import RateDispatcher from './components/rate'
import SliderDispatcher from './components/slider'

import { RWDispatcher } from './rw-dispatcher'
import OPTIONS, { setOptions } from './options'
import packageJSON from './package.json'

const components = {
  InputDispatcher,
  iInputDispatcher: InputDispatcher,
  AutoCompleteDispatcher,
  InputNumberDispatcher,
  SelectDispatcher,
  iSelectDispatcher: SelectDispatcher,
  RadioGroupDispatcher,
  RadioDispatcher,
  CheckboxGroupDispatcher,
  CheckboxDispatcher,
  DatePickerDispatcher,
  TimePickerDispatcher,
  SwitchDispatcher,
  iSwitchDispatcher: SwitchDispatcher,
  RateDispatcher,
  SliderDispatcher
}

const install = function (Vue, opts = {}) {
  setOptions(opts)
  for (let [name, component] of Object.entries(components)) {
    component.reset(OPTIONS)
    Vue.component(name, component)
  }
}

export {
  InputDispatcher,
  AutoCompleteDispatcher,
  InputNumberDispatcher,
  SelectDispatcher,
  RadioGroupDispatcher,
  RadioDispatcher,
  CheckboxGroupDispatcher,
  CheckboxDispatcher,
  DatePickerDispatcher,
  TimePickerDispatcher,
  SwitchDispatcher,
  RateDispatcher,
  SliderDispatcher,
  RWDispatcher
}

export default {
  version: packageJSON.version,
  install,
  ...components
}
