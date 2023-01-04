import Share from 'react-native-share';

const myShare = shareOptions => {
  Share.shareSingle(shareOptions)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};

export {myShare};
