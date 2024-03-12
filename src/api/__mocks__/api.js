/* eslint-disable n/no-callback-literal */

const getAgenda = createPromise(callback => {
  const data = {
    data: {
      agendaId: '1234',
      day: 0,
      entries: []
    }
  };
  callback(data);
});

const addAgendaEntry = jest.fn().mockImplementation(createPromise(callback => {
  callback({ data: {} });
}
));

function createPromise (promiseCallback) {
  return () => ({
    then: callback => promiseCallback(callback)
  });
};

module.exports = {
  getAgenda,
  addAgendaEntry
};
