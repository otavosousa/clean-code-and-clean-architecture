const NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_1 = 11
const NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_2 = 12
const NUMBER_QUANTITY_CHARACTERS = 9
const DIGIT_ZERO = 0

function isNumberCharactersValid(cpf: string): boolean{
  return cpf.length >= 11 || cpf.length<= 14
}

function sanitizeCpf(cpf: string): string{
  return cpf
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(" ", "");
}

function isAllCharactersEquals(cpf: string): boolean{
  return cpf.split("").every(character => character === cpf[0])
}

function calculateCheckDigit(cpf: string): string{
  const reference = cpf.length === NUMBER_QUANTITY_CHARACTERS ? NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_1 : NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_2
  const calculatedCharacters = cpf.split('').reduce((result, character, index) => {
    return result + ( reference - (index + 1) ) * Number(character)
  }, 0)
  const calculatedRest = calculatedCharacters % 11
  return String(calculatedRest < 2 ? DIGIT_ZERO : 11 - calculatedRest)
}

function removeCheckDigits(cpf: string): string{
  return cpf.split('').slice(0, -2).join('')
}

function addCheckDigit(cpf: string, checkDigit: string): string{
  return cpf + checkDigit
}

export const validateCpf = function(cpf: string): boolean{
  if(!cpf) return false
  if(!isNumberCharactersValid(cpf)) return false
  cpf = sanitizeCpf(cpf)
  if(isAllCharactersEquals(cpf)) return false
  const checkDigits = cpf.slice(-2)
  cpf = removeCheckDigits(cpf)
  const checkDigit1 = calculateCheckDigit(cpf)
  cpf = addCheckDigit(cpf, checkDigit1)
  const checkDigit2 = calculateCheckDigit(cpf)
  return checkDigits === (checkDigit1 + checkDigit2)
}
