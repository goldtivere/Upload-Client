export const environment = {
  production: true,
  // apiBaseUrl: 'http://pay4me.atl.jelastic.vps-host.net/api/v1',
  apiBaseUrl: window.location.origin + '/api/v1',
  pusher: {
    key: 'd5f35ec367e25695eab2',
    cluster: 'eu',
  }
};
