import Q from 'q';
import nano from 'nano';

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

export class Database {

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
}
