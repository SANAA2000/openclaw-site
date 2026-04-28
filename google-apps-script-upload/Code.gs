const FOLDER_ID = '1_gYwa6y3N_zzdpgpzNtzDkAQtHfRRFnY';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Upload de fichiers')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function uploadFile(formData) {
  try {
    if (!formData.name || !formData.email || !formData.fileName || !formData.bytes) {
      return {
        success: false,
        message: 'Données incomplètes.'
      };
    }

    const folder = DriveApp.getFolderById(FOLDER_ID);

    const decodedBytes = Utilities.base64Decode(formData.bytes);
    const blob = Utilities.newBlob(decodedBytes, formData.mimeType, formData.fileName);

    const file = folder.createFile(blob);

    file.setDescription(
      'Upload via formulaire web\n' +
      'Nom: ' + formData.name + '\n' +
      'Email: ' + formData.email + '\n' +
      'Date: ' + new Date()
    );

    return {
      success: true,
      message: 'Fichier uploadé avec succès.',
      fileId: file.getId(),
      fileName: file.getName(),
      url: file.getUrl()
    };
  } catch (error) {
    return {
      success: false,
      message: error.toString()
    };
  }
}
