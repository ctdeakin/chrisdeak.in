import Link from 'next/link'

export default function Plot() {
    return (
        <div className="square">
            <Link href={props.href}> 
            <a>{props.pageTitle}</a>
            </Link>
        </div>
    )
}