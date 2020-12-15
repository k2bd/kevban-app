import * as React from "react"
import { Dispatch } from "redux"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import classNames from "classnames"

import { Button, Classes, EditableText, H1, Intent, Navbar, NavbarDivider, NavbarHeading, Overlay } from "@blueprintjs/core";


const blankIssue = (): IIssue => (
    {
        title: "",
        body: "",
        assigneeName: null,
        laneName: "To do",
        userLoading: false,
    }
)


type Props = {
    createIssue: (issue: IIssue) => void,
}


export const ControlBar: React.FC<Props> = ({createIssue}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [overlayActive, setOverlayActive] = React.useState(false)
    const [newTitle, setNewTitle] = React.useState("")
    const [newBody, setNewBody] = React.useState("")
    const createIssueDispatch = React.useCallback(
        (issue: IIssue) => dispatch(createIssue(issue)),
        [dispatch, createIssue]
    )

    const createNewIssue = (title: string, body: string) => {
        const newIssue = {
            ...blankIssue(),
            title: title,
            body: body,
        }
        createIssueDispatch(newIssue)
        setNewTitle("")
        setNewBody("")
    }

    const toggleOverlay = () => setOverlayActive(!overlayActive)

    return <Navbar>
        <NavbarHeading>Kevban</NavbarHeading>
        <NavbarDivider />
        <Button
            icon="plus"
            onClick={toggleOverlay}
        >
            New issue
        </Button>

        <Overlay
            isOpen={overlayActive}
            className={Classes.OVERLAY_SCROLL_CONTAINER}
            onClose={toggleOverlay}
        >
            <div className={classNames(Classes.CARD, Classes.ELEVATION_4)}>
                <H1>
                    <EditableText
                        placeholder="Title..."
                        intent={Intent.PRIMARY}
                        selectAllOnFocus={true}
                        onChange={(value: string) => setNewTitle(value)}
                    />
                </H1>
                <EditableText
                    placeholder="Description..."
                    intent={Intent.PRIMARY}
                    selectAllOnFocus={true}
                    onChange={(value: string) => setNewBody(value)}
                    multiline={true}
                />
                <Button icon="confirm" onClick={() => createNewIssue(newTitle, newBody)}/>
            </div>
        </Overlay>
    </Navbar>
}