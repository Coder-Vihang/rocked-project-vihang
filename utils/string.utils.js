function lowerCase(string1){
    return string1.toLowerCase()
}
function compareStrings(string1, string2){
    if(!string1 && !string2) return true;
    return lowerCase(string1).trim() == lowerCase(string2).trim();
}

module.exports={
    compareStrings,
    lowerCase
}