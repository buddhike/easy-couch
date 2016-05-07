import Q from 'q';
import nano from 'nano';

import databaseResults from './databaseResults';

function promiseWrapper(operation) {
    var deferred = Q.defer();

    operation((err, body) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
}

export default class Database {

  constructor(url) {
    this._db = nano(url);
  }

  insert(doc, params) {
    return promiseWrapper(cb => this._db.insert(doc, params, cb));
  }

  get(doc, rev) {
    return promiseWrapper(cb => this._db.get(doc, rev, cb));
  }

  destroy(doc, rev) {
    return promiseWrapper(cb => this._db.destroy(doc, rev, cb));
  }

  head(docname) {
    return promiseWrapper(cb => this._db.head(docname, cb));
  }

  tryGet(doc, rev) {
    return this.get(doc, rev).catch(e => {
      if(e.message === 'deleted') {
        return databaseResults.notFound;
      }

      console.log(`message from nano is ${e.message}`); // eslint-disable-line

      throw e;
    });
  }
}
