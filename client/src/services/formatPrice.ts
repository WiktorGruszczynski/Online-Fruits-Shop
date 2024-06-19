const formatPrice = (price: number) => {
    const strPrice = price.toString();

    if (strPrice.includes(".")){
        var parts = strPrice.split(".");
        
        if (parts[1].length === 1){
            return strPrice+"0"
        }
        else{
            return strPrice
        }

    }
    else{
        return strPrice + ".00"
    }

}

export default formatPrice;