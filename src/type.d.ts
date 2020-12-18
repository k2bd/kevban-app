// ----- DATA MODELS -----

interface IIssue {
    title: string,
    body: string,
    assigneeName: null | string,
    laneName: string,
    userLoading: boolean,
    issueLoading: boolean,
}


interface IUser {
    name: string,
}


interface ILane {
    name: string,
}


// ----- STATE -----

type KevbanState = {
    issues: IIssue[],
    users: IUser[],
    lanes: ILane[],
}


type KevbanAction = {
    type: string,
    issue?: IIssue,
    user?: IUser | null,
    lane?: ILane,
}

type DispatchType = (args: KevbanAction) => KevbanAction
