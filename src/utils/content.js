import * as prismic from '@prismicio/client';

const accessToken = 'MC5aYVdndnhJQUFDRUEzZ1Ja.ce-_vUofeO-_vQw577-9U--_vQBj77-9eyUtPBVm77-977-977-9fHst77-9XXvvv73vv71G';

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
