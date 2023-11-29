import { Header, Buttons, Post, Footer } from "@/modules"

import style from '../styles/blogHome.module.css'

// probni podatci prije izrade backenda

const data = [{
    id: 0,
    title: "Trip to New York",
    date: "22.12.2024.",
    location: "New York, USA",
    content: "New York City, the city that never sleeps, truly lives up to its reputation as an unparalleled metropolis that dazzles and captivates at every turn. My recent three-day escapade in the Big Apple was an adventure of a lifetime, filled with unexpected twists and unforgettable moments. From the moment I set foot in Times Square, I was immediately immersed in the vibrant energy that defines this iconic city. The towering skyscrapers adorned with mesmerizing billboards created a kaleidoscope of lights, and the hustle and bustle of the crowd added an electrifying atmosphere. It was a sensory overload, and I loved every moment of it. Each day brought new discoveries, and despite my initial plan to stick to the typical tourist spots, I found myself on unexpected detours that turned out to be the highlights of my trip. Staten Island, a detour suggested by a friendly local, revealed charming streets and a taste of authentic New York life that I would have missed otherwise. The Statue of Liberty, though seen from a distance, became a symbol of the unexpected twists that made my journey unique. The ferry ride to Staten Island provided not only breathtaking views of the skyline but also a chance to connect with the warmth of the local community. Central Park, a sprawling oasis in the heart of the city, was the backdrop for my final day—a day filled with a magical mistake. A horse-drawn carriage ride led me to a hidden garden, a secret haven of beauty that felt like a fairy tale come to life. It was a reminder that sometimes, the best experiences come from embracing the unknown. The diversity of New York City is reflected not only in its people but also in its cuisine. From savoring a classic New York hot dog in Times Square to indulging in local treats in Staten Island, my taste buds went on a journey of their own.",
    user: "user2323",
    likes: 1400,
    comments: 220
}, {
    id: 1,
    title: "Trip to New York",
    date: "22.12.2024.",
    location: "New York, USA",
    content: "New York City, the city that never sleeps, truly lives up to its reputation as an unparalleled metropolis that dazzles and captivates at every turn. My recent three-day escapade in the Big Apple was an adventure of a lifetime, filled with unexpected twists and unforgettable moments. From the moment I set foot in Times Square, I was immediately immersed in the vibrant energy that defines this iconic city. The towering skyscrapers adorned with mesmerizing billboards created a kaleidoscope of lights, and the hustle and bustle of the crowd added an electrifying atmosphere. It was a sensory overload, and I loved every moment of it. Each day brought new discoveries, and despite my initial plan to stick to the typical tourist spots, I found myself on unexpected detours that turned out to be the highlights of my trip. Staten Island, a detour suggested by a friendly local, revealed charming streets and a taste of authentic New York life that I would have missed otherwise. The Statue of Liberty, though seen from a distance, became a symbol of the unexpected twists that made my journey unique. The ferry ride to Staten Island provided not only breathtaking views of the skyline but also a chance to connect with the warmth of the local community. Central Park, a sprawling oasis in the heart of the city, was the backdrop for my final day—a day filled with a magical mistake. A horse-drawn carriage ride led me to a hidden garden, a secret haven of beauty that felt like a fairy tale come to life. It was a reminder that sometimes, the best experiences come from embracing the unknown. The diversity of New York City is reflected not only in its people but also in its cuisine. From savoring a classic New York hot dog in Times Square to indulging in local treats in Staten Island, my taste buds went on a journey of their own.",
    user: "user2323",
    likes: 1560,
    comments: 450
}]

export const BlogHome = () => {
    return (
        <div className={style.layout}>
            <Header />
            <Buttons />
            {data.map((x) => (
                <Post data={x} key={x.id} />
            ))}
            <Footer />
        </div>
    )
}
