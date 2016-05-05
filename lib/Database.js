import Q from 'q';
import nano from 'nano';

export class Database {

  constructor(url) {
    this._db = nano(url);
  }

  insert(doc, params) {
    var deferred = Q.defer();

    this._db.insert(doc, params, (err, body) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  }

  get(doc, rev) {
    var deferred = Q.defer();

    this._db.get(doc, rev, (err, body) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  }
}
