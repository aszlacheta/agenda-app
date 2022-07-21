import moment from 'moment';

/**
* Hook used to determine time for new agenda entry
* @param {Object} lastSetEntry last (from the list) agenda entry data
* @returns {number} number of minutes to add to original start date from entry (agenda row)
*/
export default function useProposedTime (lastSetEntry, endingEntry) {
  const difference = moment.duration(endingEntry?.startDate - lastSetEntry?.startDate);
  const differenceMins = difference.asMinutes();
  const availableDurations = [60, 30, 15, 10, 5];
  let index = -1;

  availableDurations.some((time, i) => {
    if (differenceMins > time) {
      index = i;
      return time;
    }

    return undefined;
  });

  return index >= 0 ? availableDurations[index] : undefined;
}
