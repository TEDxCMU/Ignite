import * as prismic from '@prismicio/client';

const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const endpoint = prismic.getRepositoryEndpoint('tedxcmu-ignite');
const client = prismic.createClient(endpoint, { accessToken });

export async function getSpeakers() {
    return client.getAllByType('speaker');
}

export async function getInnovators() {
    return client.getAllByType('innovator');
}

export async function getSchedule() {
    const events = await client.getAllByType('event');
    const speakers = await getSpeakers();

    for (const event of events) {
        if (event.data && event.data.speaker && event.data.speaker.id) {
            const id = event.data.speaker.id;
            const speaker = speakers.find((s) => s.id === id);
            event.data.speaker = speaker;
        }
    }

    return events;
}

export async function getGames() {
    return client.getAllByType('game');
}

export async function getGameByName(name) {
    const games = await getGames();
    return games.find(game => game.data.name === name);
}

export function getScores() {
    return fetch('/api/getScores')
        .then(res => {
            if (!res.ok) {
                console.log("Res error: ", res)
            }
            return res.json()
        })
        .catch(err => {
            console.error("Fetch error: ", err)
        });
}

export async function addScore(name, andrewid, score, gameName) {
    console.log(name, andrewid, score);
    await fetch('/api/addScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, andrewid, score, gameName })
    });
}