import React from 'react'
import TrollFace from '../Assets/Trollface.png'

export default function Headers() {
    return (
        <header>
            <img src={TrollFace} alt="Troll face" />
            <p>Meme Generator</p>
        </header>
    )
}
