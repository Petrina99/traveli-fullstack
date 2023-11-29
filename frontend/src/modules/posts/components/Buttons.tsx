import style from '../styles/buttons.module.css'

import recentlyIcon from '@/assets/icon _Recently viewed_.svg'
import trendingIcon from '@/assets/icon _fire_.svg'
import topIcon from '@/assets/icon _leaderboard_.svg'

export const Buttons = () => {
    return (
        <div className={style.nav}>
            <div className={style.buttonGroup}>
                <button className={style.button}>
                    <p>New</p>
                    <img src={recentlyIcon} alt="recently posted icon" />
                </button>
                <button className={style.button}>
                    <p>Trending</p>
                    <img src={trendingIcon} alt="trending icon" />
                </button>
                <button className={style.button}>
                    <p>Top</p>
                    <img src={topIcon} alt="leaderboard icon" />
                </button>
            </div>
        </div>
    )
}
