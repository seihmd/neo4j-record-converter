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
import { TypeConverter } from './TypeConverter';

export class DefaultTypeConverter implements TypeConverter {
  convertString(value: string): string {
    return value;
  }
  convertInteger(value: Integer): number | string {
    if (Integer.inSafeRange(value)) {
      return value.toNumber();
    } else {
      return value.toString();
    }
  }
  convertFloat(value: number): number {
    return value;
  }
  convertBoolean(value: boolean): boolean {
    return value;
  }
  convertDateTime(value: Neo4jDateTime): Date {
    return new Date(value.toString());
  }
  convertDate(value: Neo4jDate<any>): Date {
    return new Date(value.toString());
  }
  convertLocalDateTime(value: LocalDateTime): Date {
    return new Date(new Date(value.toString()).toUTCString());
  }
  convertLocalTime(value: LocalTime): LocalTime {
    return value;
  }
  convertTime(value: Time): Time {
    return value;
  }
  convertDuration(value: Duration): Duration {
    return value;
  }
  convertPoint(value: Point): Point {
    return value;
  }
}
