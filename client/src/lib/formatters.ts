


export const dateFormatter = (date: string) => {
    const recivedDate = new Date(date);

    const year = recivedDate.getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[recivedDate.getMonth()];
    return `${month} ${recivedDate.getDate()} ${year} `;
}