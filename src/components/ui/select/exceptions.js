import {
  createException,
} from 'osiki-core';

export const exceptions = {
  DataSourceException: createException('DataSourceException', 'Unable to load data', 500),
  SelectedIndexException: createException('SelectedIndexException', 'Selected index out of range', 500),
};

