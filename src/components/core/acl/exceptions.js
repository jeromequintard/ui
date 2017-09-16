import {
  createException,
} from 'osiki-core';

export const exceptions = {
  AclLoaderException: createException('AclLoaderException', 'Unable to load ACL', 500),
  ForbiddenException: createException('ForbiddenException', 'Access to this resource is denied', 403),
};

