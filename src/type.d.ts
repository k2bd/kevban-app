// ----- DATA MODELS -----

interface IIssue {
    title: string,
    body: string,
    assignee_name: null | string,
    userLoading: boolean,
}


interface IUser {
    name: string,
}


// ----- STATE -----

type KevbanState = {
    issues: IIssue[],
    users: IUser[],
}


type KevbanAction = {
    type: string,
    issue: null | IIssue,
    user: null | IUser,
}

type DispatchType = (args: KevbanAction) => KevbanAction
