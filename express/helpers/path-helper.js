const moduleResult = {};
const imagePath = 'public/img';
moduleResult.directoryImage = Object.freeze({
    FACILITIES: 'facilities',
    PLACE: 'place',
    PROPERTY: 'property',
    ZONE: 'zone',
    BLOG: 'blog',
    USER: 'user',
    PLACE_TYPE: 'place-type',
    
});
moduleResult.shortPathImg = (filename, directoryType) => {
    let result = '';
    let filenameEncode = encodeURIComponent(filename);
    result = `${imagePath}/${directoryType}/${filenameEncode}`
    return result;
};
moduleResult.fullPathImg = (reqUrl , filename, directoryType) => {
    let result = '';
    let filenameEncode = encodeURIComponent(filename);
    result = `${reqUrl}/${imagePath}/${directoryType}/${filenameEncode}`
    return result;
};
export default moduleResult;