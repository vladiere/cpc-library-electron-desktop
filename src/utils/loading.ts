import {
  Loading,
  QSpinnerFacebook,
  QSpinnerHourglass,
  QSpinnerIos,
} from 'quasar';

export const SpinnerFacebook = (loading_state: boolean, message?: string) => {
  if (loading_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerFacebook,
      spinnerColor: 'blue-8',
      spinnerSize: 120,
      backgroundColor: 'dark',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
};

export const SpinnerHourglass = (loading_state: boolean, message?: string) => {
  if (loading_state) {
    Loading.show({
      message: message,
      spinner: QSpinnerHourglass,
      spinnerColor: 'light-green',
      spinnerSize: 120,
      backgroundColor: 'grey-10',
      messageColor: 'grey-11',
    });
  } else {
    Loading.hide();
  }
};

export const SpinnerIos = (time_out: number, message?: string) => {
  Loading.show({
    message: message,
    spinner: QSpinnerIos,
    spinnerColor: 'blue-9',
    spinnerSize: 120,
    backgroundColor: 'grey-10',
    messageColor: 'grey-11',
  });
  setTimeout(() => {
    Loading.hide();
  }, time_out);
};
