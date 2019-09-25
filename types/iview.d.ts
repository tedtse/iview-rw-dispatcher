import Vue from 'vue'

import { RWDispatcher as IviewRWDispatcher } from './rw-dispatcher'
import { InputDispatcher as IviewInputDispatcher } from './input'
import { InputNumberDispatcher as IviewInputNumberDispatcher } from './input-number'
import { AutocompleteDispatcher as IviewAutocompleteDispatcher } from './autocomplete'
import { SelectDispatcher as IviewSelectDispatcher } from './select'
import { DatePickerDispatcher as IviewDatePickerDispatcher } from './date-picker'
import { TimePickerDispatcher as IviewTimePickerDispatcher } from './time-picker'
import { SwitchDispatcher as IviewSwitchDispatcher } from './switch'
import { CheckboxDispatcher as IviewCheckboxDispatcher } from './checkbox'
import { CheckboxGroupDispatcher as IviewCheckboxGroupDispatcher } from './checkbox-group'
import { RadioDispatcher as IviewRadioDispatcher } from './radio'
import { RadioGroupDispatcher as IviewRadioGroupDispatcher } from './radio-group'
import { RateDispatcher as IviewRateDispatcher } from './rate'
import { SliderDispatcher as IviewSliderDispatcher } from './slider'

export function install (vue: typeof Vue, options: any): void

export class RWDispatcher extends IviewRWDispatcher {}
export class InputDispatcher extends IviewInputDispatcher {}
export class InputNumberDispatcher extends IviewInputNumberDispatcher {}
export class AutocompleteDispatcher extends IviewAutocompleteDispatcher {}
export class SelectDispatcher extends IviewSelectDispatcher {}
export class DatePickerDispatcher extends IviewDatePickerDispatcher {}
export class TimePickerDispatcher extends IviewTimePickerDispatcher {}
export class SwitchDispatcher extends IviewSwitchDispatcher {}
export class CheckboxDispatcher extends IviewCheckboxDispatcher {}
export class CheckboxGroupDispatcher extends IviewCheckboxGroupDispatcher {}
export class RadioDispatcher extends IviewRadioDispatcher {}
export class RadioGroupDispatcher extends IviewRadioGroupDispatcher {}
export class RateDispatcher extends IviewRateDispatcher {}
export class SliderDispatcher extends IviewSliderDispatcher {}
