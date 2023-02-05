import Link from "next/dist/client/link"
import style from './A.module.css'

export default function A({ text, href }) {
    return (
        <Link href={href}>
            <span className={style.link}>{text}</span>
        </Link>
    )
}