import {
  Integer,
  Date as Neo4jDate,
  DateTime,
  LocalDateTime,
} from 'neo4j-driver-core';
import { DefaultTypeConverter } from '../src/DefaultTypeConverter';

describe('DefaultTypeConverter', () => {
  it.each([
    [Integer.fromNumber(1), 1],
    [Integer.fromNumber(0), 0],
    [Integer.fromNumber(-1), -1],
    [Integer.fromNumber(Number.MAX_SAFE_INTEGER), 9007199254740991],
    [Integer.fromString('9007199254740992'), '9007199254740992'],
  ])('convertInteger', (neo4jValue: Integer, expected: number | string) => {
    expect(new DefaultTypeConverter().convertInteger(neo4jValue)).toBe(
      expected
    );
  });
  it.each([
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05Z')),
      new Date('2000-01-02T03:04:05Z'),
    ],
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05+12:00')),
      new Date('2000-01-02T03:04:05+12:00'),
    ],
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05.001Z')),
      new Date('2000-01-02T03:04:05.001Z'),
    ],
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05.999Z')),
      new Date('2000-01-02T03:04:05.999Z'),
    ],
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05.000000001Z')),
      new Date('2000-01-02T03:04:05.000000001Z'),
    ],
    [
      DateTime.fromStandardDate(new Date('2000-01-02T03:04:05Z')),
      new Date('2000-01-02T03:04:05Z'),
    ],
  ])('convertDateTime', (neo4jValue: DateTime<any>, expected: Date) => {
    expect(
      new DefaultTypeConverter().convertDateTime(neo4jValue)
    ).toStrictEqual(expected);
  });

  it.each([
    [new Neo4jDate(2000, 1, 3), new Date('2000-01-03T00:00:00Z')],
    [
      new Neo4jDate(
        Integer.fromNumber(2000),
        Integer.fromNumber(1),
        Integer.fromNumber(3)
      ),
      new Date('2000-01-03T00:00:00Z'),
    ],
  ])('convertDate', (neo4jValue: Neo4jDate<any>, expected: Date) => {
    expect(new DefaultTypeConverter().convertDate(neo4jValue)).toStrictEqual(
      expected
    );
  });

  it.each([
    [
      new LocalDateTime(2000, 1, 2, 3, 4, 5, 0),
      new Date('2000-01-02T03:04:05'),
    ],
  ])(
    'convertLocalDateTime',
    (neo4jValue: LocalDateTime<any>, expected: Date) => {
      expect(
        new DefaultTypeConverter().convertLocalDateTime(neo4jValue)
      ).toStrictEqual(expected);
    }
  );
});
