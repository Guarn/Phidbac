export const userReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "UPDATE":
            return {
                connecte: true,
                prenom: action.user.prenom,
                nom: action.user.nom,
                email: action.user.email,
                grade: action.user.grade
            };

        case "REMOVE": {
            return { connecte: false };
        }

        default:
            throw new Error();
    }
};
