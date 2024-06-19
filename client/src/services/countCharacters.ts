const countCharacters = (str:string, char:string) => {
    return str.length - str.replaceAll(char, "").length
}

export default countCharacters;