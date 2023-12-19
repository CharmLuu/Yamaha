import {NativeModules, Platform} from "react-native";
import i18n from "i18next";
import localesResourse from "../i18n";
import { initReactI18next  } from "react-i18next";

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: cb => cb(deviceLanguage),
    init: () => {},
    cacheUserLanguage: () => {},
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: localesResourse,
        fallbackLng: "en",
        debug: false,
        // interpolation: {
        //     escapeValue: false
        // },
        react: {
            wait: false,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default'
        }
    });

export default i18n;
