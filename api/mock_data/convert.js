const fs = require('fs');

const jsonData = JSON.parse(fs.readFileSync('father.json'));

for (data of jsonData) {
    let d = new Date(data.dob);
    data['dob'] = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    // d = new Date(data.admission_date);
    // data['admission_date'] = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

fs.writeFileSync('father-new.json', JSON.stringify(jsonData), 'utf-8');

console.log(jsonData);