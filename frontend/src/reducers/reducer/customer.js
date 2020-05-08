import {
    FETCH_CARD,
    FETCH_ADDRESS,
    ADD_CARD,
    ADD_ADDRESS,
    ADDRESS_DETAIL,
    ADD_REVIEW,
    DEFAULT_ADDRESS,
    DEFAULT_CARD
} from '../../actions/types';

const initialState = {
    cardList: [],
    addressList: [],
    addressDetail: {},
    reviews: [],
    defaultCard: {},
    defaultAddress: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {

        case FETCH_CARD:
            return {
                ...state,
                cardList: payload
            };

        case FETCH_ADDRESS:
            return {
                ...state,
                addressList: payload
            };

        case ADD_CARD:
            return {
                ...state,
                cardList: [...state.cardList, payload]
            }

        case ADD_ADDRESS:
            return {
                ...state,
                addressList: [...state.addressList, payload]
            }

        case ADDRESS_DETAIL:
            return {
                ...state,
                addressDetail: payload
            }

        case ADD_REVIEW:
            return {
                ...state,
                reviews: payload
            }

        case DEFAULT_ADDRESS:
            return {
                ...state,
                defaultAddress: payload
            }

        case DEFAULT_CARD:
            return {
                ...state,
                defaultCard: payload
            }

        default:
            return state;
    }
}
