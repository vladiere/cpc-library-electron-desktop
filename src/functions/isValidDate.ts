const isValidDate = (inputString: unknown) => {
  const date = new Date(inputString)
  console.log(inputString, '\n', date.getTime())
  console.log(!isNaN(date.getTime()));
  return !isNaN(date.getTime());
}

export default isValidDate;
