export const pagesFancStart: (a: number)=> number =(current)=> {
  if (current <= 5) {
    return current
  }
  if (current >= 204) {
    return current - 199
  }
  return 5
};

export const pagesFancEnd: (a: number)=> number =(current)=> {
  if (current <= 5) {
    return 10 - current
  }
  return 5
};