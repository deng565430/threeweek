import rpA from 'request-promise';

class IndexModule {
  constructor(ctx) {
    this.ctx = ctx;
  }
  updataNum () {
    const options = {
      url: 'https://localhost/praise.php',
      method: 'GET'
    }
    return new Promise((resolve, reject) => {
      rpA(options).then(function(result) {
        const info = JSON.parse(result);
        if (info) {
          resolve({data: result})
        } else {
          reject({})
        }
      })
    })
  }
}

export default IndexModule;