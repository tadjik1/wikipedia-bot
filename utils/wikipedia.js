import axios from 'axios';

export default async function wikipedia(query) {
    try {
        const response = await axios.get('https://ru.wikipedia.org/w/api.php', {
            params: {
                action: 'opensearch',
                search: query,
                limit: 5,
                namespace: 0,
                format: 'json'
            }
        });

        const results = [];

        const [, titles, summaries, links] = response.data;

        for (let i = 0; i < titles.length; i++) {
            results.push({
                title: titles[i],
                summary: summaries[i],
                link: links[i],
            });
        }

        return results;
    } catch (error) {
        console.error(error);
        return [];
    }
}