export type State = {
    connecte: boolean;
    prenom?: string;
    nom?: string;
    email?: string;
    grade?: string;
};

export type Action =
    | { type: "REMOVE" }
    | {
          type: "UPDATE";
          user: {
              prenom: string;
              nom: string;
              email: string;
              grade: string;
              connecte: boolean;
          };
      };

export const userReducer = (state: State, action: Action) => {
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

export const userInit = { connecte: false };
