import * as actionTypes from "./actionTypes"


export function simulateAssignUser(issue: IIssue, user: null | IUser) {
    const request_action: KevbanAction = {
        type: actionTypes.ASSIGN_USER_REQUESTED,
        issue: issue,
        user: user,
    }

    const response_ok_action: KevbanAction = {
        type: actionTypes.ASSIGN_USER_OK,
        issue: issue,
        user: user,
    }

    return simulateHttpRequest(request_action, response_ok_action)
}


export function simulateHttpRequest(
    request_action: KevbanAction,
    response_ok_action: KevbanAction,
) {
    console.log("a")
    return (dispatch: DispatchType) => {
        console.log("b")
        dispatch(request_action)
        
        // Simulate HTTP request delay
        console.log("c")
        setTimeout(
            () => {dispatch(response_ok_action)},
            1000
        )
        console.log("d")
    }
}
