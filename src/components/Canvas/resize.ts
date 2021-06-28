function findRatio(width: number, height: number) {
    let sizeCase;
    let ratio;
    if(width >= height) {
        sizeCase = 1;
        ratio = width / height;
    } else {
        sizeCase = 2;
        ratio = height / width;
    }
    return { ratio, sizeCase };
}

function resize(width: number, height: number, maxSize: number) {
    const info = findRatio(width, height);
    let resized;

    if(info.sizeCase === 1) {
        resized = [maxSize, maxSize / info.ratio];
    } else {
        resized = [maxSize / info.ratio, maxSize]
    }
    return resized;
}

export default resize;