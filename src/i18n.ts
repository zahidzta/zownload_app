import en from "../shared/i18n/en.json";
import es from "../shared/i18n/es.json";
import type { Language } from "../shared/contract";

const dictionaries = { en, es } as const;

export type TranslationKey = keyof typeof en;

export function translate(language: Language, key: TranslationKey): string {
  return dictionaries[language][key];
}
