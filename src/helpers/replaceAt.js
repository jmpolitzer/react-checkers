export default function replaceAt(array, index, item) {
  const newArray = array.splice(0)
  newArray[index] = item

  return newArray
}
