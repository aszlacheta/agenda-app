const getAgenda = () => {
  return {
    then: callback => {
      const data = {
        data: {
          agendaId: '1234',
          day: 0,
          entries: []
        }
      };
      callback(data);
    }
  };
};

module.exports = {
  getAgenda
};
