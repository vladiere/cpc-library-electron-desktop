const isValidDate = (inputString: unknown) => {
  const date = new Date(inputString)
  return !isNaN(date.getTime());
}

export default isValidDate;
