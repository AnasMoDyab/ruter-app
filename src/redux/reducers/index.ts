import { Action, ActionType } from "../actionsTypes"


export interface ServiceJourney {
    journeyPattern: {
        line: {
            id: string;
            name: string;
            transportMode: string;
        };
    };
}
export interface EstimatedCalls {
    aimedArrivalTime: string,
    aimedDepartureTime: string,
    expecdtedArrivalTime: string,
    expectedDepartureTime: string,
    date: string,
    desitnationDisplay: {
        fronText: string,
    }
    serviceJourney: ServiceJourney
}
export interface Departure {
    data: {
        stopPlace: {
            id: number,
            name: string,
            estimatedCalls: EstimatedCalls[];
        }
    }


}

interface State {
    departures?: Departure,
    loading?: boolean,
    error?: string | null,
}

const initialState = {
    departures: undefined,
    loading: false,
    error: null
}



export const commentReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.POST_DEPARTURES_PENDING:
            return {
                loading: true
            }
        case ActionType.POST_DEPARTURES_SUCCESS:
            return {
                loading: false,
                departures: action.payload
            }
        case ActionType.POST_DEPARTURES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}