// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

export const environment = {
  production: false,
  // apiUrl: 'http://202.129.196.133/boarding-system'
  // apiUrl: 'http://202.129.196.133/onboarding-api'
    apiUrl: 'http://localhost/onboarding-api'
  //apiUrl: 'http://106.51.50.95:5428/onboard-api'
  // apiUrl: 'http://cgvakstage.com:8085/onboard-api'
  //apiUrl: 'http://172.16.0.77:8085/onboard-api/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
