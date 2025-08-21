
export const initialState = {
   data: []
}

export const reducer = (state,action) => {
   switch (action.type) {
      case 'GET':
         if (JSON.stringify(state.data) === JSON.stringify(action.payload)) {
            return state;
         }
         return {...state, data: action.payload};
      
      case 'ADD':
         const newState = {
            ...state,
            data: [...state.data, action.payload]
         };
         return newState;

      case 'DELETE':
         return {...state, data: state.data.filter(item => item.id !== action.payload)};

      default:
         return state;
   }
}