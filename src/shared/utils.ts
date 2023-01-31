export const Capitalize = (input:string) => {
    return input[0].toUpperCase() + input.slice(1);
}

export const getSeconds = () => {
    return Math.floor(Date.now()/1000)
}

export const shortAddress = (address:string) => {
    return address.slice(0, 6)+"..."+address.slice(-6);

}

export const randomId = () => {
    return (Math.random() + 1).toString(36).substring(7)
}