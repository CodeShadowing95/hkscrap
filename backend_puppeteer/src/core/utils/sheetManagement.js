const { google } = require('googleapis');
const credentials = require('../../../credentials1.json');

async function getClientAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  return auth.getClient();
}

module.exports.saveFileToSheets = async (datas, filename) => {
  const clientAuth = await getClientAuth();
  if(!clientAuth) {
    console.log("Erreur de connexion");
    return;
  }

  // console.log("Connexion OK!");

  savingProcess(datas, filename, clientAuth);
}

module.exports.getDatasFromSheet = async (sheetName) => {
  // console.log("Getting Datas...");
  const clientauth = await getClientAuth();
  if(!clientauth) {
    console.log("Erreur de connexion");
    return;
  }

  const spreadsheetId = await getSpreadsheetIdBySheetName(sheetName, clientauth);
  // console.log("Getting spreadsheet");
  // console.log("Sheet name :", sheetName);
  // console.log(spreadsheetId);

  if (!spreadsheetId) {
    console.log('Cannot retrieve data without a valid spreadsheet ID.');
    return;
  }

  const sheetsAPI = google.sheets({ version: 'v4', auth: clientauth });

  try {
    const response = await sheetsAPI.spreadsheets.values.get({
      spreadsheetId,
      range: `Sheet_${sheetName}!A1:Z`, // Adjust the range based on your requirements
    });

    const values = response.data.values;

    if (values && values.length > 0) {
      // Process and use the retrieved values
      // console.log('Data from the sheet:', values);
      return values;
    } else {
      console.log('No data found in the sheet.');
      return null;
    }
  } catch (err) {
    console.error('Error getting data from sheet:', err.message);
  }
}

async function savingProcess(datas, filename, clientauth) {
  // console.log("Saving process...");
  const sheetsAPI = google.sheets({version: 'v4', auth: clientauth});
  const driveAPI = google.drive({version: 'v3', auth: clientauth});

  // Specify the spreadsheet properties
  const spreadsheetTitle = filename;
  const sheetTitle = `Sheet_${filename}`;

  try {
    const response = await sheetsAPI.spreadsheets.create({
      resource: {
        properties: {
          title: spreadsheetTitle,
        },
      },
    });

    const spreadsheetId = response.data.spreadsheetId;
    // console.log(spreadsheetId);

    // Create the sheet within the spreadsheet
    await sheetsAPI.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetTitle,
              },
            },
          },
        ],
      },
    });

    // Write data to the sheet
    const dataValues = datas.map(dataObject => Object.values(dataObject));
    // console.log("Datas: ", dataValues);
    await sheetsAPI.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetTitle}!A1`,
      valueInputOption: 'RAW',
      resource: {
        values: dataValues,
      },
    });

    // Move the spreadsheet to the desired folder in Google Drive
    try {
      await driveAPI.files.update({
        fileId: spreadsheetId,
        addParents: process.env.PARENT_FOLDER_ID, // Replace with the target folder ID
      });
    } catch (error) {
      console.log("Folder not found: ", error);
      return;
    }
    
    console.log('Spreadsheet created, data written, and moved to folder successfully.');
    // console.log(process.env.PARENT_FOLDER_ID);
  } catch (error) {
    console.error('Error:', error.message);
    return;
  }
}

async function getSpreadsheetIdBySheetName(sheetName, clientauth) {
  const driveAPI = google.drive({ version: 'v3', auth: clientauth });
  const folder = process.env.PARENT_FOLDER_ID;

  try {
    const response = await driveAPI.files.list({
      q: `mimeType='application/vnd.google-apps.spreadsheet' and '${folder}' in parents`,
    });

    const files = response.data.files;
    // console.log(files);

    for (const file of files) {
      if(file.name === sheetName) {
        // console.log(file.id);
        return file.id;
      }
    }

    console.log('Sheet not found in any accessible spreadsheet.');
    return null;
  } catch (err) {
    console.error('Error listing spreadsheets:', err.message);
    return null;
  }
}