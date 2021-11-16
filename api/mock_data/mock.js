const fs = require('fs')
const files = ['student', 'faculty', 'father', 'mother', 'address'];

function getMockData() {
    let mockData = {}

    for (file of files) {
        let jsonFile = fs.readFileSync(`./mock_data/${file}.json`);
        let data = JSON.parse(jsonFile);
        mockData[file] = data;
    }
    const ad = mockData.address;
    mockData['student_address'] = ad.splice(0, 60);
    mockData['faculty_address'] = ad.splice(-60);
    return mockData;
}

module.exports = getMockData;
