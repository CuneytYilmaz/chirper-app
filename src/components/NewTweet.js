import React, { Component } from 'react'

class NewTweet extends Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        const text = e.target.value

        this.setState({
            text
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state

        // todo: Compose new tweet

        console.log('New Tweet:', text)

        this.setState({
            text: ''
        })
    }

    render () {
        const { text } = this.state

        // todo: Redirect to / if submitted

        const tweetLeft = 280 - text.length

        return(
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit} >
                    <textarea 
                        placeholder="What's happening?"
                        className='textarea'
                        maxLength={280}
                        onChange={this.handleChange}
                        value={text}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        disabled={text === ''}
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default NewTweet