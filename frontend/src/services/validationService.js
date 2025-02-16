export const validateTimeInput = (value) => {
  let numVal = Number(value)

  if (numVal < 0.25) numVal = 0.25 

  if (numVal % 0.25 !== 0 ) {
    numVal = Math.round(numVal * 4) / 4
  }
  return numVal
}

export const validateTaskWeight = (value) => {
  let numVal = Number(value)

  if (numVal > 10) {
    numVal = 10
  } else if (numVal < 1) {
    numVal = 1
  } else if (numVal % 1 !== 0) {
    numVal = Math.round(numVal)
  }
  return numVal
}