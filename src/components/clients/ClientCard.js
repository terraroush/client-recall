import React from "react";
import { useHistory} from "react-router-dom";
import "./ClientCard.css";

export const ClientCard = ({client}) => {
  const history = useHistory();

  return (
    <section className="clientCard">

      <button
        className="clientCardButtons"
        style={{ color: "inherit", textDecoration: "inherit" }}
        value={client.id}
        onClick={() => history.push(`/client-history/${client.id}`)
         }
        
      >
      <div className="cardContents">
        <h3 className="client__name">
          {client.firstName + " " + client.lastName}
        </h3>
        <div className="client__email">{client.email}</div>
        <div className="client__phone">{client.phone}</div>
      </div>
      </button>
      
    </section>
  );
};
