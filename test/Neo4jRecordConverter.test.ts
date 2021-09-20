import {
  Date as Neo4jDate,
  Duration,
  LocalTime,
  Point,
  Integer,
  DateTime,
  LocalDateTime,
  Record as Neo4jRecord,
  Time,
  Node,
  Relationship,
} from 'neo4j-driver-core';
import { Neo4jRecordConverter } from '../src/Neo4jRecordConverter';
import { anything, instance, mock, when } from 'ts-mockito';
import { TypeConverter } from '../src/TypeConverter';

const typeConverterMock: TypeConverter = mock<TypeConverter>();
when(typeConverterMock.convertString(anything())).thenReturn('StringValue');
when(typeConverterMock.convertInteger(anything())).thenReturn('IntegerValue');
when(typeConverterMock.convertFloat(anything())).thenReturn('FloatValue');
when(typeConverterMock.convertBoolean(anything())).thenReturn('BooleanValue');
when(typeConverterMock.convertDateTime(anything())).thenReturn('DateTimeValue');
when(typeConverterMock.convertDate(anything())).thenReturn('DateValue');
when(typeConverterMock.convertLocalDateTime(anything())).thenReturn(
  'LocalDateTimeValue'
);
when(typeConverterMock.convertLocalTime(anything())).thenReturn(
  'LocalTimeValue'
);
when(typeConverterMock.convertTime(anything())).thenReturn('TimeValue');
when(typeConverterMock.convertDuration(anything())).thenReturn('DurationValue');
when(typeConverterMock.convertPoint(anything())).thenReturn('PointValue');
const typeConverter: TypeConverter = instance(typeConverterMock);

const record = new Neo4jRecord(
  ['a', 'b', 'c'],
  [
    new Node(Integer.fromNumber(0), ['TestNode'], {
      stringKey: 'name',
      integerKey: Integer.fromNumber(1),
      floatKey: 1,
      booleanKey: true,
    }),
    new Relationship(
      Integer.fromNumber(1),
      Integer.fromNumber(0),
      Integer.fromNumber(2),
      'IS',
      {
        dateTimeKey: DateTime.fromStandardDate(new Date()),
        dateKey: Neo4jDate.fromStandardDate(new Date()),
        localDateTimeKey: LocalDateTime.fromStandardDate(new Date()),
        localTimeKey: LocalTime.fromStandardDate(new Date()),
        timeKey: Time.fromStandardDate(new Date()),
        durationKey: new Duration(
          Integer.fromNumber(1),
          Integer.fromNumber(0),
          Integer.fromNumber(0),
          Integer.fromNumber(0)
        ),
        pointKey: new Point(Integer.fromNumber(1), 0, 0),
      }
    ),
    new Node(Integer.fromNumber(2), ['TestNode'], {
      stringKey: 'name',
      integerKey: Integer.fromNumber(1),
      floatKey: 1,
      booleanKey: true,
    }),
  ]
);

describe('Neo4jRecordConverter.toObject', () => {
  it('should convert Record', () => {
    const o = new Neo4jRecordConverter(typeConverter).toObject(record);
    expect(o).toStrictEqual({
      a: {
        stringKey: 'StringValue',
        integerKey: 'IntegerValue',
        floatKey: 'FloatValue',
        booleanKey: 'BooleanValue',
      },
      b: {
        dateTimeKey: 'DateTimeValue',
        dateKey: 'DateValue',
        localDateTimeKey: 'LocalDateTimeValue',
        localTimeKey: 'LocalTimeValue',
        timeKey: 'TimeValue',
        durationKey: 'DurationValue',
        pointKey: 'PointValue',
      },
      c: {
        stringKey: 'StringValue',
        integerKey: 'IntegerValue',
        floatKey: 'FloatValue',
        booleanKey: 'BooleanValue',
      },
    });
  });

  it('should convert Node', () => {
    const o = new Neo4jRecordConverter(typeConverter).toObject(record.get('a'));
    expect(o).toStrictEqual({
      stringKey: 'StringValue',
      integerKey: 'IntegerValue',
      floatKey: 'FloatValue',
      booleanKey: 'BooleanValue',
    });
  });

  it('should convert Relationship', () => {
    const o = new Neo4jRecordConverter(typeConverter).toObject(record.get('b'));
    expect(o).toStrictEqual({
      dateTimeKey: 'DateTimeValue',
      dateKey: 'DateValue',
      localDateTimeKey: 'LocalDateTimeValue',
      localTimeKey: 'LocalTimeValue',
      timeKey: 'TimeValue',
      durationKey: 'DurationValue',
      pointKey: 'PointValue',
    });
  });
});
