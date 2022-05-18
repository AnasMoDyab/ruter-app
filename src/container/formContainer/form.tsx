import { connect } from "http2";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import DepartureCard from "../../components/card";
import InputText from "../../components/input/inputText";
import RegularButton from "../../components/regularButton/regularButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchDeparturesRequest } from "../../redux/actions";

import { EstimatedCalls } from "../../redux/reducers";
import { RootState } from "../../redux/reducers/compbine";
import style from "./style.module.css";

const Form = () => {
  const [departure, setDeparture] = useState<string>("");

  const [name, setName] = useState<string>();
  const dispatch = useDispatch();
  const { departures, loading, error } = useTypedSelector(
    (state: RootState
    ) => state.departures
  );
  const handleChangeDeparture = (e: React.FormEvent<HTMLInputElement>) => {
    setDeparture(e.currentTarget.value);
  };



  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    for (var i = 0; i < 3; i++) {
      console.log("clicked")
       dispatch(fetchDeparturesRequest());
    }
   
  };

  useEffect(() => {
   // dispatch(fetchDeparturesRequest());
   
  }, []);

  return (
    <div>
      <div className={style.formWrapper}>
        <h2>Finn reise</h2>
        {name && <h3>Resie fra {name}</h3>}
        <form className={style.form}>
          <InputText
            id="departue"
            label="Avgang"
            name="departure"
            type="number"
            onChange={handleChangeDeparture}
            value={departure}
            placeholder="Avgang nr."
            class={style.input}
          />

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
              departures?.data?.stopPlace?.estimatedCalls?.map((item, index) => (
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
              ))}
          </div>
        )}
        {error && <div className={style.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default Form;
