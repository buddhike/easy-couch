import sinon from 'sinon';
import proxyquire from 'proxyquire';

import databaseResults from '../lib/databaseResults';

describe('Database document', function () {

  let _nano, _db, _database;

  beforeEach(() => {
    _db = {
      insert: sinon.stub(),
      get: sinon.stub(),
      destroy: sinon.stub(),
      head: sinon.stub()
    };

    _nano = sinon.stub().returns(_db);

    const Database = proxyquire('../lib/Database', {
      'nano': {
        'default': _nano,
        '@noCallThru': true,
        __esModule: true
      }
    }).default;

    _database = new Database('http://fa.ke');
  });

  describe('insert', () => {

    let _doc, _params, _promise, _callback;

    beforeEach(() => {
      _doc = {};
      _params = 'params';
      _promise = _database.insert(_doc, _params);
      _callback = _db.insert.getCall(0).args[2];
    });

    it('should call insert with correct arguments', () => {
      _db.insert.calledWith(_doc, _params).should.be.true;
    });

    it('should return the successful response', done => {
      const body = {};

      _promise.then(b => {
        b.should.equal(body);
        done();
      });

      _callback(undefined, body);
    });

    it('should throw an exception on failure', done => {
      const err = {};

      _promise.catch(e => {
        e.should.equal(err);
        done();
      });

      _callback(err);
    });
  });

  describe('get', () => {

    let _docName, _params, _promise, _callback;

    beforeEach(() => {
      _docName = 'my-document';
      _params = 'params';
      _promise = _database.get(_docName, _params);
      _callback = _db.get.getCall(0).args[2];
    });

    it('should call get with correct arguments', () => {
      _db.get.calledWith(_docName, _params).should.be.true;
    });

    it('should return the document on success', done => {
      const body = {};

      _promise.then(b => {
        b.should.equal(body);
        done();
      });

      _callback(undefined, body);
    });

    it('should throw an exception on failure', done => {
      const err = {};

      _promise.catch(e => {
        e.should.equal(err);
        done();
      });

      _callback(err);
    });
  });

  describe('destroy', () => {

    let _doc, _rev, _promise, _callback;

    beforeEach(() => {
      _doc = {};
      _rev = 'rev';
      _promise = _database.destroy(_doc, _rev);
      _callback = _db.destroy.getCall(0).args[2];
    });

    it('should call destroy with correct arguments', () => {
      _db.destroy.calledWith(_doc, _rev).should.be.true;
    });

    it('should return the successful response', done => {
      const body = {};

      _promise.then(b => {
        b.should.equal(body);
        done();
      });

      _callback(undefined, body);
    });

    it('should throw an exception on failure', done => {
      const err = {};

      _promise.catch(e => {
        e.should.equal(err);
        done();
      });

      _callback(err);
    });
  });

  describe('head', () => {

    let _doc, _promise, _callback;

    beforeEach(() => {
      _doc = {};
      _promise = _database.head(_doc);
      _callback = _db.head.getCall(0).args[1];
    });

    it('should call destroy with correct arguments', () => {
      _db.head.calledWith(_doc).should.be.true;
    });

    it('should return the successful response', done => {
      const body = {};

      _promise.then(b => {
        b.should.equal(body);
        done();
      });

      _callback(undefined, body);
    });

    it('should throw an exception on failure', done => {
      const err = {};

      _promise.catch(e => {
        e.should.equal(err);
        done();
      });

      _callback(err);
    });
  });

  describe('tryGet', () => {

    let _docName, _params, _promise, _callback;

    beforeEach(() => {
      _docName = 'my-document';
      _params = 'params';
      _promise = _database.tryGet(_docName, _params);
      _callback = _db.get.getCall(0).args[2];
    });

    it('should call get with correct arguments', () => {
      _db.get.calledWith(_docName, _params).should.be.true;
    });

    it('should return the document on success', done => {
      const body = {};

      _promise.then(b => {
        b.should.equal(body);
        done();
      });

      _callback(undefined, body);
    });

    it('should return not-found status if document is not found', done => {
      const err = new Error('deleted');

      _promise.then(d => {
        d.should.equal(databaseResults.notFound);
        done();
      })
      .done();

      _callback(err);
    });

    it('should throw an exception for other errors', done => {
      const err = new Error('real bummer');

      _promise.catch(e => {
        e.should.equal(err);
        done();
      })
      .done();

      _callback(err);
    });
  });
});
