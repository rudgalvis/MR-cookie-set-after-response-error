export const load = async ({ locals: { getSession } }) => {
    console.log('layout load serv')

    return {
        session: await getSession(),
    }
}