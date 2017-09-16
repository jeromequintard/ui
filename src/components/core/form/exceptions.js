import {
  createException,
} from 'osiki-core';

export const exceptions = {
  DataSourceException: createException('DataSourceException', 'Unable to load data', 500),
};

