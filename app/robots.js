
export const dynamic = 'force-static';

export default function robots() {
    const BASE_URL = 'https://jscodingquestions.com'; // Canonical non-www domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL, // Preferred domain (non-www)
    };
}
