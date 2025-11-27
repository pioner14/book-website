import ru from './ru.json';
import ua from './ua.json';
import fr from './fr.json';

const languages = {
  ru,
  ua,
  fr,
};

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return 'ru'; // Возвращаем язык по умолчанию
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof typeof ru, vars: Record<string, string | number> = {}) {
    let translation = languages[lang][key] || languages['ru'][key];
    
    // Подстановка переменных (например, {year})
    for (const [key, value] of Object.entries(vars)) {
      translation = translation.replace(`{${key}}`, String(value));
    }

    return translation;
  }
}
