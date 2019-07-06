function doGet(e) {
  if (!e.parameters.v) { 
    //Logger.log(e.parameters.v);
    return HtmlService.createTemplateFromFile("LogIN").evaluate();
    }
  else { 
    //return HtmlService.createTemplateFromFile("submitted").evaluate();
    }
    
}


function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 Logger.log(url)
 return url;
}

function formCheck(userInfo){
  var branch = userInfo.branch
  if (branch == "Select a Branch") {
            alert("Branch must be selected!");
            return false;
    }
    else 
    {
      userClicked(userInfo)
    }
  }


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
};


function userClicked(userInfo){
  var url = "https://docs.google.com/spreadsheets/d/1LAxYac5tgYEcAoetv5R0r0MlOHFnXDNYEgRiqJ_l7Eg/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Login Attempts");
  
  ws.appendRow([new Date(), userInfo.user, userInfo.pw]);

  //Logger.log("someone");
}

function processForm(formObject) 
{
  var username = formObject.username;
  var pass = formObject.password;
  
  Logger.log(username);
  Logger.log(pass);
  
  var url = "https://docs.google.com/spreadsheets/d/1LAxYac5tgYEcAoetv5R0r0MlOHFnXDNYEgRiqJ_l7Eg/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Registered Accounts");
  
  const START_ROW = 2;
  const LAST_ROW = ws.getLastRow();
  
  for(var i = START_ROW; i <= LAST_ROW; i++)
  {
    if(ws.getRange(i, 1).getValue() == username && ws.getRange(i, 2).getValue() == pass)
    {
      return true;
    }
    else
    {
      Logger.log("Finsihed checking row " + i);
    }
  }
  
  return false; 
}




