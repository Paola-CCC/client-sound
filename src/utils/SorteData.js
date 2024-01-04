


/** Permet de supprimer un object qui serait un doublon grace à son ID  */
export const  filterDuplicateName = (arrayObject) => {
    const valueCounts = {};    
    const filteredArray = [];
    arrayObject.forEach(obj => {
        const { value } = obj;
        if (!valueCounts[value]) {
        valueCounts[value] = 1;
        filteredArray.push(obj);
        } else {
        valueCounts[value]++;
        }
    });
    return filteredArray;
}


export const strLcFirst = (value) => {
    return (value + "").charAt(0).toUpperCase() + value.substr(1);
  };

/** Permet d'aplatir un tableau d'object   */
export const getFlattenArray = (arrayElement) => {
    const flattenArray = arrayElement.reduce((acc, sousTableau) => {
        return acc.concat(sousTableau);
    }, []);
    return flattenArray;
};