var TOKEN = "";

const UserStates = Object.freeze({
  "START_0": [
    { tgMethod: "/sendPhoto", 
      payload: {
        'photo': DriveApp.getFileById("https://drive.google.com/file/d/17le16BiyXrOP9efWW0l7OW6Dy19CcN4u/view?usp=drive_link".match(/[-\w]{25,}/)[0]).getBlob()
          .setName("negabarit12_1.png"),
        'caption': "Привет! Мы - Комания Негабарит 12! Хочешь у нас работать, но не знаешь кем?!\n\n"
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
    { callFunc: webhook => changeStateTo("WAIT_CHOICE_PROF_1", ["START_0"], webhook.message.chat.id, false, webhook, undefined )},  // changeStateToSENDING_DOC1_6
  ],
  "WAIT_CHOICE_PROF_1": [
    { callFunc: webhook => changeStateTo("VODITEL_19", ["WAIT_CHOICE_PROF_1"], webhook.callback_query.message.chat.id, true, webhook, "voditel" )},
    { callFunc: webhook => changeStateTo("NET_MEST", ["WAIT_CHOICE_PROF_1"], webhook.callback_query.message.chat.id, true, webhook, "robot" )},
  ],
  "NET_MEST": [
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Работа водителем", "callback_data": "voditel"}]
          ]
        }),
        text: "К сожалению все места для роботов - заняты роботами, и они пока не планируют увольнятся... Придётся поработать видителем",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("WAIT_CHOICE_PROF_1", ["NET_MEST"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_1": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Ваши ФИО:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_2", ["VODITEL_1"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_2": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "FIO")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Ваша дата рождения:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_3", ["VODITEL_2"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_3": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "Birthday")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "3.	Ваш контактный номер телефона:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_4", ["VODITEL_3"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_4": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "phoneNumber")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "4.	Регион Вашего проживания",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_5", ["VODITEL_4"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_5": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "region")  },
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Без опыта", "callback_data": "bez_opyta"}, {"text": "Имею опыт", "callback_data": "imeet_opyt"}]
          ]
        }),
        text: "Опыт Вашей работы на тралах:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_EST_LI_OPYT", ["VODITEL_5"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_EST_LI_OPYT": [
    { callFunc: (webhook) => writeAnswerTo(Object.assign(webhook, {message: {text: webhook.callback_query.data, from: webhook.callback_query.from}}), "VODITEL_EST_LI_OPYT")  },
    { callFunc: webhook => changeStateTo("VODITEL_6", ["VODITEL_EST_LI_OPYT"], webhook.callback_query.message.chat.id, true, webhook, "imeet_opyt" )},
    { callFunc: webhook => changeStateTo("VODITEL_10", ["VODITEL_EST_LI_OPYT"], webhook.callback_query.message.chat.id, true, webhook, "bez_opyta" )},
  ],
  "VODITEL_6": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "2. На каких транспортных средствах Вы перевозили негабаритные грузы: марка тягача?:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_7", ["VODITEL_6"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_7": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "spisokTS")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Марка трала:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_8", ["VODITEL_7"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_8": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "markaTrala")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Количество осей трала?:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_9", ["VODITEL_8"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_9": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "kolvoOsey")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "География перевозок:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("WRITE_GEOG1", ["VODITEL_9"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "WRITE_GEOG1": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "geogrPerevozok")  },
    { callFunc: webhook => changeStateTo("VODITEL_10", ["WRITE_GEOG1"], webhook.message.chat.id, true, webhook, undefined )},
  ],
  "VODITEL_10": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Какую максимальную продолжительность вахты Вы рассматриваете::",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_11", ["VODITEL_10"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_11": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "maxVahta")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Какую продолжительность отдыха вы рассматриваете:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_13", ["VODITEL_11"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  //   "VODITEL_12": [
  //   { tgMethod: "/sendMessage", 
  //     payload: { 
  //       // reply_markup: JSON.stringify({ inline_keyboard: [
  //       //     [{"text": "Хочу секретные материалы", "callback_data": "get_materials"}]
  //       //   ]
  //       // }),
  //       text: "Какую продолжительность отдыха вы рассматриваете:",
  //       "parse_mode": 'HTML'
  //     }
  //   },
  //   { callFunc: webhook => changeStateTo("VODITEL_3", ["VODITEL_2"], webhook.message.chat.id, false, webhook, undefined )},
  // ],
    "VODITEL_13": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "prodoljOtdyha")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "13.	Действительные карты тахографов:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_14", ["VODITEL_13"], webhook.message.chat.id, false, webhook, undefined )},
  ],
    "VODITEL_14": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "kartyTahogr")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "14.	Имеются ли у Вас исполнительные листы:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_15", ["VODITEL_14"], webhook.message.chat.id, false, webhook, undefined )},
  ],
    "VODITEL_15": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "ispListy")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "15.	Последнее место Вашей работы:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_16", ["VODITEL_15"], webhook.message.chat.id, false, webhook, undefined )},
  ],
    "VODITEL_16": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "poslRabota")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "16.	Причина увольнения с последнего места работы? Распишите подробно:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_18", ["VODITEL_16"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  //   "VODITEL_17": [
  //   { tgMethod: "/sendMessage", 
  //     payload: {
  //       text: "17.	Последнее место работы связанное с перевозками негабаритных грузов:",
  //       "parse_mode": 'HTML'
  //     }
  //   },
  //   { callFunc: webhook => changeStateTo("VODITEL_18", ["VODITEL_17"], webhook.message.chat.id, false, webhook, undefined )},
  // ],
    "VODITEL_18": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "prichinaUvoln")  },
    { tgMethod: "/sendMessage", 
      payload: {
        text: "18.	Телефон контактного лица с последнего места работы:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_23", ["VODITEL_18"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "VODITEL_19": [
    { tgMethod: "/sendMessage", 
      payload: { 
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Да", "callback_data": "sudim"}, {"text": "Нет", "callback_data": "nesudim"}]
          ]
        }),
        text: "19.	Имеются ли у Вас судимости",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("SUDIM_NESUDIM", ["VODITEL_19"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "SUDIM_NESUDIM": [
    { callFunc: (webhook) => writeAnswerTo(Object.assign(webhook, {message: {text: webhook.callback_query.data, from: webhook.callback_query.from}}), "SUDIM_NESUDIM")  },
    { callFunc: webhook => changeStateTo("VODITEL_20", ["SUDIM_NESUDIM"], webhook.callback_query.message.chat.id, true, webhook, "sudim" )},
    { callFunc: webhook => changeStateTo("VODITEL_1", ["SUDIM_NESUDIM"], webhook.callback_query.message.chat.id, true, webhook, "nesudim" )},
  ],
  "VODITEL_20": [
    { tgMethod: "/sendMessage", 
      payload: {
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Да", "callback_data": "pogasheny"}, {"text": "Нет", "callback_data": "nepogasheny"}]
          ]
        }),
        text: "20.	Погашены или нет Ваши судимости:",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("NEPOGASHENY", ["VODITEL_20"], webhook.callback_query.message.chat.id, false, webhook, undefined )},
  ],
  "NEPOGASHENY": [
    { callFunc: (webhook) => writeAnswerTo(Object.assign(webhook, {message: {text: webhook.callback_query.data, from: webhook.callback_query.from}}), "NEPOGASHENY")  },
    { callFunc: webhook => changeStateTo("VODITEL_1", ["NEPOGASHENY"], webhook.callback_query.message.chat.id, true, webhook, "pogasheny" )},
    { callFunc: webhook => changeStateTo("VODITEL_21", ["NEPOGASHENY"], webhook.callback_query.message.chat.id, true, webhook, "nepogasheny" )},
  ],
    "VODITEL_21": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "21.	Когда Вы готовы приступить к работе в случае положительного решения?",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("VODITEL_22", ["VODITEL_21"], webhook.callback_data.message.chat.id, false, webhook, undefined )},
  ],
    "VODITEL_22": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "22.	Запишите видеовизитку с ответами на следующие вопросы: Почему мы должны взять на работу именно Вас в нашу компанию?",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("OJIDAITE", ["VODITEL_22"], webhook.message.chat.id, false, webhook, undefined )},
  ],
    "VODITEL_23": [
    { callFunc: (webhook) => writeAnswerTo(webhook, "phoneRabotodatelya")  },
    { tgMethod: "/sendMessage", 
      payload: {
        reply_markup: JSON.stringify({ inline_keyboard: [
            [{"text": "Да", "callback_data": "belaya"}, {"text": "Нет", "callback_data": "seraya"}]
          ]
        }),
        text: "Готовы ли вы к официальному трудоустройству??",
        "parse_mode": 'HTML'
      }
    },
    { callFunc: webhook => changeStateTo("BELAYA_SERAYA", ["VODITEL_23"], webhook.message.chat.id, false, webhook, undefined )},
  ],
  "BELAYA_SERAYA": [
    { callFunc: (webhook) => writeAnswerTo({...{message: {text: webhook.callback_query.data}}, ...webhook}, "BELAYA_SERAYA")  },
    { callFunc: webhook => changeStateTo("VODITEL_1", ["SUDIM_NESUDIM"], webhook.callback_query.message.chat.id, true, webhook, "belaya" )},
    { callFunc: webhook => changeStateTo("VODITEL_21", ["SUDIM_NESUDIM"], webhook.callback_query.message.chat.id, true, webhook, "seraya" )},
  ],
  "OJIDAITE": [
    { tgMethod: "/sendMessage", 
      payload: {
        text: "Спасибо, мы с вами свяжемся",
        "parse_mode": 'HTML'
      }
    }
  ],
});