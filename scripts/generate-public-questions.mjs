import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, 'data', 'questions.json');
const outputPath = path.join(rootDir, 'public', 'questions.json');

const jsonData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const questions = (jsonData.questions || []).map((question) => ({
  ...question,
  type: 'interview',
}));
const exercises = (jsonData.exercises || []).map((exercise) => ({
  ...exercise,
  type: 'exercise',
}));
const allItems = [...questions, ...exercises].sort((a, b) => a.id - b.id);

const publicData = {
  ...jsonData,
  questions,
  exercises,
  allItems,
};

fs.writeFileSync(outputPath, `${JSON.stringify(publicData)}\n`);
console.log(`Generated ${path.relative(rootDir, outputPath)} with ${allItems.length} items.`);
