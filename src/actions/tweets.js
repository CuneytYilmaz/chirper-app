import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOOGLE_TWEET = 'TOOGLE_TWEET'
export const SAVE_TWEET = 'SAVE_TWEET'

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function toggleTweet ({id, authedUser, hasLiked}) {
    return {
        type: TOOGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToogleTweet (info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch((e) => {
                const { id, authedUser, hasLiked } = info
                console.warn('Error in handleToogleTweet: ', e)
                dispatch(toggleTweet({
                    id,
                    authedUser,
                    hasLiked: !hasLiked
                }))
                alert('There was an error liking the tweet. Try again.')
            })
    }
} 

export function addTweet (tweet) {
    return {
        type: SAVE_TWEET,
        tweet
    }
}

export function handleAddTweet (text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
    }
}