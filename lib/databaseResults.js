
class DatabaseResult {
  constructor(code) {
    this.code = code;
  }
}

export default {
  notFound: new DatabaseResult('not-found')
};
