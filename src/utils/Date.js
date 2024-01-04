
export const getformatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString('fr-FR');
    return newDate;
}