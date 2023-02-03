const NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_1 = 11
const NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_2 = 12

function isNumberCharactersValid(cpf: string){
  return cpf.length >= 11 || cpf.length<= 14
}

function sanitizeCpf(cpf: string){
  return cpf
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(" ", "");
}

function isAllCharactersEquals(cpf: string){
  return cpf.split("").every(character => character === cpf[0])
}

function calculateCharacter(character: string, index: number, reference: number): number{
  return ( reference - (index + 1) ) * Number(character)
}

function calculateCheckDigit(calculatedCharacters: number){
  const calculateRest = calculatedCharacters % 11
  return calculateRest < 2 ? 0 : 11 - calculateRest
}

function calculateCharacters(cpf: string[], reference: number): number{
  return cpf.reduce((result, character, index) => {
    return result + calculateCharacter(character, index, reference)
  }, 0)
}

export const validateCpf = function(cpf: string){
  if(!cpf) return false
  if(!isNumberCharactersValid(cpf)) return false
  cpf = sanitizeCpf(cpf)
  if(isAllCharactersEquals(cpf)) return false
  const cpfWithoutCheckDigits = cpf.split('').slice(0, -2)
  const calculateCharactersCheckDigit1 = calculateCharacters(cpfWithoutCheckDigits, NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_1)
  const checkDigit1 = calculateCheckDigit(calculateCharactersCheckDigit1)
  const calculateCharactersCheckDigit2 = calculateCharacters(cpfWithoutCheckDigits, NUMBER_REFERENCE_CALCULATE_CHECK_DIGIT_2) + 2 * checkDigit1
  const checkDigit2 = calculateCheckDigit(calculateCharactersCheckDigit2)
  const isValidCpf = cpf.slice(-2) === `${checkDigit1}${checkDigit2}`
  return isValidCpf
}

console.log(validateCpf('43678854028'))
