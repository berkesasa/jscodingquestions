
import { getQuestionsData } from '@/lib/getQuestions';

const BASE_URL = 'https://jscodingquestions.com';

export const dynamic = 'force-static';

export default async function sitemap() {
    const { questions, exercises } = await getQuestionsData();

    const questionUrls = questions.map((q) => ({
        url: `${BASE_URL}/javascript-interview-questions/${q.slug || q.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const exerciseUrls = exercises.map((e) => ({
        url: `${BASE_URL}/online-javascript-practice/${e.slug || e.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/javascript-interview-questions`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/online-javascript-practice`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...questionUrls,
        ...exerciseUrls,
    ];
}
