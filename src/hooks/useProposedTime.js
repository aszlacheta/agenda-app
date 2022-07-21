import moment from "moment";

/**
* Hook used to determine time for new agenda entry
* @param {Object} lastSetEntry last (from the list) agenda entry data
* @returns {number} number of minutes to add to original start date from entry (agenda row)
*/
export default function useProposedTime(lastSetEntry, endingEntry) {
    const difference = moment.duration(endingEntry?.startDate - lastSetEntry?.startDate);
    const differenceMins = difference.asMinutes();

    if (differenceMins > 60) {
        return 60;
    } else if (differenceMins > 30) {
        return 30;
    } else if (differenceMins > 15) {
        return 15;
    } else if (differenceMins > 10) {
        return 10;
    } else if (differenceMins > 5) {
        return 5;
    } else {
        return undefined;
    }
}