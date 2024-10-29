import "../Header/Header.css"
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <section>
            <header className="header-container align-text-vertically-center">
                <Link style={{ textDecoration: 'none', color: 'white' }} to={"/"}>
                    <h1>📦PRODUCT LISTING PAGE</h1>
                </Link>
                <hr/>
            </header>
        </section>
    )
}