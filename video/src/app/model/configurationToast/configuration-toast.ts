export class ConfigurationToast {
    constructor(
      public array = {
        closeButton: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
        extendedTimeOut: 1000
      }
    ) { }
  }