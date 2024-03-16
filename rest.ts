import creds from './creds.json';

const limits = '/services/data/v60.0/limits';
const url = creds.result.instanceUrl + limits;

type Result = {
    id: string,
    success: boolean,
    errors: string[]
}

export async function getLimits(): Promise<Result> {
    let response = await fetch(url, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${creds.result.accessToken}`
            }
    });
    return response.json();
}