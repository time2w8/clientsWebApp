import { APIMiddleware } from "../utils/APIMiddleware";
import { apiUrls } from "../common/constants";

const { CLIENTS_URL } = apiUrls;

export function saveClient(body) {
    const url = `${CLIENTS_URL}/save`;
    return APIMiddleware.post(url, { data: body });
}

export function getClients() {
    const url = `${CLIENTS_URL}/`;
    return APIMiddleware.get(url);
}

export function getAverage() {
    const url = `${CLIENTS_URL}/average`;
    return APIMiddleware.get(url);
}

