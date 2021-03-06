class ApiClient {

  constructor(baseUrl = 'api') {
    this.baseUrl = baseUrl;
  }

  getSamples() {
    return fetch(`${this.baseUrl}/samples`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        throw new Error(`Server replied with ${response.status}`);
      })
      .then((json) => json.map((data) => {
        /* eslint-disable no-param-reassign */

        // Make the file point back to the used API url
        data.file = `${this.baseUrl}/samples${data.file}`;

        // Javascript's timestamp uses milliseconds
        data.mtime = 1000 * data.mtime;

        return data;

        /* eslint-enable no-param-reassign */
      }));
  }

}

export default ApiClient;
