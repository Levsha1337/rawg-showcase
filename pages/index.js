import React from 'react';
import Link from 'next/link';

// styled-components
import Games from '../comp/Games';
import GameCard from '../comp/GameCard/GameCard';

// methods for rawg.io
import api from '../api';
import GameHeaderImage from '../comp/GameCard/GameHeaderImage';
import GameDescription from '../comp/GameCard/GameDescription';
import GameHeaderLink from '../comp/GameCard/GameHeaderLink';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            next: null,
            isLoading: false
        };

        this.onScroll = this.onScroll.bind(this);
    }
    // static async getInitialProps({}) {

    //     // return {
    //     //     games: data.results
    //     // };
    // }

    async componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        await this.setAsyncState({
            isLoading: true
        });
        const data = await api.get('/games');
        this.setState({
            games: data.results,
            next: data.next,
            isLoading: false
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    setAsyncState(newState) {
        return new Promise((resolve) => this.setState(newState, resolve));
    }

    onScroll(event) {
        const doc = event.target.scrollingElement;

        if (doc.scrollTop + doc.clientHeight >= doc.scrollHeight) {
            if (!this.state.isLoading) this.loadMoreGames();
        }
    }

    async loadMoreGames() {
        await this.setAsyncState({isLoading: true});
        
        const data = await api.next(this.state.next);
        console.log(data);
        this.setState({
            games: this.state.games.concat(data.results),
            next: data.next,
            isLoading: false
        })
    }

    render() {
        return (
            <Games id='games'>
                {this.state.games && this.state.games.map(game => (
                    <GameCard key={game.id}>
                        <GameHeaderImage src={game.background_image} alt='Game preview'></GameHeaderImage>
                        <Link href={'/game/' + game.id} >
                                <GameHeaderLink>{game.name}</GameHeaderLink>
                        </Link>

                        <GameDescription>
                            <div>Release date: {new Date(game.released).toLocaleDateString()}</div>
                            <div>Meta critic: {game.metacritic}</div>
                        </GameDescription>
                    </GameCard>
                ))}
            </Games>
        )
    }
}
