import {log} from "../lib/log";

export const load = async ({ locals: { getSession } }) => {
    log('+layout.server.ts load')

    return {
        session: await getSession(),
    }
}