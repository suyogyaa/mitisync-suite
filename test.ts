import NepaliDate from 'nepali-datetime';

// BS to AD
const bsDate = new NepaliDate('2083-02-31');
console.log('BS Date:', bsDate.format('YYYY-MM-DD'));
console.log('Using toISOString:', bsDate.getDateObject().toISOString());
console.log('Using local components:', 
  bsDate.getDateObject().getFullYear() + '-' + 
  String(bsDate.getDateObject().getMonth() + 1).padStart(2, '0') + '-' + 
  String(bsDate.getDateObject().getDate()).padStart(2, '0')
);
console.log('Using formatEnglishDate:', bsDate.formatEnglishDate('YYYY-MM-DD'));

// AD to BS
const adDateStr = '2026-06-14';
const [y, m, d] = adDateStr.split('-').map(Number);
const adDate = new Date(y, m - 1, d);
console.log('AD Date String:', adDateStr);
console.log('Parsed AD Date Local:', adDate.toString());
console.log('Parsed AD Date to BS:', new NepaliDate(adDate).format('YYYY-MM-DD'));
