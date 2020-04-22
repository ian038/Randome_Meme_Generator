import React, { useState, useEffect } from 'react'
import Placeholder from '../Assets/1doesnotsimply.jpg'

export default function MemeGenerator() {

    const [ topText, setTopText ] = useState('')
    const [ bottomText, setBottomText ] = useState('')
    const [ randMeme, setRandMeme ] = useState(Placeholder)
    const [ allMemes, setAllMemes ] = useState([])

    // Fetch api call
    useEffect(() => {
        const fetchMemes = async () => {
            await fetch("https://api.imgflip.com/get_memes")
                  .then(res => res.json())
                  .then(res => {
                      setAllMemes(res.data.memes)
                  }) 
        };
        fetchMemes();
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        // Get random meme from array
        const randNum = Math.floor(Math.random() * allMemes.length)
        // Get random meme url
        const randMeme = allMemes[randNum].url
        // Set as curren random meme value
        setRandMeme(randMeme)
    };

    return (
        <div>
            <form className='meme-form' onSubmit={handleSubmit}>
                <input type="text" name="topText" value={topText} placeholder="Enter top text here" onChange={e => setTopText(e.target.value)} />
                <input type="text" name="topText" value={bottomText} placeholder="Enter bottom text here" onChange={e => setBottomText(e.target.value)} />
                <button>Gen</button>
            </form>
            <div className='meme'>
                <img src={randMeme} alt='' />
                <h2 className='top'>{topText}</h2>
                <h2 className='bottom'>{bottomText}</h2>
            </div>
        </div>
    )
}
