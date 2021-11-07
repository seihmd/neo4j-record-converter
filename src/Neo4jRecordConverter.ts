import {
  Duration,
  Integer,
  isDate,
  isDateTime,
  isDuration,
  isInt,
  isLocalDateTime,
  isLocalTime,
  isPoint,
  isTime,
  LocalDateTime,
  LocalTime,
  Point,
  Record as Neo4jRecord,
  Time,
  Date,
  DateTime,
  Node,
  Relationship,
} from 'neo4j-driver-core';
import { TypeConverter } from './TypeConverter';
import { DefaultTypeConverter } from './DefaultTypeConverter';

export class Neo4jRecordConverter {
  static default(): Neo4jRecordConverter {
    return new Neo4jRecordConverter(new DefaultTypeConverter());
  }

  private readonly typeConverter: TypeConverter;

  constructor(typeConverter: TypeConverter) {
    this.typeConverter = typeConverter;
  }

  toObject(record: Neo4jRecord): Record<string, unknown> {
    if (record instanceof Node) {
      return this.convertNodeOrRelationship(record);
    }

    if (record instanceof Relationship) {
      return this.convertNodeOrRelationship(record);
    }

    const r: Record<string, Record<string, unknown>> = {};
    for (const [field, nodeOrRelationship] of record.entries()) {
      r[field] = this.convertNodeOrRelationship(nodeOrRelationship);
    }

    return r;
  }

  private convertNodeOrRelationship(nodeOrRelationship: Node | Relationship) {
    const r: Record<string, any> = {};
    for (const [key, value] of Object.entries(nodeOrRelationship.properties)) {
      r[key] = this.convert(value);
    }

    return r;
  }

  private convert(value: unknown): unknown {
    if (value === null || value === undefined) {
      return null;
    }

    if (isNeo4jInteger(value)) {
      return this.typeConverter.convertInteger(value);
    }
    if (typeof value === 'number') {
      return this.typeConverter.convertFloat(value);
    }
    if (typeof value === 'string') {
      return this.typeConverter.convertString(value);
    }
    if (typeof value === 'boolean') {
      return this.typeConverter.convertBoolean(value);
    }
    if (typeof value === 'object' && !!value) {
      if (isNeo4jPoint(value)) {
        return this.typeConverter.convertPoint(value);
      }
      if (isNeo4jDate(value)) {
        return this.typeConverter.convertDate(value);
      }
      if (isNeo4jTime(value)) {
        return this.typeConverter.convertTime(value);
      }
      if (isNeo4jLocalTime(value)) {
        return this.typeConverter.convertLocalTime(value);
      }
      if (isNeo4jDateTime(value)) {
        return this.typeConverter.convertDateTime(value);
      }
      if (isNeo4jLocalDateTime(value)) {
        return this.typeConverter.convertLocalDateTime(value);
      }
      if (isNeo4jDuration(value)) {
        return this.typeConverter.convertDuration(value);
      }
    }
    return value;
  }
}

function isNeo4jInteger(value: unknown): value is Integer {
  return isInt(value);
}

function isNeo4jDate(value: Object): value is Date {
  return isDate(value);
}

function isNeo4jDateTime(value: Object): value is DateTime {
  return isDateTime(value);
}

function isNeo4jLocalDateTime(value: Object): value is LocalDateTime {
  return isLocalDateTime(value);
}

function isNeo4jLocalTime(value: Object): value is LocalTime {
  return isLocalTime(value);
}

function isNeo4jTime(value: Object): value is Time {
  return isTime(value);
}

function isNeo4jDuration(value: Object): value is Duration {
  return isDuration(value);
}

function isNeo4jPoint(value: Object): value is Point {
  return isPoint(value);
}
