import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DepartureCard from "../../components/card";
import InputText from "../../components/input/inputText";
import RegularButton from "../../components/regularButton/regularButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getDepartures } from "../../redux/actionCreators";

import { EstimatedCalls } from "../../redux/reducers";
import style from "./style.module.css";

const Form = () => {
  const [departure, setDeparture] = useState<string>("");

  const [estimatedCalls, setEstimatedCalls] = useState<EstimatedCalls[]>();

  const [name, setName] = useState<string>();
  const dispatch = useDispatch();
  const { departures, loading, error } = useTypedSelector(
    (state) => state.departures
  );
  const handleChangeDeparture = (e: React.FormEvent<HTMLInputElement>) => {
    setDeparture(e.currentTarget.value);
  };


  

  const handleSubmit =async  (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(getDepartures(departure) as any);
  
 
  };

  useEffect(() => {
    setEstimatedCalls(departures?.data.stopPlace.estimatedCalls);
    setName(departures?.data.stopPlace.name);
  }, [departure, departures])

 

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

        {loading && <div>...laste opp data</div>}
        {error && <div className={style.errorMessage}>{error}</div>}
      </div>
      <div className={style.cardWrapper}>
        {estimatedCalls?.length &&
          estimatedCalls?.map((item, index) => (
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
    </div>
  );
};

export default Form;
