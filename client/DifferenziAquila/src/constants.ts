export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://192.168.0.3:8080/differenziaquila/api/';

export const URL = {
  USERS: {
    SIGNUP: "users/",
    LOGIN: "login/",
    LOGOUT: "logout/",
    UPDATE: "users/"
  },
  RSR: {
    CREATE: "recyclingsackrequest/"
  },
  RS: {
    GET: "recyclingsack/"
  },
  SWCR: {
    CREATE: "specialwasterequest/"
  },
  SW: {
    GET: "specialwaste/"
  },
  CALENDAR: {
    GET: "calendar/",
    FROM: "from/",
    TO: "to/"
  },
  WASTE_CATEGORY: {
    GET: "wastecategory/"
  },
  COLLECTION_POINT: {
    GET: "collectionpoint/"
  },
  NEWS: {
    GET: "news/"
  }
};

export const NOTIFICATION = {
  DEFAULT_TITLE: "DifferenziAquila",
  ICON: "res://icon.png",

};

export const CALENDAR = {
  DEFAULT_SIZE: 30,
  DEFAULT_END: "2018-01-31",
  INFINITE_SCROLL: 14
};

export const SACK = {
  LIMIT: 5,
  DEFAULT: 0
};

export const STORAGE_KEYS = {
  USER: "differenziaquila_user",
  CALENDAR: "differenziaquila_calendar",
  COLLECTION_POINT: "differenziaquila_collectionpoint",
  NOTIFICATION: "differenziaquila_notification",
  NEWS: "differenziaquila_news",
};
