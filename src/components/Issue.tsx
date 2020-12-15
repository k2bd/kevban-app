import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

import { Button, Card, Classes, Collapse, Icon, Menu, Popover } from "@blueprintjs/core";


type Props = {
    issue: IIssue,
    deleteIssue: (issue: IIssue) => void,
    assignUser: (issue: IIssue, user: IUser | null) => void,
}


export const Issue: React.FC<Props> = ({issue, deleteIssue, assignUser}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [expanded, setExpanded] = React.useState(false)
    const users: readonly IUser[] = useSelector(
        (state: KevbanState) => state.users,
        shallowEqual
    )
    const assignUserDispatch = React.useCallback(
        (issue: IIssue, user: IUser | null) => dispatch(assignUser(issue, user)),
        [dispatch, assignUser]
    )

    const menuItem = (user: null | IUser) => {
        return <Menu.Item
            text={user === null ? <i>Unassign</i> : user.name}
            onClick={() => assignUserDispatch(issue, user)}
        />
    }

    const userMenuItems = [
        menuItem(null)
    ].concat(
        users.map((user: IUser) => (menuItem(user)))
    )

    const assigneeArea = (
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Popover>
                <Button
                    icon={issue.userLoading ? "cloud-upload" : "user"}
                    rightIcon="caret-down"
                    disabled={issue.userLoading}
                >
                    {issue.assigneeName === null ? <i>Unassigned</i> : issue.assigneeName}
                </Button>
                <Menu>
                    {userMenuItems}
                </Menu>
            </Popover>
        </div>
    )

    return <div>
        <Card interactive={false}>
            <Button minimal={true} onClick={() => setExpanded(!expanded)}>
                <h4>{issue.title}</h4>
            </Button>
            <Collapse isOpen={expanded}>
                <p>{issue.body}</p>
            </Collapse>
            {assigneeArea}
        </Card>
    </div>
}
