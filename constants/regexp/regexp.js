import emailRegexSafe from "email-regex-safe";
const EMAIL_REGEXP = emailRegexSafe();

// email-regex-safe don't validate email with one letter username like i@madappgang.com this regexp help find this email
const EMAIL_ONE_LETTER_USER_NAME_REGEXP =
  /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

export { EMAIL_REGEXP, EMAIL_ONE_LETTER_USER_NAME_REGEXP };
