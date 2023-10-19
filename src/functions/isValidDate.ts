const isValidDate = (inputString: any) => {
  const date = new Date(inputString)
  return !isNaN(date.getTime());
}

export default isValidDate;
