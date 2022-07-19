import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import { getRandomInt } from '../components/agenda/Agenda';
import { DEFAULT_BACKEND_URL } from './api';

const mock = new MockAdapter(axios);

// GET agenda details
mock.onGet(new RegExp(`${DEFAULT_BACKEND_URL}\/agenda\/\\d+/*`))
  .reply(200, {
    id: '1234',
    day: moment('2022-07-01').valueOf(),
    entries: [
      {
        id: getRandomInt(),
        startDate: moment('2022-07-01 10:15:00').valueOf(),
        name: "Start of the training day",
        description: "Start of the training day description",
        editable: false,
        deletable: false,
      },
      {
        id: getRandomInt(),
        startDate: moment('2022-07-01 18:30:00').valueOf(),
        name: "End of the training day",
        description: "End of the training day description",
        editable: false,
        deletable: false,
      },
    ]
  });

mock.onDelete(new RegExp(`${DEFAULT_BACKEND_URL}\/agenda\/\\d+\/\\d+/*`))
  .reply(200, {
    message: 'Success',
  });

mock.onPost(new RegExp(`${DEFAULT_BACKEND_URL}\/agenda\/\\d+/*`))
  .reply(200, {
    message: 'Success',
  });

