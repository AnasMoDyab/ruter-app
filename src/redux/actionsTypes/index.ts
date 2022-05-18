import { Departure } from "../reducers";


export enum ActionType {
    POST_DEPARTURES_PENDING = 'POST_DEPARTURES_PENDING',
    POST_DEPARTURES_SUCCESS = 'POST_DEPARUTRES_SUCCESS',
    POST_DEPARTURES_FAIL = 'POST_DEPARTURES_FAIL'
}

interface actionPending {
    type: ActionType.POST_DEPARTURES_PENDING
}

interface actionSuccess {
    type: ActionType.POST_DEPARTURES_SUCCESS;
    payload: Departure;
}

interface actionFail {
    type: ActionType.POST_DEPARTURES_FAIL;
    payload: string;
}

export type Action = actionPending | actionSuccess | actionFail;