import Card from "@components/Card"
import Link from "next/link"
import Frame from "@components/Frame"
import { useEffect, useContext} from "react"
import { handleAddFrame } from "@components/reducers/frameReducer"
import { DispatchContext } from "@components/context/FrameContext"

export default function About(){
    const dispatch = useContext(DispatchContext)
    useEffect(() => {
        handleAddFrame(dispatch)
    },[])
    return (
        <Card> 
            <Frame>
            <Link href="/">Back</Link>
            </Frame>
        </Card>
    )
}