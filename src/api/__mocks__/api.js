const getAgenda = () => {
    return {
        then: (callback => callback({
            data: {
                agendaId: '1234',
                day: 0,
                entries: []
            }
        }))
    };
};

module.exports = {
    getAgenda
};
