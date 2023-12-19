interface CounMap {
  [key: string]: number;
}

export const countAllOccurrence = (arr: Array<{ value: string }>): CounMap => {
  return arr.reduce((countMap: CounMap, obj: { value: string }) => {
    const value = obj.value;
    countMap[value] = (countMap[value] || 0) + 1;
    return countMap;
  },{});
}
