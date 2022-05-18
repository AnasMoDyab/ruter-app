import { ActionType } from "../actionsTypes"
import { Departure } from "../reducers"



export const fetchDeparturesRequest = () => ({
    type: ActionType.POST_DEPARTURES_PENDING
})

export const fetchDeparturesSuccess = (
    payload: Departure
) => ({
    type: ActionType.POST_DEPARTURES_SUCCESS,
    payload
})


export const fetchDeparturesFailure = (
    payload: string
) => ({
    type: ActionType.POST_DEPARTURES_FAIL,
        payload
})