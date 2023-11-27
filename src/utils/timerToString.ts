export const timerToString = (timer: number)=>{
    return new Date(timer).toISOString().substr(11, 12);
}