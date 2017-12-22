function onEdit()
{ 
  var timezone = "GMT-3";
  var timestamp_format = "dd-MM H:m:s";
  var updateColName = "Description";
  var progressColName = "Status";
  var timeStampColName = "ID";
  var sheetToMoveFinished= "Finished-Projects";
  var sheetToMoveMaybe = "Maybe/Ideas";
  var valueToWatchFinished = "Finished";
  var valueToWatchMaybe = "Maybe";
  var sheet = SpreadsheetApp.getActiveSheet();
  var actRng = SpreadsheetApp.getActiveRange();
  var editColumn = actRng.getColumn();
  var index = actRng.getRowIndex();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
  var dateCol = headers[0].indexOf(timeStampColName);
  var updateCol = headers[0].indexOf(updateColName);
  var progressCol = headers[0].indexOf(progressColName);
  updateCol = updateCol + 1; // the index starts with 0 but all the rest starts with 1 LUL
  progressCol = progressCol + 1; // the index starts with 0 but all the rest starts with 1 LUL
  
  if (dateCol > -1 && index > 1 && editColumn == updateCol) {
    var cell = sheet.getRange(index, dateCol + 1); // the index starts with 0 but all the rest starts with 1 LUL
    if(cell.isBlank()){ // only generate id if the column is empty
      var date = Utilities.formatDate(new Date(), timezone, timestamp_format);
      cell.setValue(date);
    }  
  }
  
  // automatic movement of rows
  if (index > 1 && editColumn == progressCol){
    // send finished projects to the finished Sheet
    if (actRng.getValue() == valueToWatchFinished){
      var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetToMoveFinished);
      var targetRange = targetSheet.getRange(targetSheet.getLastRow() + 1, 1);
      sheet.getRange(actRng.getRow(), 1, 1, sheet.getLastColumn()).moveTo(targetRange);
      sheet.deleteRow(actRng.getRow());
    }
    // send projects that maybe or not be executed in the future to the maybe Sheet
    else if(actRng.getValue() == valueToWatchMaybe){
      var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetToMoveMaybe);
      var targetRange = targetSheet.getRange(targetSheet.getLastRow() + 1, 1);
      sheet.getRange(actRng.getRow(), 1, 1, sheet.getLastColumn()).moveTo(targetRange);
      sheet.deleteRow(actRng.getRow());
    }
  }
}
