class GunakService {
  static getCsrfToken() {
    return  document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }

  static getPingRequest() {
    return new Request('/api/ping', {
      method: 'GET'
    });
  }
}

export default GunakService;
