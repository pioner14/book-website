const fs = require('fs');
const path = require('path');

const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru/';
const imageFiles = {};

// Считываем все изображения из директорий глав
for (let i = 1; i <= 10; i++) {
  const imagePath = `/home/nick/Projects/book-website/public/chapter-images/${i}/`;
  if (fs.existsSync(imagePath)) {
    const files = fs.readdirSync(imagePath).filter(f => f !== '.' && f !== '..' && !f.endsWith('.docx') && !f.endsWith('.txt'));
    imageFiles[i] = files;
  }
}

// Получаем список всех .mdx файлов
const mdxFiles = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'));

for (const file of mdxFiles) {
  const filePath = path.join(chaptersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Получаем номер главы из имени файла
  const chapterNumber = parseInt(file.match(/chapter(\d+)\.mdx$/)[1]);

  // Добавляем импорт компонента в начало файла перед заголовком
  if (!content.includes('import ChapterImage from')) {
    content = content.replace(
      /^---\n([\s\S]*?)---\n/,
      (match) => `${match}\nimport ChapterImage from '../../../components/ChapterImage.astro'\n\n`
    );
  }

  // Если есть изображения для этой главы, вставляем их в содержимое
  if (imageFiles[chapterNumber] && imageFiles[chapterNumber].length > 0) {
    const images = imageFiles[chapterNumber];
    // Просто добавим изображения в конец контента, пока не будем пытаться распределять их равномерно
    for (let i = 0; i < images.length; i++) {
      const imgFile = images[i];
      // Добавляем изображение в конец файла перед последней строкой
      content = content.replace(/\n*$/, `\n\n<ChapterImage src="/chapter-images/${chapterNumber}/${imgFile}" alt="Иллюстрация к главе ${chapterNumber}, изображение ${i + 1}" />\n`);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Обновлена глава: ${file}`);
}

console.log('Все главы обновлены с компонентом изображений');