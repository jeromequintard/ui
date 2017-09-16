import { Rest } from 'osiki-core';

export default class Api {

  static getAcl(oid) {
    return Rest.request(null, 'api', 'acl', 'GET', { oid });
  }
}
