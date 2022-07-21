/**
 * Hook used to generate random id
 * @param {number} min minimal value of the id
 * @param {number} max maxiumum value of the id
 * @returns {number} id
 */
export default function useRandomId (min = 0, max = 10000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
