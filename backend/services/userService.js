
export const validatePassword = (uploadedPassword, savedPassword) => {
  if (uploadedPassword !== savedPassword) {
    return false
  }
  return true
}