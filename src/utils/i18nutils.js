import IntlMessageFormat from 'intl-messageformat';
import en from '../assets/i18n/en.json';
import {StringUtil} from './stringutils';
/*
 * If adding more languages then add those locales in the locales array.
 */
// import de from '../assets/i18n/de.json';

let locale =
    (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

export function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const output = messages;
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (StringUtil.isString(value)) {
            output[prefixedKey] = value;
        } else {
            Object.assign(output, flattenMessages(value, prefixedKey));
        }
        return output;
    }, {});
}

const MESSAGES = {
    'en-US': flattenMessages(en),
    // 'de-LU': flattenMessages(de)
};


export function getLocalizedString(key, values, defaultMessage) {
/*
 * If adding more languages then add those locales in the locales array and flatten them inside MESSAGES.
 */
    const locales = ['en-US'];
    if (!locales.includes(locale)) {
        locale = 'en-US';
    }
    const messages = MESSAGES[locale];
    let msg = null;
    try {
        msg = new IntlMessageFormat(messages[key], locale);
    } catch (e) {
        if (defaultMessage)
            return defaultMessage;
        return key;
    }
    return msg.format(values);
}
