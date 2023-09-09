export const NEW_LOCATION = "NEW_LOCATION"

export const saveLocation = location => dispatch => {
    dispatch({
        type: NEW_LOCATION,
        payload: location
    })
}

