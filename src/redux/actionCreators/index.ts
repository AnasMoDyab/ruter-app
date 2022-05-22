import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import { fetchDeparturesFailure, fetchDeparturesSuccess } from '../actions';
import { ActionType } from '../actionsTypes';
import { Departure } from '../reducers';


const getDepartures = () => {
  
    const query = JSON.stringify({
        query: `{stopPlace(id: 
         "NSR:StopPlace:4000") {
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
        const response: Departure = yield call(getDepartures);
        yield delay(3000);
        yield put(
            fetchDeparturesSuccess(response)
        );

    } catch (e: any) {
        yield put(
            fetchDeparturesFailure(e.message)
        )
    }
    finally {
        console.log("Request end")
    }
}

function* departuresSaga() {
    yield takeLatest(ActionType.POST_DEPARTURES_PENDING, fetchDepartuersSaga)
}

function* rootDepartuerSaga() {

    yield all([fork(departuresSaga)]);


}
export default rootDepartuerSaga;

