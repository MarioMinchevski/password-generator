import { RandomStringParametersType } from "./types"
import { initialAnimation, typewriterEffect } from "./utils/animations.js"
import { PasswordStrength } from "./utils/enums.js"
import { rangeInput, generatedPassword, generatedPasswordStatusText, passwordLenghthText, indicatorsArray, copyIcon, generatePassBtn, hasUpperCheckbox, hasLowerCheckbox, hasNumberCheckbox, hasSymbolCheckbox, errorMessage, passwordGeneratorStrengthLevel } from "./utils/vars.js"

let passwordStrenghtStatus: string
// initialAnimation()

// range input fill func

const updateBackground = () => {
    const value = rangeInput.value
    const min = rangeInput.min || '0'
    const max = rangeInput.max || '20'
    const progress = (parseInt(value) - parseInt(min)) / (parseInt(max) - parseInt(min)) * 100

    rangeInput.style.background = `linear-gradient(to right, ${'#a4ffaf'} ${progress}%, ${'#18171f'} ${progress}%)`
}

rangeInput.addEventListener('input', updateBackground)

// update the fill on page load

updateBackground()

// copy generated pass func 

const copyGeneratedPass = async () => {
    try {
        const textToCopy = generatedPassword.textContent

        if (textToCopy && !generatedPassword.classList.contains('default')) {
            await navigator.clipboard.writeText(textToCopy)
            generatedPasswordStatusText.classList.remove('hidden')
        }
    } catch {
        throw new Error('Failed to copy, try again')
    }
}

// update password lenght text

const updatePasswordLenghtText = () => {
    passwordLenghthText.textContent = rangeInput.value
}

// check password strenght

const checkPasswordStrenght = (pass: string) => {
    const passwordLenght = pass.length
    const hasLowerCase = /[a-z]/.test(pass)
    const hasUpperrCase = /[A-Z]/.test(pass)
    const hasNumbers = /[0-9]/.test(pass)
    const hasSymbols = /[^a-zA-Z0-9]/.test(pass)

    let passwordStrenghtScore = 0

    if (passwordLenght > 6) passwordStrenghtScore += 1
    if (passwordLenght >= 10) passwordStrenghtScore += 1
    if (passwordLenght >= 14) passwordStrenghtScore += 1

    if (hasLowerCase) passwordStrenghtScore += 1
    if (hasUpperrCase) passwordStrenghtScore += 1
    if (hasNumbers) passwordStrenghtScore += 1
    if (hasSymbols) passwordStrenghtScore += 1

    switch (true) {
        case (passwordStrenghtScore <= 2):
            passwordStrenghtStatus = PasswordStrength.TooWeak
            break
        case (passwordStrenghtScore <= 4):
            passwordStrenghtStatus = PasswordStrength.Weak
            break
        case (passwordStrenghtScore <= 6):
            passwordStrenghtStatus = PasswordStrength.Medium
            break
        default:
            passwordStrenghtStatus = PasswordStrength.Strong
            break
    }

    return passwordStrenghtStatus
}

// generate random string 

const generateRandomString = ({
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
}: RandomStringParametersType) => {
    let chars = ""

    if (hasUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (hasLower) chars += "abcdefghijklmnopqrstuvwxyz"
    if (hasNumber) chars += "0123456789"
    if (hasSymbol) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let randomStringResult: string = ''

    for (let i = 0; i <= length; i++) {
        randomStringResult += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return randomStringResult
}

const updatePasswordStrenghtIndicators = () => {
    let newArr: HTMLElement[] = []

    indicatorsArray.forEach(el => {
        el.className = 'password-generator__indicator-box'
    })

    switch (true) {
        case passwordStrenghtStatus === PasswordStrength.TooWeak:
            newArr = indicatorsArray.slice(0, 1)
            newArr.forEach(el => {
                el.classList.add('fill-too-weak')
            })
            break
        case passwordStrenghtStatus === PasswordStrength.Weak:
            newArr = indicatorsArray.slice(0, 2)
            newArr.forEach(el => {
                el.classList.add('fill-weak')
            })
            break
        case passwordStrenghtStatus === PasswordStrength.Medium:
            newArr = indicatorsArray.slice(0, 3)
            newArr.forEach(el => {
                el.classList.add('fill-medium')
            })
            break
        case passwordStrenghtStatus === PasswordStrength.Strong:
            newArr = indicatorsArray.slice(0, 4)
            newArr.forEach(el => {
                el.classList.add('fill-strong')
            })
            break
        default:
            break
    }
}

// event listeners

copyIcon.addEventListener('click', copyGeneratedPass)
rangeInput.addEventListener('input', updatePasswordLenghtText)

generatePassBtn.addEventListener('click', () => {
    const passwordLength = rangeInput.valueAsNumber - 1
    const hasUpper = hasUpperCheckbox.checked
    const hasLower = hasLowerCheckbox.checked
    const hasNumber = hasNumberCheckbox.checked
    const hasSymbol = hasSymbolCheckbox.checked

    const invalidInput =
        !hasUpper &&
        !hasLower &&
        !hasNumber &&
        !hasSymbol

    if (invalidInput) {
        errorMessage.classList.remove('hidden')
        return
    }

    const newGeneratedPassword = generateRandomString({
        length: passwordLength,
        hasUpper: hasUpper,
        hasLower: hasLower,
        hasNumber: hasNumber,
        hasSymbol: hasSymbol
    })

    generatedPassword.textContent = newGeneratedPassword
    generatedPassword.classList.remove('default')

    typewriterEffect(generatedPassword, newGeneratedPassword)

    passwordGeneratorStrengthLevel.textContent = checkPasswordStrenght(newGeneratedPassword)
    updatePasswordStrenghtIndicators()

    generatedPasswordStatusText.classList.add('hidden')
    errorMessage.classList.add('hidden')
})