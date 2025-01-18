const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// File paths
const inputPath = path.join(__dirname, 'input_countries.csv');
const canadaPath = path.join(__dirname, 'canada.txt');
const usaPath = path.join(__dirname, 'usa.txt');

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`${filePath} has been deleted.`);
  }
}

function processCSV() {
  const canadaData = [];
  const usaData = [];

  fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === 'canada') {
        canadaData.push(row);
      } else if (row.country.toLowerCase() === 'united states') {
        usaData.push(row);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed.');

      if (canadaData.length > 0) {
        const canadaContent = 'country,year,population\n' +
          canadaData.map(row => `${row.country},${row.year},${row.population}`).join('\n');
        fs.writeFileSync(canadaPath, canadaContent);
        console.log('Canada data written to canada.txt.');
      }

      if (usaData.length > 0) {
        const usaContent = 'country,year,population\n' +
          usaData.map(row => `${row.country},${row.year},${row.population}`).join('\n');
        fs.writeFileSync(usaPath, usaContent);
        console.log('USA data written to usa.txt.');
      }
    })
    .on('error', (err) => {
      console.error('Error processing CSV file:', err);
    });
}

try {
  // Delete existing files if they exist
  deleteFile(canadaPath);
  deleteFile(usaPath);

  processCSV();
} catch (error) {
  console.error('An error occurred:', error);
}