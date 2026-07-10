import { getQuestionsData } from '@/lib/getQuestions';
import QuestionDetailComponent from '@/components/QuestionDetailComponent';

export async function generateStaticParams() {
    const { questions } = await getQuestionsData();
    const slugs = new Set();

    questions.forEach((question) => {
        slugs.add(question.id.toString());
        if (question.slug) {
            slugs.add(question.slug);
        }
    });

    return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { questions } = await getQuestionsData();
    const { slug } = await params;
    const item = questions.find(q => (q.slug === slug) || (q.id.toString() === slug));

    if (!item) {
        return {
            title: 'Question Not Found',
        };
    }

    return {
        title: `${item.title} | JSCodingQuestions.com`,
        description: `Read the answer to: ${item.title}. Prepare for your JavaScript coding interview with JSCodingQuestions.com.`,
        openGraph: {
            title: `${item.title} | JSCodingQuestions.com`,
            description: `Read the answer to: ${item.title}. Prepare for your JavaScript coding interview with JSCodingQuestions.com.`,
            type: 'article',
            url: `https://jscodingquestions.com/javascript-interview-questions/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${item.title} | JSCodingQuestions.com`,
            description: `Read the answer to: ${item.title}. Prepare for your JavaScript coding interview with JSCodingQuestions.com.`,
        },
    };
}

export default async function QuestionDetailPage({ params }) {
    const { questions, exercises } = await getQuestionsData();
    const { slug } = await params;
    const currentIndex = questions.findIndex(q => (q.slug === slug) || (q.id.toString() === slug));
    const item = questions[currentIndex];

    if (!item) {
        return (
            <div className="glass rounded-3xl p-12 text-center shadow-2xl max-w-md mx-auto mt-12">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-gray-700 text-lg font-semibold">Question not found</p>
            </div>
        );
    }

    const prevItem = currentIndex > 0 ? questions[currentIndex - 1] : null;
    const nextItem = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

    const prevLink = prevItem ? `/javascript-interview-questions/${prevItem.slug || prevItem.id}` : null;
    const nextLink = nextItem ? `/javascript-interview-questions/${nextItem.slug || nextItem.id}` : null;

    const relatedExerciseIndex = item.id % exercises.length;
    const relatedExercise = exercises[relatedExerciseIndex];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'QAPage',
        'mainEntity': {
            '@type': 'Question',
            'name': item.title,
            'text': item.content ? item.content.substring(0, 150) : item.title,
            'answerCount': 1,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer || (item.content ? item.content.substring(0, 300) : 'See full answer'),
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <QuestionDetailComponent
                question={item}
                prevLink={prevLink}
                nextLink={nextLink}
                position={{ current: currentIndex + 1, total: questions.length }}
                backLink="/javascript-interview-questions"
                relatedExercise={relatedExercise}
            />
        </>
    );
}
