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
  login_attempts = getSheet("Login Attempts");
  login_attempts.appendRow([new Date(), userInfo.user, userInfo.pw]);
}

function processForm(formObject) 
{
  var username = formObject.username;
  var password = formObject.password;
  
  Logger.log(username);
  Logger.log(password); 

  return isValidLogin(username, password) ? true : false;
}

function isValidLogin(username, password)
{
    accounts = getSheet("Registered Accounts");
    
    const START_ROW = 2;
    const LAST_ROW = accounts.getLastRow();
    
    for(var i = START_ROW; i <= LAST_ROW; i++)
    {
      if(accounts.getRange(i, 1).getValue() == username && accounts.getRange(i, 2).getValue() == password)
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

function getSheet(sheet_name)
{
    const url = "https://docs.google.com/spreadsheets/d/1LAxYac5tgYEcAoetv5R0r0MlOHFnXDNYEgRiqJ_l7Eg/edit#gid=0";
    return SpreadsheetApp.openByUrl(url).getSheetByName(sheet_name);
}




