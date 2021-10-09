const initialState = {
   products: [],
   address: [],
   discount: 0,
   delivery: 0
};

export default (state = initialState, action) => {
    // eslint-disable-next-line
    let products = [...state.products];//Copia do product inicial, isso para quando formos fazer o push
    switch(action.type) {
        case 'ADD_PRODUCT':
                let id = action.payload.data.id;//id do produto que foi mandado, o payload e a forma como vc pega os elementos que estao vindo de la do ModalProduct

                let index = products.findIndex(item=> item.id === id);//Vai verificar se no array de produtos tem um produto com esse id

                if (index > -1) {
                    products[index].qt += action.payload.qt;//somando as qts, se o produto ja existe vai ter qt pq estaremos passando no push
                } else {
                    products.push({
                        ...action.payload.data,
                        qt: action.payload.qt
                    });
                }
            return {...state, products};//Retornamos product pq se for so data, ele nao vai retornar o qt, para retornar todos colocamos o product mesmo.
            // eslint-disable-next-line
        break;
        case 'CHANGE_PRODUCT':
             if (products[action.payload.key]) {
                switch(action.payload.type) {
                    case '-':
                            products[action.payload.key].qt--;
                            if (products[action.payload.key].qt <= 0) {
                                products = products.filter((item, index)=> index !== action.payload.key);//Vai filtrar os produtos e retornar todos, exceto o que foi removido.
                            }
                    break;

                    case '+':
                            products[action.payload.key].qt++;
                    break;
                }
            }
             return {...state, products};//Retorna a state mais a propriedade que vc alterou.
        break;
    }

    return state;
}