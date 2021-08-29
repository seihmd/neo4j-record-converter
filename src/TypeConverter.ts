import {
  Integer,
  Date as Neo4jDate,
  DateTime as Neo4jDateTime,
  Duration,
  LocalDateTime,
  LocalTime,
  Point,
  Time,
} from 'neo4j-driver-core';

export interface TypeConverter {
  convertString(value: string): any;
  convertInteger(value: Integer): any;
  convertFloat(value: number): any;
  convertBoolean(value: boolean): any;
  convertDateTime(value: Neo4jDateTime): any;
  convertDate(value: Neo4jDate): any;
  convertLocalDateTime(value: LocalDateTime): any;
  convertLocalTime(value: LocalTime): any;
  convertTime(value: Time): any;
  convertDuration(value: Duration): any;
  convertPoint(value: Point): any;
}
