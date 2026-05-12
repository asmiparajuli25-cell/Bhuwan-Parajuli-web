import NepaliDate from 'nepali-datetime';
const date = new Date(2023, 0, 1);
const nd = new NepaliDate(date);
console.log(nd.format('D'));
