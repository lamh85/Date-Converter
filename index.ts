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
    return commaSolution(input)
  }

  // const inputSplit = input.split(/[^0-9a-zA-Z]/g)

  // Temporary for satisfying Typescript
  return ERROR_RESULT
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

  const dayMonth = commaSplit[0]
  const dayMonthNormalized = resolveDayMonth(dayMonth)

  if (!dayMonthNormalized.day || !dayMonthNormalized.month) {
    return {
      ...ERROR_RESULT,
      ...dayMonthNormalized,
      year,
      status: 'error',
    }
  }

  return {
    year,
    day: dayMonthNormalized.day,
    month: dayMonthNormalized.month,
    status: 'ok',
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

type ResolvedDayMonthT = {
  day: number | null
  month: number | null
}

const resolveDayMonth = (input: string): ResolvedDayMonthT => {
  if (/[A-Z]/i.test(input)) {
    // find month name
    // EG: "1 Sep(tember)", "Sep(tember) 1", etc
    // month.toLowerCase().includes(item.toLocaleLowerCase())
  }

  if (/[0-9]/i.test(input)) {
    return resolveNumberedDayMonth(input)
  }

  return { day: null, month: null }
}

// Only used if both day and month use numbers
const resolveNumberedDayMonth = (input: string): ResolvedDayMonthT => {
  const tokenSplit = input.split(/[^A-Z0-9]/gi)

  let tokenSplitMonthIndex: number | null = null
  let tokenSplitDayIndex: number | null = null

  tokenSplit.forEach((token, tokenIndex) => {
    if (tokenSplitMonthIndex || tokenSplitDayIndex) {
      return
    }

    // If a token is more than 12, then it must be the day rather than month
    if (!isNaN(Number(token)) && Number(token) > 12) {
      tokenSplitDayIndex = tokenIndex
      const remainingIndex = tokenIndex == 0 ? 1 : 0
      tokenSplitMonthIndex = remainingIndex
    }
  })

  if (tokenSplitMonthIndex && tokenSplitDayIndex) {
    const day = tokenSplit[tokenSplitDayIndex]
    const month = tokenSplit[tokenSplitMonthIndex]

    return { day: Number(day), month: Number(month) }
  }

  return { day: null, month: null }
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
