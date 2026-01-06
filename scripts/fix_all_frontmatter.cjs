const fs = require('fs');
const path = require('path');

// Функция для исправления frontmatter в файле
function fixFrontmatter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Исправляем проблему с двойными --- в начале файла
  // Случай: ---\n---\n...metadata...\n---
  content = content.replace(/^---\s*\n---\s*\n([\s\S]*?)\n(---\n)/, '---\n$1\n$2');

  // Исправляем случай, когда между открывающим --- и остальным фронтматтером есть пустая строка
  content = content.replace(/^---\n\s*\n([\s\S]*?)\n(---\n)/, '---\n$1\n$2');

  // Проверяем, что после завершающего --- идет пустая строка перед импортами или заголовком
  content = content.replace(/(---\n)(import|export|#)/g, '$1\n$2');

  // Сохраняем изменения, если они есть
  if (originalContent !== content) {
    fs.writeFileSync(filePath, content);
    console.log(`Исправлен файл: ${filePath}`);
    return true;
  } else {
    console.log(`Формат frontmatter уже корректен в файле: ${filePath}`);
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
      fixFrontmatter(fullPath);
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

console.log('Исправление frontmatter завершено.');