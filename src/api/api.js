import axios from 'axios';

export const DEFAULT_BACKEND_URL = 'http://localhost';

/**
 * Method used to get initial data of given agenda
 * @param {string} agendaId id of agenda
 * @returns
 */
export function getAgenda (agendaId) {
  return axios.get(`${DEFAULT_BACKEND_URL}/agenda/${agendaId}`)
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Method used to delete entry from agenda
 *
 * @param {string} agendaId ID of the agenda
 * @param {string} entryId ID of the entry to be deleted
 * @returns {Promise}
 */
export function deleteAgendaEntry (agendaId = '', entryId = '') {
  return axios.delete(`${DEFAULT_BACKEND_URL}/agenda/${agendaId}/${entryId}`)
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Method used to add new entry to given agenda
 * @param {string} agendaId
 * @param {{startDate, endDate, name, description}} entry
 * @returns {Promise}
 */
export function addAgendaEntry (agendaId = '', entry = {}) {
  return axios.post(`${DEFAULT_BACKEND_URL}/agenda/${agendaId}`, entry)
    .catch(error => {
      console.error(error);
    });
}
