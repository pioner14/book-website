const fs = require('fs');
const path = require('path');

// Функция для исправления frontmatter в файле
function fixFrontmatter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверяем, начинается ли файл с двух подряд идущих ---
  if (content.startsWith('---\n---')) {
    // Удаляем первый --- и перенос строки после него
    const fixedContent = content.replace(/^---\n/, '');
    
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Исправлен файл: ${filePath}`);
    return true;
  }
  
  return false;
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