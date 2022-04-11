import { useRouter } from 'next/router'
import Header from './Header'
import Plot from './Plot'
export default function Island() {
    const router = useRouter()
    const plots = [1,2,3,4]
    return (
        <div className="territory">
        <Header title="Chris Deakin"/>
        {plots.map(plot => <div key={"plot" + plot} className="plot">{plot}</div>)}
        </div>
    )
}