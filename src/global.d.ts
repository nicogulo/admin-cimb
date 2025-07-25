// Declaring this interface provides type safety for message keys
type Messages = typeof import("../public/locales/en/common.json")
declare interface IntlMessages extends Messages {}
