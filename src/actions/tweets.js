import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOOGLE_TWEET = 'TOOGLE_TWEET'

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