const fs = require('fs');
const path = require('path');

// Функция для удаления дублирующихся изображений из MDX файла
function removeDuplicateImages(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Сначала найдем все изображения, которые вставлены с нормальными описаниями
  // Они идут в тексте и имеют осмысленные alt-атрибуты
  const normalImages = [];
  const normalImageRegex = /<ChapterImage\s+src="([^"]+)"\s+alt="([^"]+)"\s*\/>/g;
  let match;
  while ((match = normalImageRegex.exec(content)) !== null) {
    // Пропускаем изображения с обобщенными описаниями вроде "Иллюстрация к главе N, изображение N"
    if (!match[2].includes('Иллюстрация к главе') && 
        !match[2].includes('Illustration du chapitre') && 
        !match[2].includes('Ілюстрація до розділу')) {
      normalImages.push({
        src: match[1],
        alt: match[2],
        fullMatch: match[0]
      });
    }
  }

  // Удаляем все изображения с обобщенными описаниями в конце файла
  // Это дубликаты с названиями вроде "Иллюстрация к главе N, изображение M"
  content = content.replace(/<ChapterImage\s+src="[^"]+"\s+alt="(Иллюстрация к главе|Illustration du chapitre|Ілюстрація до розділу)[^"]+"\s*\/>\s*/g, '');

  // Также удаляем возможные дубликаты с названиями вроде "Изображение к главе" и т.п.
  content = content.replace(/<ChapterImage\s+src="[^"]+"\s+alt="[^"]*изображени[ея][^"]*"\s*\/>\s*/gi, '');

  // Сохраняем изменения, если они есть
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content);
    console.log(`Исправлен файл: ${filePath}`);
    return true;
  } else {
    console.log(`Формат изображений уже корректен в файле: ${filePath}`);
    return false;
  }
}

// Обработка файлов в указанной директории
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории
      processDirectory(fullPath);
    } else if ((file.endsWith('.md') || file.endsWith('.mdx')) && !file.includes('.DS_Store')) {
      // Обрабатываем файлы .md и .mdx
      removeDuplicateImages(fullPath);
    }
  }
}

// Обрабатываем все директории с контентом
const contentDir = '/home/nick/Projects/book-website/src/content/book/';
const languages = ['ru', 'ua', 'fr'];

for (const lang of languages) {
  const langDir = path.join(contentDir, lang);
  if (fs.existsSync(langDir)) {
    console.log(`Обработка директории: ${langDir}`);
    processDirectory(langDir);
  }
}

console.log('Удаление дублирующихся изображений завершено.');