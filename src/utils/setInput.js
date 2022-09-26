export function setInputType(input) {
  if (input === 'password') {
    return 'password'
  }
  if (input === 'email') {
    return 'email'
  }
  return 'text'
}

export function setInputLabel(input) {
  if (input === 'dob') {
    return 'Date of Birth'
  }
  return input.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}
