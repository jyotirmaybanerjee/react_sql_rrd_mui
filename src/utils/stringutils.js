export class StringUtil {
    static capitalize(string) {
        return string.replace(/\b\w/g, l => l.toUpperCase());
    }

    static isString(input) {
        return Object.prototype.toString.call(input) === "[object String]";
    }
}
