export const GO = 'GO';
export const NO = 'NO';
export const MAYBE = 'MAYBE';

export function go(user) {
    return { type: GO, user };
}

export function no(user) {
    //обращение к апи c user.access_token
    console.log('я обращаюсь к апи НЕ ПОЙДУ');
    return { type: NO, user };
}