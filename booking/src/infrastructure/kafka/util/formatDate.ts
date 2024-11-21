import { format } from 'date-fns';

export const formattedBookedDate = (bookedDate: Date) => {
    return format(bookedDate, 'EEEE, MMMM d, yyyy \'at\' h:mm a');
}