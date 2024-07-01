export const generatedPassword: HTMLElement = document.querySelector('.password-generator__generated-password')!
export const copyIcon: SVGElement = document.querySelector('.password-generator__status-icon')!
export const generatedPasswordStatusText: HTMLElement = document.querySelector('.password-generator__status-text')!

export const passwordLenghthText: HTMLElement = document.querySelector('.password-generator__character-length-number')!
export const rangeInput: HTMLInputElement = document.querySelector('.password-generator__range-input')!

export const hasUpperCheckbox: HTMLInputElement = document.querySelector('.password-generator__option #uppercase')!
export const hasLowerCheckbox: HTMLInputElement = document.querySelector('.password-generator__option #lowercase')!
export const hasNumberCheckbox: HTMLInputElement = document.querySelector('.password-generator__option #numbers')!
export const hasSymbolCheckbox: HTMLInputElement = document.querySelector('.password-generator__option #symbols')!

export const passwordGeneratorStrengthLevel: HTMLElement = document.querySelector('.password-generator__strength-level')!
export const passwordStrengthLevelIndicators: NodeListOf<HTMLElement> = document.querySelectorAll('.password-generator__indicator-box')!

export const indicatorsArray = Array.from(passwordStrengthLevelIndicators)

export const generatePassBtn: HTMLButtonElement = document.querySelector('.password-generator__generate-btn')!
export const errorMessage: HTMLElement = document.querySelector('.error-message')!
