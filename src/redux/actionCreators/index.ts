import axios from 'axios';
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { fetchDeparturesFailure, fetchDeparturesSuccess } from '../actions';
import { ActionType } from '../actionsTypes';
import { Departure } from '../reducers';


const getDepartures = () => {
    const id = "4000"
    const query = JSON.stringify({
        query: `{stopPlace(id: 
         "NSR:StopPlace:${id ? id : "4000"}") {
            id
            name 
            estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {    
                realtime
                aimedArrivalTime
                aimedDepartureTime
                expectedArrivalTime
                expectedDepartureTime
                actualArrivalTime
                actualDepartureTime
                date 
                forBoarding
                forAlighting
                destinationDisplay {
                    frontText
                     }
                quay {
                    id
                    }
                serviceJourney {
                    journeyPattern {
                        line {
                            id
                            name
                            transportMode
                        }
                        }
                    }
                    }
                  }
                }`,
        variables: {},
    });
   return axios.post<Departure[]>("/journey-planner/v3/graphql", query, {
        headers: {
            "company-application": "fosen_utvikling-departureboard",
            "Content-Type": "application/json"
        }
    }).then(response => response.data);

}

function* fetchDepartuersSaga(id?: string) {
    try {
        const response: Departure= yield call(getDepartures);
        yield put(
            fetchDeparturesSuccess(response)
        );
    } catch (e: any) {
        yield put(
            fetchDeparturesFailure(e.message)
        )
    }
}

function* departuresSaga() {
    yield all([takeLatest(ActionType.POST_DEPARTURES_PENDING, fetchDepartuersSaga)])

}

function* rootDepartuerSaga() {
    yield all([fork(departuresSaga)]);
}
export default rootDepartuerSaga;

/* export const getDepartures = (id: string) => {
    const query = JSON.stringify({
        query: `{stopPlace(id: 
         "NSR:StopPlace:${id}") {
            id
            name 
            estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {    
                realtime
                aimedArrivalTime
                aimedDepartureTime
                expectedArrivalTime
                expectedDepartureTime
                actualArrivalTime
                actualDepartureTime
                date 
                forBoarding
                forAlighting
                destinationDisplay {
                    frontText
                     }
                quay {
                    id
                    }
                serviceJourney {
                    journeyPattern {
                        line {
                            id
                            name
                            transportMode
                        }
                        }
                    }
                    }
                  }
                }`,
        variables: {},
    });

    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.POST_DEPARTURES_PENDING
        });

        try {
            const { data } = await axios.post("/journey-planner/v3/graphql", query, {
                headers: {
                    "company-application": "fosen_utvikling-departureboard",
                    "Content-Type": "application/json"
                }
            });

            dispatch({
                type: ActionType.POST_DEPARTURES_SUCCESS,
                payload: data
            });

        } catch (err: any) {
            dispatch({
                type: ActionType.POST_DEPARTURES_FAIL,
                payload: err?.message
            });
        }
    }
}  */