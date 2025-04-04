var TOKEN = "7519538518:AAH9e3Wag_X8CyIoOkJfINPgub9skQwQbCU";

const UserStates = Object.freeze({
  "START_0": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1TDOYme9mmbycYrzq1YG5XuWL9wltTHTE/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("photo1.jpg"),
        'caption': "Привет! Мы - Комания с большой буквы! Хочешь у нас работать, но не знаешь кем?!\n\n" +
                   "Наши вакансии:\n" +
                  //  "✅ Разобраться, как спланировать поездку без лишних затрат\n" +
                  //  "✅ Избежать ошибок, которые совершают 90% туристов\n" +
                  //  "✅ Увидеть не только Мачу-Пикчу, но и другие потрясающие места\n\n" +
                  //  "⚡ Тут ты найдешь реальные советы, проверенные маршруты и лайфхаки, которые сэкономят время, деньги и нервы.\n\n" +
                  //  "Готов? Тогда поехали! 🚀"
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Работа водителем", "callback_data": "voditel"}, {"text": "Работа для роботов", "callback_data": "robot"}]
          ]
        }),
        text: "Наши вакансии:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: changeStateToWaitReady_1},
  ],
  "WAIT_READY_1": [
    { callFunc: changeStateToReady_2},
  ],
  "READY_2": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/1BRFB-e-Jk3pDMn5_7cdPrPZvjnTqN2Ub/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("photo2.jpg"),
        'caption': "Знаешь, когда мы только собирались в Перу, у нас было куча вопросов:\n" +
                   "— Как не потратить состояние на билеты в Мачу-Пикчу? 🤯\n" +
                   "— Какие места кроме Мачу-Пикчу стоит увидеть?\n" +
                   "— Правда ли, что Перу опасно?\n\n" +
                   "Я прекрасно понимаю твои сомнения — мы тоже боялись потратить деньги зря, столкнуться с трудностями и не увидеть всего, что хотелось.\n\n" +
                   "Но знаешь что? Я нашла все ответы и готова ими поделиться.\n" +
                   "Секреты уже ждут тебя в этом боте! 😉"
      }
    },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Хочу секретные материалы", "callback_data": "get_materials"}]
          ]
        }),
        text: "Нажми на кнопку ниже, чтобы получить секретные материалы:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: changeStateToWAIT_GET_MATERIALS_3},
  ],
  "WAIT_GET_MATERIALS_3": [
    { callFunc: changeStateToWantMaterials_4},
  ],
  "WANT_MATERIALS_4": [
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Забрать", "callback_data": "claim"}]
          ]
        }),
        text: "🏔 Хочешь попасть в Мачу-Пикчу без головной боли и переплат?\n\n" +
                   "Я подготовила для тебя подробный гид, который расскажет:\n" +
                   "✅ Как выбрать самый удобный и дешевый способ добраться\n" +
                   "✅ Как не попасть в ловушки, на которых теряют деньги 90% туристов\n" +
                   "✅ Когда лучше ехать, чтобы потом не жалеть \n\n" +
                   "Забирай бесплатный гайд прямо сейчас! 🎁👇",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: changeStateToWAIT_CALLBACK_CLAIM_5},
  ],
  "WAIT_CALLBACK_CLAIM_5": [
    { callFunc: webhook => changeStateTo("SENDING_DOC1_6", ["WAIT_CALLBACK_CLAIM_5"], webhook.callback_query.message.chat.id, true, webhook, "claim" )},  // changeStateToSENDING_DOC1_6
  ],
  "SENDING_DOC1_6": [
    { tgMethod: "/sendDocument", 
      payload: {
        document: DriveApp.getFileById("https://drive.google.com/file/d/1KhdHEq5xQZbYkou11LB-1rprYQ5yxxyF/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("Machu Picchu.pdf"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Ты пока изучай полученный материал, а я расскажу, что скоро тебя ждет в этом боте 🤫\n\n" +
        "Я приготовила для тебя еще один подарок — готовый маршрут на 2 недели по Перу! 🇵🇪 \n\n" +
        "В нем собраны самые красивые и знаковые места страны и удобная логистика. Этот маршрут поможет " +
        "тебе не тратить недели на поиски информации, а просто взять и повторить наше путешествие, увидев максимум за разумные деньги.\n\n" +
        "Скоро скину все детали, не пропусти! ❤️ https://t.me/tribute/app?startapp=pf2O",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: changeStateToWAIT_TIMEOUT1_7},
  ],
  "WAIT_TIMEOUT1_7": [],
  "TIME_IS_OUT1_8": [
    { callFunc: resetTimeout},
    { tgMethod: "/sendDocument", 
      payload: {
        document: DriveApp.getFileById("https://drive.google.com/file/d/1KhdHEq5xQZbYkou11LB-1rprYQ5yxxyF/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("Второй документ.pdf"),
      }
    },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Предлагаю присоединиться в наш платный канал с огромной кучей полезной информации https://t.me/tribute/app?startapp=srXn",
        "parse_mode": 'HTML'
      }
    },
    
  ]
});