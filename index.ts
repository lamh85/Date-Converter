type InputT = string

type NormalizedT = {
  month: number | null
  year: number | null
  day: number | null
  status: 'ok' | 'error'
}

const ERROR_RESULT: NormalizedT = {
  month: null,
  year: null,
  day: null,
  status: 'error',
}

const run = (input: InputT): NormalizedT => {
  // First, do the obvious clues:
  // month name, numbers with 4 digits, commas

  // EG: september 1, 2020
  if (input.includes(',')) {
    return commaSolution()
  }

  // const inputSplit = input.split(/[^0-9a-zA-Z]/g)
}

// Only accepted formats:
// 1 September, 2020
// September 1, 2020
const commaSolution = (input: InputT): NormalizedT => {
  if (input.match(/,/g)?.length !== 1) {
    return ERROR_RESULT
  }

  const commaSplit: string[] = input.split(',')
  const possibleYear = commaSplit[1]

  const year = resolveYear(possibleYear)
  if (!year) {
    return ERROR_RESULT
  }
}

const resolveYear = (input: any): number | null => {
  const NOT_FOUND = null

  if (typeof Number(input) !== 'number') {
    return NOT_FOUND
  }

  if (input.length === 4) {
    return Number(input)
  }

  if (input.length !== 2) {
    return NOT_FOUND
  }

  const currentYear = new Date().toISOString().split('-')[0]
  const yearPadding = currentYear.slice(currentYear.length - 2)
  const concatenated = Number(`${yearPadding}${String(input)}`)
  return concatenated
}

const findMonthByName = (inputSplit: (string | number)[]) => {
  inputSplit.forEach((part) => {})
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
