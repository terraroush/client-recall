import React, { useState, createContext } from "react"

export const VisitContext = createContext()

export const VisitProvider = props => {
    const [visits, setVisits] = useState([])

    const getVisits = () => {
        return fetch("http://localhost:8088/visits?_expand=client&_expand=user")
            .then(res => res.json())
            .then(setVisits)
    }

    const getVisitById = id => {
        return fetch(`http://localhost:8088/visits/${id}?`)
            .then(res => res.json())
    }
    const getVisitsByClientId = id => {
        return fetch(`http://localhost:8088/visits?_expand=client&clientId=${id}`)
            .then(res => res.json())
            .then(setVisits)
    }

    const getVisitsByUserId = id => {
        return fetch(`http://localhost:8088/visits?_expand=user&userId=${id}`)
            .then(res => res.json())
            .then(setVisits)
    }

    const addVisit = visitObj => {
        return fetch("http://localhost:8088/visits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitObj)
        })
            .then(getVisits)
    }
    const deleteVisit = visitObj => {
        return fetch(`http://localhost:8088/visits/${visitObj.id}`, {
            method: "DELETE"
        })
           .then(getVisitsByClientId(visitObj.clientId))
    }
    const editVisit = visit => {
        return fetch(`http://localhost:8088/visits/${visit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visit)
        })
            .then(getVisits)
    }

    return (
        <VisitContext.Provider value={{
            visits, getVisits, addVisit, getVisitById, deleteVisit, editVisit, getVisitsByClientId, getVisitsByUserId
        }}>
            {props.children}
        </VisitContext.Provider>
    )
}