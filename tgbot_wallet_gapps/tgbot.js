// fsm tgbot

//
// git clone git@github.com:s21team/tgbot_wallet_gapps.git
// cd tgbot_wallet_gapps
// mkdir tgbot_wallet_gapps

// npm install clasp
// clasp login --no-localhost

// clasp create-script --title "My Script" --rootDir ./tgbot_wallet_gapps --parentId "1GxF_Jw2UqF4iHNR46vgVogWLmQhPfrUlDzRyGvdt3WI"
// touch tgbot_wallet_gapps/tgbot.js

// clasp list-deployments
// clasp create-deployment -i "AKfycbz2rPEcu6yLwQrV5k6A90nzip_2oeEelqenikS-2VDfmIya7kO1P5Q2Fk9Bu70mDJqh6A"

function setWebhook() {
  var scriptUrl = ScriptApp.getService().getUrl();
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + TOKEN  + "/setWebhook?url=" + encodeURIComponent("https://script.google.com/macros/s/AKfycbz2rPEcu6yLwQrV5k6A90nzip_2oeEelqenikS-2VDfmIya7kO1P5Q2Fk9Bu70mDJqh6A/exec"));
  Logger.log(response.getContentText());

  ScriptApp.newTrigger("triggerEveryHours1")
  .timeBased()
  .everyHours(1)
  .create();
}

// function doTimeout1(row, timeout) {
//   // let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
//   // s.getRange()


// }

function triggerEveryHours1() {
  let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
  let column = s.getRange("1:1").createTextFinder("timeout").useRegularExpression(false).findAll()[0].getA1Notation().match(/[A-Z]+/)[0]
  let arrRowsWithTimeout = s.getRange(column+":"+column).getValues().flat()
  arrRowsWithTimeout.forEach((timeout, row) => {
    row += 1;
    try {
      if (+timeout) {
        let nowTime = new Date().getTime()
        if (timeout < nowTime) {
          let id = getCellByRow(row, "userid").getValue()
          let fakeWebhook = { callback_query: { message: { chat: { id } } } }

          let currentState = getCellByRow(row, "stateFSM").getValue()
          if (  // "WAIT_TIMEOUT1_7"  --> TIME_IS_OUT1_8
            ["WAIT_TIMEOUT1_7", "WAIT_TIMEOUT1_7"].some(allowedStateFrom => (currentState === allowedStateFrom))
          ) {
            changeStateTo("TIME_IS_OUT1_8", ["WAIT_TIMEOUT1_7", "WAIT_TIMEOUT1_7"], id, true, fakeWebhook, undefined)
          }
        }
      }
    } catch {}
  })

}

function getRowByUserId(userid) {
  let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
  let column = s.getRange("1:1").createTextFinder("userid").useRegularExpression(false).findAll()[0].getA1Notation().match(/[A-Z]+/)[0]
  let textFinder = s.getRange(column+":"+column).createTextFinder(userid.toString()).useRegularExpression(false).findAll()
  return (textFinder.length) ? textFinder[0].getA1Notation().match(/[0-9]+/)[0] : -1;
  // return textFinder[0].getA1Notation().match(/[0-9]+/)[0];
}

function createNewClient(webhook) {
  if (webhook.message && webhook.message.text === "/start") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    {
      let header = "userid"
      column = s.getRange("1:1").createTextFinder(header).useRegularExpression(false).findAll()[0].getColumn()
      row = getRowByUserId(webhook.message.from["id"])
      if (row === -1) {
        row = s.getLastRow() + 1;
      }
      s.getRange(row,column).setValue(webhook.message.from["id"])
    }
    {
      let header = "stateFSM"
      column = s.getRange("1:1").createTextFinder(header).useRegularExpression(false).findAll()[0].getColumn()
      row = getRowByUserId(webhook.message.from["id"])
      s.getRange(row,column).setValue("START_0")
    }
    getCellByUserId(webhook.message.from["id"], "stateFSM")
  }
}

function getCellByRow(row, header) {
  let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
  column = s.getRange("1:1").createTextFinder(header).useRegularExpression(false).findAll()[0].getColumn()
  // row = getRowByUserId(userid)
  return s.getRange(row,column)
}

function getCellByUserId(userid, header) {
  let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
  column = s.getRange("1:1").createTextFinder(header).useRegularExpression(false).findAll()[0].getColumn()
  row = getRowByUserId(userid)
  return s.getRange(row,column)
}

function changeStateToWaitReady_1(webhook) {
  if (webhook.message && webhook.message.text === "/start") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.message.from["id"], "stateFSM").setValue("WAIT_READY_1")
  }
}
function changeStateToReady_2(webhook) {
  if (webhook.callback_query && webhook.callback_query.data === "ready") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("READY_2")
    
    let actions = UserStates[getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").getValue()];
    doActions(webhook, actions);
  }
}
function changeStateToWAIT_GET_MATERIALS_3(webhook) {
  // if (webhook.callback_query && webhook.callback_query.data === "ready") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("WAIT_GET_MATERIALS_3")
  // }
}
function changeStateToWantMaterials_4(webhook) {
  if (webhook.callback_query && webhook.callback_query.data === "get_materials") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("WANT_MATERIALS_4")
    
    let actions = UserStates[getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").getValue()];
    doActions(webhook, actions);
  }
}
function changeStateToWAIT_CALLBACK_CLAIM_5(webhook) {
  // if (webhook.callback_query && webhook.callback_query.data === "get_materials") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("WAIT_CALLBACK_CLAIM_5")
    
    // let actions = UserStates[getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").getValue()];
    // doActions(webhook, actions);
  // }
}

function changeStateToSENDING_DOC1_6(webhook) {
  if (webhook.callback_query && webhook.callback_query.data === "claim") {
    let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("SENDING_DOC1_6")
    
    let actions = UserStates[getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").getValue()];
    doActions(webhook, actions);
  }
}
function changeStateToWAIT_TIMEOUT1_7(webhook) {
  // if (webhook.callback_query && webhook.callback_query.data === "claim") {
    // let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients");
    getCellByUserId(webhook.callback_query.message.chat.id, "timeout").setValue(new Date().getTime() + (60 * 60 * 0.25))  // 60 секунд * 60 минут * 24 часа
    getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").setValue("WAIT_TIMEOUT1_7")

    // let actions = UserStates[getCellByUserId(webhook.callback_query.message.chat.id, "stateFSM").getValue()];
    // doActions(webhook, actions);
  // }
}

function changeStateTo(toState, fromStates, userid, startNextActions, webhook, cqd) {
  if (!cqd || (webhook.callback_query && webhook.callback_query.data === cqd)) {
    let currentState = getCellByUserId(userid, "stateFSM").getValue()
    if (
      fromStates.some(allowedStateFrom => (currentState === allowedStateFrom))
    ) {
      getCellByUserId(userid, "stateFSM").setValue(toState)
      if (startNextActions) {
        let actions = UserStates[getCellByUserId(userid, "stateFSM").getValue()];
        doActions(webhook, actions)
      }
    }
  }
}

function resetTimeout(webhook) {
  getCellByUserId(webhook.callback_query.message.chat.id, "timeout").setValue("")  // 60 секунд * 60 минут * 24 часа
}

function doActions(webhook, actions) {
  let chat_id = '0';
  if (webhook.message) {
    chat_id = webhook.message.chat.id.toString()
  } else if (webhook.callback_query) {
    chat_id = webhook.callback_query.message.chat.id.toString()
  }

    for (let action of actions) {
    if (action.callFunc) {
      action.callFunc(webhook);
    } else if (action.tgMethod) {
      // let { payload } = action;
      telegramMethod(action.tgMethod, { ...{chat_id}, ...(action.payload) });    
    }
  }
}

function doPost(e) {
  var webhook = JSON.parse(e.postData.contents);
  let chat_id = '0';
  if (webhook.message) {
    chat_id = webhook.message.chat.id.toString()
  } else if (webhook.callback_query) {
    chat_id = webhook.callback_query.message.chat.id.toString()
  }

  if (getRowByUserId(chat_id) === -1) {
    createNewClient(webhook)
  }

  let actions = UserStates[getCellByUserId(chat_id, "stateFSM").getValue()];
  doActions(webhook, actions);
}

function telegramMethod(tgMethod, payload) {
  UrlFetchApp.fetch("https://api.telegram.org/bot" + TOKEN + tgMethod, {
    method: "post",
    // contentType: "application/json",
    payload
  });
}

