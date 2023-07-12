// Log to console with time format like: 10:00:00.000
export const log = (message: string, showTimestamp = true) => {
    // Fallback to regular console.log
    if(!showTimestamp) return console.log(message)

    const date = new Date()
    const timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`

    console.log(`%c${timestamp}:`, 'color: gray;', message)
}