const round = (n:number, precision:number=0) => {
    const tmp = (10**precision);

    return Math.round( n*tmp )/tmp;
}

export default round;