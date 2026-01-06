const fs = require('fs');
const path = require('path');

const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru/';

// Обрабатываем главы 2-10
for (let i = 2; i <= 10; i++) {
  const filePath = path.join(chaptersDir, `chapter${i}.mdx`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Исправляем формат frontmatter, если импорт находится внутри
    const correctedContent = content.replace(
      /(---\n(?:[\s\S]*?\n)*?)(import .+?from[\s\S]*?)(# .+)/,
      (match, frontmatter, imports, rest) => {
        return frontmatter + "---\n\n" + imports + "\n" + rest;
      }
    );
    
    // Проверяем, что исправления корректны
    if (correctedContent !== content) {
      fs.writeFileSync(filePath, correctedContent);
      console.log(`Исправлен формат frontmatter в главе ${i}`);
    } else {
      // Проверяем, есть ли вообще разрыв между frontmatter и импортом
      const hasSeparation = content.includes("---\n\nimport ");
      if (!hasSeparation) {
        const fixedContent = content.replace(
          /(---\n[\s\S]*?\n---)(\s*)(import .+?from[\s\S]*?)(# .+)/,
          '$1\n\n$3\n$4'
        );
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent);
          console.log(`Исправлен формат frontmatter в главе ${i}`);
        }
      } else {
        console.log(`Формат frontmatter уже корректен в главе ${i}`);
      }
    }
  } else {
    console.log(`Файл главы ${i} не найден`);
  }
}

console.log('Все файлы глав обновлены с корректным форматом frontmatter');