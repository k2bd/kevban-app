import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
    user: IUser,
}


export const User: React.FC<Props> = ({user}) => {
    return (
        <div>
            <p>{user.name}</p>
        </div>
    )
}
