import fs from 'fs';
import path from 'path';

export async function getQuestionsData() {
    const filePath = path.join(process.cwd(), 'data', 'questions.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);

    // Normalize
    const questions = (jsonData.questions || []).map(q => ({ ...q, type: 'interview' }));
    const exercises = (jsonData.exercises || []).map(e => ({ ...e, type: 'exercise' }));
    const allItems = [...questions, ...exercises].sort((a, b) => a.id - b.id);

    return {
        ...jsonData,
        questions,
        exercises,
        allItems
    };
}
