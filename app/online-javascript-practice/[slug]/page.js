
import { getQuestionsData } from '@/lib/getQuestions';
import QuestionDetailComponent from '@/components/QuestionDetailComponent';

export async function generateStaticParams() {
    const { exercises } = await getQuestionsData();
    const slugs = new Set();

    exercises.forEach((exercise) => {
        slugs.add(exercise.id.toString());
        if (exercise.slug) {
            slugs.add(exercise.slug);
        }
    });

    return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { exercises } = await getQuestionsData();
    const { slug } = await params;
    const item = exercises.find(e => (e.slug === slug) || (e.id.toString() === slug));

    if (!item) {
        return {
            title: 'Exercise Not Found',
        };
    }

    return {
        title: `${item.title} | JSCodingQuestions.com`,
        description: `Solve this JavaScript coding exercise: ${item.title}. Practice interactive coding challenges on JSCodingQuestions.com.`,
        openGraph: {
            title: `${item.title} | JSCodingQuestions.com`,
            description: `Solve this JavaScript coding exercise: ${item.title}. Practice interactive coding challenges on JSCodingQuestions.com.`,
            type: 'article',
            url: `https://jscodingquestions.com/online-javascript-practice/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${item.title} | JSCodingQuestions.com`,
            description: `Solve this JavaScript coding exercise: ${item.title}. Practice interactive coding challenges on JSCodingQuestions.com.`,
        },
    };
}

export default async function ExerciseDetailPage({ params }) {
    const { exercises } = await getQuestionsData();
    const { slug } = await params;
    const currentIndex = exercises.findIndex(e => (e.slug === slug) || (e.id.toString() === slug));
    const item = exercises[currentIndex];

    if (!item) {
        return (
            <div className="glass rounded-3xl p-12 text-center shadow-2xl max-w-md mx-auto mt-12">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-gray-700 text-lg font-semibold">Exercise not found</p>
            </div>
        );
    }

    const prevItem = currentIndex > 0 ? exercises[currentIndex - 1] : null;
    const nextItem = currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

    const prevLink = prevItem ? `/online-javascript-practice/${prevItem.slug || prevItem.id}` : null;
    const nextLink = nextItem ? `/online-javascript-practice/${nextItem.slug || nextItem.id}` : null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        'name': item.title,
        'description': item.question || 'JavaScript Coding Exercise',
        'hasPart': {
            '@type': 'Question',
            'name': item.title,
            'text': item.question,
            'suggestedAnswer': {
                '@type': 'Answer',
                'text': item.answer || 'Check interactive output'
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
                position={{ current: currentIndex + 1, total: exercises.length }}
                backLink="/online-javascript-practice"
            />
        </>
    );
}
