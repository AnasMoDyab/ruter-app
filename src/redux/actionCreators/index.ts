import axios from 'axios';
import { Dispatch } from 'redux';
import { Action, ActionType } from '../actionsTypes';



export const getDepartures = (id: string) => {
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
} 