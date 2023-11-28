import style from '../styles/buttons.module.css'

export const Buttons = () => {
    return (
        <nav className={style.nav}>
            <div className={style.buttonGroup}>
                <button>
                    <p>New</p>
                    <img src="" alt="" />
                </button>
                <button>
                    <p>Trending</p>
                    <img src="" alt="" />
                </button>
                <button>
                    <p>Top</p>
                    <img src="" alt="" />
                </button>
            </div>
        </nav>
    )
}
