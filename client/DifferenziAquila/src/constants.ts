export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://localhost:8080/differenziaquila/api/';

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
    },
    CALENDAR: {
      GET: "calendar/",
      FROM: "from/",
      TO: "to/"
    }
};

export const CALENDAR={
  DEFAULT_SIZE: 30,
  DEFAULT_END: "2018-01-31",
  INFINITE_SCROLL: 14
};

  RS:{
      GET: "recyclingsack/"
  },
  SWCR: {
    CREATE: "specialwasterequest/"
  }

};

export const SACK={
  LIMIT:5,
  DEFAULT:0
};
export const STORAGE_KEYS = {
    USER: "differenziaquila_user",
    CALENDAR: "differenziaquila_calendar"
};
