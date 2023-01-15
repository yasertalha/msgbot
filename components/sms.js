import React from 'react';
import {NativeModules} from 'react-native';
var DirectSms = NativeModules.DirectSms;

//https://stackoverflow.com/questions/780995/settimeout-but-for-a-given-time
const scheduledSms = (phone, message, scheduledAt) => {
  const delay = 5000;
  console.log(delay);
  const id = setTimeout(() => {
    // DirectSms.sendDirectSms(phone, message);
    console.log(`scheduledSms after timeout : ${delay}`);
    clearTimeout(id);
  }, delay);
};

const _directSms = (phone, message) => {
  console.log(phone, message);
  DirectSms.sendDirectSms(phone, message);
};

export {scheduledSms, _directSms};
