import style from './header.module.css'

import searchIcon from '../../assets/icon _search engine_.svg'

export const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <h1>Traveli</h1>
            </div>
            <div className={style.searchDiv}>
                <div className={style.inputDiv}>
                    <input type="text" name="search" id="search" placeholder='Search users' className={style.input}/>
                    <button>
                        <img src={searchIcon} alt="search icon" />
                    </button>
                </div>
            </div>
            <div className={style.user}>
                <p>Username999</p>
                <button>
                    Logout
                </button>
            </div>
        </header>
    )
}
