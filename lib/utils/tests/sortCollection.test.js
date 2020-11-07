import { sortCollection } from '../sortCollection';
import {
  convertDate,
  DATE_TYPES,
} from '../convertDate';

const statuses = {
  FIRST_STATUS: 'FIRST_STATUS',
  SECOND_STATUS: 'SECOND_STATUS',
  THIRD_STATUS: 'THIRD_STATUS',
};

const collectionUnsorted = [
  {
    status: statuses.FIRST_STATUS,
    number: 3,
    date: '2018-10-20T23:31:45.000',
  },
  {
    status: statuses.FIRST_STATUS,
    number: 1,
    date: '2018-11-20T13:59:17.000',
  },
  {
    status: statuses.SECOND_STATUS,
    number: 3,
    date: '2018-12-20T12:57:44.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 2,
    date: '2018-12-20T11:58:44.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 3,
    date: '2017-12-20T11:57:44.000',
  },
  {
    status: statuses.SECOND_STATUS,
    number: 2,
    date: '2018-11-21T14:22:23.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 2,
    date: '2007-12-20T11:57:44.000',
  },
  {
    status: statuses.FIRST_STATUS,
    number: 1,
    date: '2018-11-26T12:37:14.000',
  },
];

const collectionSorted = [
  {
    status: statuses.FIRST_STATUS,
    number: 3,
    date: '2018-10-20T23:31:45.000',
  },
  {
    status: statuses.FIRST_STATUS,
    number: 1,
    date: '2018-11-26T12:37:14.000',
  },
  {
    status: statuses.FIRST_STATUS,
    number: 1,
    date: '2018-11-20T13:59:17.000',
  },
  {
    status: statuses.SECOND_STATUS,
    number: 3,
    date: '2018-12-20T12:57:44.000',
  },
  {
    status: statuses.SECOND_STATUS,
    number: 2,
    date: '2018-11-21T14:22:23.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 3,
    date: '2017-12-20T11:57:44.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 2,
    date: '2018-12-20T11:58:44.000',
  },
  {
    status: statuses.THIRD_STATUS,
    number: 2,
    date: '2007-12-20T11:57:44.000',
  },
];

describe('sortCollection', () => {
  describe('should throw error if', () => {
    it('there is no property in collection object', () => {
      const propertyName = 'number';
      const invalidCollection = [
        { number: 134 },
        { name: 'Name' },
        { number: 754 },
      ];

      expect(() => sortCollection(invalidCollection, [propertyName])).toThrow(`${propertyName} does not exist`);
    });

    it('invalid collection argument', () => {
      const invalidArgument = {};

      expect(() => sortCollection(invalidArgument)).toThrow('collection parameter must be an array');
    });

    describe('iteratees argument', () => {
      it('is not an array', () => {
        const iteratees = {};

        expect(() => sortCollection([], iteratees)).toThrow('iteratees.map is not a function');
      });

      it('has invalid values', () => {
        const iteratees = [6];

        expect(() => sortCollection([], iteratees)).toThrow('6 is not valid value');
      });
    });
  });

  it('should return empty array in case of empty input array', () => {
    expect(sortCollection()).toEqual([]);
  });

  it('should sort correctly in case of valid input', () => {
    const sortByDates = (
      { date: dateA },
      { date: dateB }
    ) => {
      return convertDate(dateB, DATE_TYPES.number) - convertDate(dateA, DATE_TYPES.number);
    };
    const sortingOptions = [
      {
        propertyName: 'status',
        sequence: [statuses.FIRST_STATUS, statuses.SECOND_STATUS, statuses.THIRD_STATUS],
      },
      '-number',
      sortByDates,
    ];

    expect(sortCollection(collectionUnsorted, sortingOptions)).toEqual(collectionSorted);
  });
});
