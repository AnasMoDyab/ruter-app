import React from "react";
import { useDispatch } from "react-redux";
import DepartureCard from "../../components/card";
import RegularButton from "../../components/regularButton/regularButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchDeparturesRequest } from "../../redux/actions";

import { RootState } from "../../redux/reducers/compbine";
import style from "./style.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const { departures, loading, error } = useTypedSelector(
    (state: RootState) => state.departures
  );

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(fetchDeparturesRequest());
  };


  return (
    <div>
      <div className={style.formWrapper}>
        <h2>Finn reise</h2>
        {departures?.data?.stopPlace?.name && (
          <h3>Resie fra {departures?.data?.stopPlace?.name}</h3>
        )}
        <form className={style.form}>
          <RegularButton
            onClick={handleSubmit}
            text="Finn"
            className=""
            disapled={loading}
          />
        </form>

        {loading ? (
          <div>...laste opp data</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className={style.cardWrapper}>
            {departures?.data?.stopPlace?.estimatedCalls &&
              departures?.data?.stopPlace?.estimatedCalls?.map(
                (item, index) => (
                  <div key={index}>
                    <DepartureCard
                      aimedArrivalTime={item?.aimedArrivalTime}
                      aimedDepartureTime={item?.aimedDepartureTime}
                      expectedDepartureTime={item?.expectedDepartureTime}
                      expectedArrivalTime={item?.expectedDepartureTime}
                      serviceJourney={item?.serviceJourney}
                      date={item?.date}
                      destinationDisplayName={item?.desitnationDisplay}
                    />
                  </div>
                )
              )}
          </div>
        )}
        {error && <div className={style.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default Form;
