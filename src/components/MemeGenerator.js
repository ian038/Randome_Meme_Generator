import React, { useState, useEffect } from 'react'
import Placeholder from '../Assets/1doesnotsimply.jpg'

export default function MemeGenerator() {

    const [ values, setValues ] = useState({
        topText: '',
        bottomText: ''
    })
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

    const handleChange = name => e => {
        const { value } = e.target
        setValues({ ...values, [name]: value })
    }

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
                <input type="text" name="topText" value={values.topText} placeholder="Enter top text here" onChange={handleChange('topText')} />
                <input type="text" name="topText" value={values.bottomText} placeholder="Enter bottom text here" onChange={handleChange('bottomText')} />
                <button>Gen</button>
            </form>
            <div className='meme'>
                <img src={randMeme} alt='' />
                <h2 className='top'>{values.topText}</h2>
                <h2 className='bottom'>{values.bottomText}</h2>
            </div>
        </div>
    )
}
