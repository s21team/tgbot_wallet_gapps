// const urlPayChannel = "https://t.me/+-Kh2vpo8f8AyZDMy"
const urlPayChannel = "https://t.me/tribute/app?startapp=ssmN https://web.tribute.tg/s/smN  Технический переход: https://t.me/+gyS-zej70e9hZWQy"
const idContorlChat = -1002557881430;

const UserStates = Object.freeze({
  "START_0": [
    { callFunc: (webhook) => {getCellByUserId(webhook.message.chat.id, "timeoutCallState").setValue("TIME5_MSG")} },
    { callFunc: (webhook) => {getCellByUserId(webhook.message.chat.id, "timeout").setValue(new Date().getTime() + (60 * 60 * 0.25))} },
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1uoRXBA7F8F7I2UwkndrWM3IkwvAOrBPX/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("photo1.jpg"),
        'caption': `Привет! Ты только что сделал первый шаг к идеальному путешествию в Перу!

Я — Катя, мы с мужем путешественники со стажем 10 лет, посетили 55+ стран, и Перу — одна из самых необычных! Здесь я помогу тебе:
✅ Разобраться, как спланировать поездку без лишних затрат
✅ Избежать ошибок, которые совершают 90% туристов
✅ Увидеть не только Мачу-Пикчу, но и другие потрясающие места

⚡️ Тут ты найдешь реальные советы, проверенные маршруты и лайфхаки, которые сэкономят время, деньги и нервы.

Готов? Тогда поехали! 🚀`
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Готов", "callback_data": "ready"}]
          ]
        }),
        text: "Нажми на кнопку ниже, чтобы продолжить:",
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWaitReady_1},
    { callFunc: webhook => changeStateTo("WAIT_READY_1", ["START_0"], webhook.message.chat.id, false, webhook, undefined )},  // changeStateToSENDING_DOC1_6
  ],
  "WAIT_READY_1": [
    { callFunc: webhook => changeStateTo("READY_2", ["WAIT_READY_1"], webhook.callback_query.message.chat.id, true, webhook, "ready" )},
    // { callFunc: webhook => changeStateTo("NET_MEST", ["WAIT_CHOICE_PROF_1"], webhook.callback_query.message.chat.id, true, webhook, "robot" )},
  ],
  "READY_2": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1S3SVGGILOXd4A0iJiqzg6uTSF6zez7fO/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("photo2.jpg"),
'caption': `Знаешь, когда мы только собирались в Перу, у нас было куча вопросов:
— Как не потратить состояние на билеты в Мачу-Пикчу? 🤯
— Какие места кроме Мачу-Пикчу стоит увидеть?
— Правда ли, что Перу опасно?

Я прекрасно понимаю твои сомнения — мы тоже боялись потратить деньги зря, столкнуться с трудностями и не увидеть всего, что хотелось.

Но знаешь что? Я нашла все ответы и готова ими поделиться.
Секреты уже ждут тебя в этом боте! 😉 

(Далее можно сделать две кнопки на выбор:
«Получить секретные бесплатные материалы»
И
«Хочу полный гайд по Перу»)`
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Получить секретные бесплатные материалы", "callback_data": "want_free_materials"},
            {"text": "Хочу полный гайд по Перу", "callback_data": "want_full_guide"}]
          ]
        }),
        text: "Нажми на кнопку ниже, чтобы получить секретные материалы:",
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_GET_MATERIALS_3},
    { callFunc: webhook => changeStateTo("WAIT_GET_MATERIALS_3", ["READY_2"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "WAIT_GET_MATERIALS_3": [
    // { callFunc: changeStateToWantMaterials_4},
    { callFunc: webhook => changeStateTo("WANT_FREE_MATERIALS_4", ["WAIT_GET_MATERIALS_3"], webhook.callback_query.message.chat.id, true, webhook, "want_free_materials" )},
    { callFunc: webhook => changeStateTo("TY_ZNAESH_MSG_10", ["WAIT_GET_MATERIALS_3"], webhook.callback_query.message.chat.id, true, webhook, "want_full_guide" )},
  ],
  "WANT_FREE_MATERIALS_4": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1pLcoKZyVxM9W-T-CfXvHozsSMrQivXU7/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("wfm4.jpg"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Забрать", "callback_data": "claim"}]
          ]
        }),
        text: `🏔 Хочешь попасть в Мачу-Пикчу без головной боли и переплат?

Организовать путешествие в Перу — это не просто купить билет. Тут куча нюансов: акклиматизация, билеты в Мачу-Пикчу, логистика между городами… Я знаю, как легко запутаться. Поэтому собрала все нужное в одном гайде, чтобы у тебя было четкое понимание каждого шага. Так путешествие пройдет гладко, без лишних трат и нервов.

Я подготовила для тебя подробный гайд, который расскажет:
✅ Как выбрать самый удобный и дешевый способ добраться
✅ Как не попасть в ловушки, на которых теряют деньги 90% туристов
✅ Когда лучше ехать, чтобы потом не жалеть 

Забирай бесплатный гайд прямо сейчас! 🎁👇`,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    { callFunc: webhook => changeStateTo("WAIT_CALLBACK_CLAIM_5", ["WANT_FREE_MATERIALS_4"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "WAIT_CALLBACK_CLAIM_5": [
    { callFunc: webhook => changeStateTo("SENDING_DOC1_6", ["WAIT_CALLBACK_CLAIM_5"], webhook.callback_query.message.chat.id, true, webhook, "claim" )},  // changeStateToSENDING_DOC1_6
    // { callFunc: webhook => changeStateTo("VODITEL_4", ["WAIT_CALLBACK_CLAIM_5"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "SENDING_DOC1_6": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/16pQPi3RAr_WMYIR9WSuTMl3Mn3Mn1X2p/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("photo2.jpg"),
      }
    },
    { tgMethod: "/sendDocument", 
      payload: {
        document: DriveApp.getFileById("https://drive.google.com/file/d/1KhdHEq5xQZbYkou11LB-1rprYQ5yxxyF/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("Doc1.pdf"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: {
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Забрать бесплатно готовый маршрут", "callback_data": "want_free_materials"},
            {"text": "Хочу полный гайд по Перу", "callback_data": "want_full_guide"}]
          ]
        }),
        text: `Ты уже знаешь больше, чем 90% туристов! 🎒

Ты скачал гайд по Мачу-Пикчу — значит, ты точно не совершишь ошибок, которые портят поездку большинству путешественников. Но Мачу-Пикчу — это только часть твоего приключения в Перу!

Что дальше?

📍 Какие места стоит посетить? 
🏡 Как лучше составить маршрут? 
🚎 Что нельзя упустить? 

Я подготовила готовый маршрут по Перу, в котором уже есть ответы на эти вопросы! Это идеальный план, чтобы увидеть лучшее в стране и сэкономить время (и деньги) на планировании.`,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_TIMEOUT1_7},
    { callFunc: webhook => changeStateTo("WAIT_CHOICE2_7", ["SENDING_DOC1_6"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "WAIT_CHOICE2_7": [
    { callFunc: webhook => changeStateTo("UZHE_MSG_8", ["WAIT_CHOICE2_7"], webhook.callback_query.message.chat.id, true, webhook, "want_free_materials" )},
    { callFunc: webhook => changeStateTo("TY_ZNAESH_MSG_10 ", ["WAIT_CHOICE2_7"], webhook.callback_query.message.chat.id, true, webhook, "want_full_guide" )},
  ],
  // "SENDING_DOC2_2": [
  //   { callFunc: resetTimeout},
  //   { tgMethod: "/sendDocument", 
  //     payload: {
  //       document: DriveApp.getFileById("https://drive.google.com/file/d/1ivd8LgQw6wjkBK_iKzJqHx7IC5oLoDVg/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
  //         .setName(encodeURIComponent("готовый_маршрут_по_перу_на_2_недели.pdf")),
  //     }
  //   },
  //   { tgMethod: "/sendMessage", 
  //     payload: {
  //       text: "Предлагаю присоединиться в наш платный канал с огромной кучей полезной информации https://t.me/tribute/app?startapp=srXn",
  //       "parse_mode": 'HTML'
  //     }
  //   },
  //   { callFunc: webhook => changeStateTo("TUPIK", ["SENDING_DOC2_2"], webhook.message.chat.id, false, webhook, undefined )},
  // ],
  "INFORM_MSG_12": [
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "всё понятно", "callback_data": "claim"}]
          ]
        }),
        text: `ПРОЧТИ ВНИМАТЕЛЬНО 🔵

1️⃣ Сейчас тебе придет ссылка на оплату - ей можно доверять, это созданная лично мной ссылка. 

2️⃣ После оплаты тебе придет доступ в закрытый телеграм-канал. Там-то ты и скачаешь гайд. 

Если всё понятно, жми "всё понятно"`,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    { callFunc: webhook => changeStateTo("TOCHO_PONYAL1", ["INFORM_MSG_12"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "TOCHO_PONYAL1": [
    // { callFunc: changeStateToWantMaterials_4},
    { callFunc: webhook => changeStateTo("TUPIK_13", ["TOCHO_PONYAL1"], webhook.callback_query.message.chat.id, true, webhook, "claim" )},
  ],
  "TY_ZNAESH_MSG_10": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1uBglycikj1JhFSXjgk2Y4HM_SdRbncnS/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("TY_ZNAESH_MSG_10.png"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "купить гайд со скидкой", "callback_data": "claim"}]
          ]
        }),
        text: `Ты знаешь, что здесь только проверенная информация 😉

Ты уже скачивал мои бесплатные материалы и видел, насколько они полезны. Теперь представляешь, сколько пользы в полном гайде по Перу!

📌 Готовый маршрут + нюансы логистики
🏡 Лучшие районы для жилья, чтобы было удобно и безопасно
🚎 Как передвигаться по стране без переплат и ошибок
🍽 Где найти настоящую местную кухню без туристических цен
🎟 Чек-лист броней и билетов, которые важно купить заранее

🔥 Сейчас гайд можно приобрести со скидкой – всего за 2990₽! 🔥

Не упусти возможность подготовиться к путешествию по максимуму и при этом сэкономить.`,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    { callFunc: webhook => changeStateTo("TOCHO_PONYAL2_11", ["TY_ZNAESH_MSG_10"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "TOCHO_PONYAL2_11": [
    // { callFunc: changeStateToWantMaterials_4},
    { callFunc: webhook => changeStateTo("INFORM_MSG_12", ["TOCHO_PONYAL2_11"], webhook.callback_query.message.chat.id, true, webhook, "claim" )},
  ],
  "UZHE_MSG_8": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1nplln0LI5ekxl_OoYRoy2r5QMD1aNMkr/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("UZHE_MSG_8.png"),
      }
    },
    { tgMethod: "/sendDocument", 
      payload: {
        document: DriveApp.getFileById("https://drive.google.com/file/d/1ivd8LgQw6wjkBK_iKzJqHx7IC5oLoDVg/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("Doc2.pdf"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "купить гайд", "callback_data": "claim"}]
          ]
        }),
        text: `Если нажали "забрать готовый маршрут", то забирают еще один бесплатный гайд , и после этого сообщение:

У тебя уже есть маршрут, но как избежать подводных камней? 🤔

Ты получил готовый маршрут по Перу — теперь у тебя есть чёткий план путешествия. Но детали решают всё:

🏡 Как найти удобное жильё без переплат?
🚎 Какие виды транспорта реально работают и безопасны?
🍽 Где поесть вкусно и недорого, а не попасть в туристическую ловушку?
🎟 Какие билеты нужно бронировать заранее, чтобы не остаться за бортом?

Я собрала все практические нюансы в одном месте — гайде по Перу, который сэкономит тебе часы поисков и избавит от неприятных сюрпризов.

⚡️ Готовый чек-лист по броням, рабочие ссылки, контакты, лайфхаки от путешественников с опытом. Всё, что нужно для комфортной поездки без стресса.`,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    { callFunc: webhook => changeStateTo("TOCHO_PONYAL3_9", ["UZHE_MSG_8"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "TOCHO_PONYAL3_9": [
    // { callFunc: changeStateToWantMaterials_4},
    { callFunc: webhook => changeStateTo("TY_ZNAESH_MSG_10", ["TOCHO_PONYAL3_9"], webhook.callback_query.message.chat.id, true, webhook, "claim" )},
  ],
  "TIME5_MSG": [
    { tgMethod: "/sendMessage", 
      payload: { 
        // reply_markup: JSON.stringify({ inline_keyboard: [
        //     [{"text": "Забрать", "callback_data": "claim"}]
        //   ]
        // }),
        // Если человек совершил покупку в течение 5 минут, то ему не надо слать следующее сообщение. 
    // А если человек не совершит покупку, то нужно прислать подогревающее сообщение
        text: `О-оу. Вижу, что ты пока еще не решился. 

Ничего страшного! У меня есть то, от чего ты точно не сможешь отказаться 😏

У меня для тебя специальная скидка 🎉

Ты уже изучил мои бесплатные материалы и сделал первый шаг к идеальному путешествию по Перу. Теперь у тебя есть возможность взять полный гайд со скидкой — только для тех, кто уже знаком с моими материалами!

📌 Что внутри:
✅ Подробный маршрут по Перу с логистикой
✅ Рекомендации по жилью в лучших районах
✅ Что такое и как избежать горной болезни
✅ Разбор транспорта: где купить билеты, как не переплачивать
✅ Список местной еды, которую стоит попробовать
✅ и многое другое! 

🔥 Сейчас гайд доступен со скидкой — всего 2990₽! 🔥

Эта скидка действует ограниченное время, так что если хочешь сэкономить и получить готовый план путешествия — самое время взять гайд!`,
        "parse_mode": 'HTML'
      }
    },
    { callFunc: (fakeWebhook) => {getCellByUserId(fakeWebhook.callback_query.message.chat.id, "timeoutCallState").setValue("TIME24_MSG")} },
    { callFunc: (fakeWebhook) => {getCellByUserId(fakeWebhook.callback_query.message.chat.id, "timeout").setValue(new Date().getTime() + (60 * 60 * 0.25))} },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    // { callFunc: webhook => changeStateTo("WAIT_CALLBACK_CLAIM_5", ["WANT_FREE_MATERIALS_4"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "TIME24_MSG": [
    { tgMethod: "/sendMessage", 
      payload: { 
        // reply_markup: JSON.stringify({ inline_keyboard: [
        //     [{"text": "Забрать", "callback_data": "claim"}]
        //   ]
        // }),
        // Если человек совершил покупку в течение 5 минут, то ему не надо слать следующее сообщение. 
    // А если человек не совершит покупку, то нужно прислать подогревающее сообщение
        text: `Если покупки не было, то через сутки можно отправить такое сообщение: 

О чём на самом деле этот гайд? 

Когда ты откроешь его, поймёшь — это не просто список маршрутов и советов, как доехать из точки А в точку Б. 
✅ Да, там есть вся практическая информация: логистика, жильё, транспорт, чек-листы. 

Но главное — это моё видение.
Я вложила туда свой опыт, ценности и самое важное: понимание, что путешествия не обязаны стоить миллионы. 💸

Не нужно ждать «лучших времён» или копить годами.
Даже находясь уже в стране, можно находить маршруты, которые:
— не выбивают из бюджета 💰
— дарят настоящие эмоции ✨
— дают свободу 🌍

Этот гайд — про то, как можно иначе.
Про свободу выбора. Про уверенность, что путешествия доступны каждому.

Если ты чувствуешь отклик — гайд уже ждёт тебя. 📩`,
        "parse_mode": 'HTML'
      }
    },
    { callFunc: (webhook) => {getCellByUserId(webhook.message.chat.id, "timeoutCallState").setValue("")} },
    { callFunc: (webhook) => {getCellByUserId(webhook.message.chat.id, "timeout").setValue("")} },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    // { callFunc: webhook => changeStateTo("WAIT_CALLBACK_CLAIM_5", ["WANT_FREE_MATERIALS_4"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  
  "TUPIK_13": [
    { tgMethod: "/sendMessage", 
      payload: { 
        // reply_markup: JSON.stringify({ inline_keyboard: [
        //     [{"text": "купить гайд", "callback_data": "claim"}]
        //   ]
        // }),
        text: urlPayChannel,
        "parse_mode": 'HTML'
      }
    },
    // { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
    { callFunc: webhook => changeStateTo("TUPIK_14", ["TUPIK_13"], webhook.callback_query.message.chat.id, false, webhook, undefined )},

  ],
  "TUPIK_14": [],
  "SUCCES_15": [
    { callFunc: (webhook) => {getCellByUserId(webhook.message.new_chat_member.id, "timeoutCallState").setValue("")} },
    { callFunc: (webhook) => {getCellByUserId(webhook.message.new_chat_member.id, "timeout").setValue("")} },
    { callFunc: (webhook) => {getCellByUserId(webhook.message.new_chat_member.id, "isPaid").setValue("=TRUE")} },
    { tgMethod: "/sendDocument", 
      payload: {
        document: DriveApp.getFileById("https://drive.google.com/file/d/1KhdHEq5xQZbYkou11LB-1rprYQ5yxxyF/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("Doc3.pdf"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: {
        text: `Congratulations!!!`,
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("TUPIK_14", ["SUCCES_15"], webhook.message.new_chat_member.id, false, webhook, undefined )},
  ],
});