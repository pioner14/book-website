#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Директория с главами
const chaptersDir = '/home/nick/Projects/book-website/src/content/book/ru';

// Получаем список всех .md файлов
const mdFiles = fs.readdirSync(chaptersDir).filter(file => file.endsWith('.md'));

for (const file of mdFiles) {
  const mdPath = path.join(chaptersDir, file);
  const mdxPath = path.join(chaptersDir, file.replace('.md', '.mdx'));
  
  // Читаем содержимое .md файла
  const content = fs.readFileSync(mdPath, 'utf8');
  
  // Создаем базовую версию для .mdx без изображений - временно
  fs.writeFileSync(mdxPath, content);
  
  console.log(`Создан файл: ${mdxPath}`);
}

console.log('Все MD-файлы преобразованы в MDX');