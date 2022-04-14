import { useContext } from "react"
import { FrameContext } from "./context/FrameContext"


export default function Frame({ children}) {
  let {frames} = useContext(FrameContext)

  function createFrame(f){
    console.log(f)
      if(f===0){
          return children
      } return(
        <div style={{zIndex: {f}}} className="card">
        {f}
        {createFrame(f-1)}
      </div>
      )
  }

  return createFrame(frames)

}
