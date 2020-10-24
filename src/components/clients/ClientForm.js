import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "./ClientProvider";
import { useHistory, useParams } from "react-router-dom";

export const ClientForm = () => {
  const { addClient, getClientById, editClient } = useContext(ClientContext);

  //for edit, hold on to state of client in this view
  const [client, setClient] = useState({});
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);
  const activeUser = parseInt(localStorage.getItem("activeUser"));

  const { clientId } = useParams();
  const history = useHistory();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy to make changes, and then set state.
    const newClient = { ...client };
    //client is an object with properties.
    //set the property to the new value
    newClient[event.target.name] = event.target.value;
    //update state
    setClient(newClient);
  };

  // If clientId is in the URL, getClientById
  useEffect(() => {
    if (clientId) {
      getClientById(clientId).then((client) => {
        setClient(client);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const constructClientObject = () => {
    setIsLoading(true);
    if (clientId) {
      //PUT - update
      editClient({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: +client.phone,
        userId: activeUser,
      })
        .then(() => history.push(`/clients/detail/${client.id}`))
        .then(() => setClient({}));
    } else {
      //POST - add
      addClient({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: +client.phone,
        userId: activeUser,
      }).then(() => history.push("/clients"));
    }
  };

  return (
    <div className="cursive formContainer">
      <form className="clientForm">
        <h2 className="clientForm__title">
          {clientId ? "edit client" : "add client"}
        </h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="firstName">first name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              autoFocus
              className="form-control"
              placeholder="first name"
              onChange={handleControlledInputChange}
              defaultValue={client.firstName}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="lastName">last name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="form-control"
              placeholder="last name"
              onChange={handleControlledInputChange}
              defaultValue={client.lastName}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="clientEmail">email: </label>
            <input
              type="email"
              id="clientEmail"
              name="email"
              required
              className="form-control"
              placeholder="email"
              onChange={handleControlledInputChange}
              defaultValue={client.email}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="clientPhone">phone: </label>
            <input
              type="text"
              id="clientPhone"
              name="phone"
              required
              className="form-control"
              placeholder="phone"
              onChange={handleControlledInputChange}
              defaultValue={client.phone}
            />
          </div>
        </fieldset>

        <button
          className="cursive btn btn-primary"
          disabled={isLoading} // Prevent browser from submitting the form
          onClick={(event) => {
            event.preventDefault();
            constructClientObject();
          }}
        >
          {clientId ? "save client" : "add client"}
        </button>
      </form>
    </div>
  );
};
