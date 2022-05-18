import React from "react";
import { ServiceJourney } from "../../redux/reducers";
import style from "./style.module.css";

type DepartureCarProps = {
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  date: string;
  destinationDisplayName: {
    fronText: string;
  };
  expectedArrivalTime: string;
  expectedDepartureTime: string;
  serviceJourney: ServiceJourney;
};

const DepartureCard = (props: DepartureCarProps) => {
  const checkDelayed = (aimedDate: string, expectedDate: string) => {
    try {
      const aimedArrivalDate = new Date(aimedDate);
      const expectedArrivalDate = new Date(expectedDate);
      const result =
        aimedArrivalDate.getMinutes() - expectedArrivalDate.getMinutes();
      if (Math.sign(result)) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };
  const convertDate = (aimedDate: string) => {
    try {
      const aimedArrivalDate = new Date(aimedDate);

      const result =
        aimedArrivalDate.getHours() + ":" + aimedArrivalDate.getMinutes();

      return result;
    } catch (error) {
      return "0";
    }
  };

  return (
    <div className={style.cardContainer}>
      <h3>{props.serviceJourney.journeyPattern.line.name} </h3>
      <h4> {props.serviceJourney.journeyPattern?.line?.id}</h4>
      <div className={style.cardHeader}>
        Avgangstid: {convertDate(props.aimedArrivalTime)}
      </div>
      <div className={style.cardBody}>
        {checkDelayed(props.aimedArrivalTime, props.expectedDepartureTime) &&
          `Buss er forsiket, forventet ankomsttid er ${convertDate(
            props.expectedDepartureTime
          )}`}
      </div>
      <div className={style.cardFooter}>
        <span className="fa fa-bus teal-color busIcon"></span>
        <span>{props.serviceJourney?.journeyPattern?.line?.transportMode}</span>
      </div>
    </div>
  );
};

export default DepartureCard;
