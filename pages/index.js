import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

// methods for rawg.io
import api from '../api';

// styled-components
import GlobalStyle from '../comp/GlobalStyle';
import AppWrapper from '../comp/AppWrapper';
import Games from '../comp/Games';

import GameCard from '../comp/GameCard/GameCard';
import GameHeaderImage from '../comp/GameCard/GameHeaderImage';
import GameDescription from '../comp/GameCard/GameDescription';
import GameHeaderLink from '../comp/GameCard/GameHeaderLink';

import SearchOptions from '../comp/SearchOptions';
import GameSearch from '../comp/GameSearch';
import SortSelector from '../comp/SortSelector';
import PlatformSelector from '../comp/PlatformSelector';
import Checkbox from '../comp/Checkbox';
import Loading from '../comp/Loading';

import PictureNotFound from '../res/nopic.png';
import LoadingGif from '../res/loading.gif';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            platformList: [],
            games: [],
            next: undefined,
            isLoading: false
        };

        this.onScroll = this.onScroll.bind(this);
        this.onSortSelected = this.onSortSelected.bind(this);
        this.onPlatformSelected = this.onPlatformSelected.bind(this);
        this.onNameSearchChanged = this.onNameSearchChanged.bind(this);
        this.documentKeydownListener = this.documentKeydownListener.bind(this);

        // sort variants
        this.orderByList = [
            { query: undefined, text: 'Без сортировки' },
            { query: 'rating', text: 'По возрастанию рейтинга' },
            { query: '-rating', text: 'По убыванию рейтинга' },
            { query: '-released', text: 'От новых релизов' },
            { query: 'released', text: 'От старых релизов' }
        ];

        // query options for rawg api requests
        this.queryOptions = {
            ordering: undefined,
            platforms: undefined,
            search: undefined
        };

        // refs
        this.appWrapper = React.createRef();
        this.search = React.createRef();
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        document.addEventListener('keydown', this.documentKeydownListener);
        await this.loadGames();
        this.setState({
            platformList: await api.getPlatforms()
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        document.removeEventListener('keydown', this.documentKeydownListener);
    }

    setAsyncState(newState) {
        return new Promise((resolve) => this.setState(newState, resolve));
    }

    onSortSelected(event) {
        const selector = event.target;

        const selected = this.orderByList[Number(selector.value)];
        this.queryOptions.ordering = selected.query;
        this.loadGames();
    }

    onPlatformSelected(event) {
        const selector = event.target;

        if (selector.checked) {
            if (this.queryOptions.platforms === undefined) this.queryOptions.platforms = [];
            this.queryOptions.platforms.push(selector.value);
        } else {
            let platforms = this.queryOptions.platforms;
            platforms = platforms.filter(p => p !== selector.value);

            if (platforms.length === 0) platforms = undefined;
            this.queryOptions.platforms = platforms;
        }
        this.loadGames();
    }

    onScroll(event) {
        const doc = event.target.scrollingElement;

        // 150 is height of loading gif
        if (doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 150) {
            if (!this.state.isLoading) this.loadMoreGames();
        }
    }

    onNameSearchChanged(event) {
        const input = event.target;

        this.queryOptions.search = input.value.length !== 0 ? encodeURIComponent(input.value) : undefined;
        this.loadGames();
    }

    getWindowHeight() {
        const body = document.body;
        const html = document.documentElement;

        return Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
    }

    async loadGames() {
        await this.setAsyncState({
            isLoading: true
        });
        const options = {};
        Object.keys(this.queryOptions)
            .filter(key => this.queryOptions[key] !== undefined)
            .forEach(key => options[key] = this.queryOptions[key]);

        const data = await api.get('/games', options);
        await this.setAsyncState({
            games: data.results,
            next: data.next,
            isLoading: false
        });

        if (this.appWrapper.current.clientHeight < this.getWindowHeight()) this.loadMoreGames();
    }

    async loadMoreGames() {
        if (this.state.next === null) return;
        await this.setAsyncState({ isLoading: true });

        const data = await api.next(this.state.next);
        await this.setAsyncState({
            games: this.state.games.concat(data.results),
            next: data.next,
            isLoading: false
        });

        if (this.appWrapper.current.clientHeight < this.getWindowHeight()) this.loadMoreGames();
    }

    documentKeydownListener(e) {
        if (!(e.altKey || e.shiftKey || e.ctrlKey || e.key === 'OS')) {
            this.search.current.focus();
        }
    }

    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <AppWrapper ref={this.appWrapper}>
                    <SearchOptions>
                        <GameSearch ref={this.search} onChange={this.onNameSearchChanged} placeholder='🔍 Search by game name'/>
                        <SortSelector onChange={this.onSortSelected}>
                            {this.orderByList.map((el, i) =>
                                <option value={i} key={i}>{el.text}</option>
                            )}
                        </SortSelector>
                        <PlatformSelector>{this.state.platformList.length !== 0 ?
                            this.state.platformList.map(el => <div key={el.id}>
                                <Checkbox type='checkbox' value={el.id} onChange={this.onPlatformSelected}></Checkbox>
                                <label >{el.name}</label>
                            </div>)
                            :
                            <Loading src={LoadingGif} />
                        }</PlatformSelector>
                    </SearchOptions>

                    <Games id='games'>
                        <Head>
                            <link rel='shortcut icon' href='/public/favicon.ico' />
                        </Head>
                        {this.state.games && this.state.games.map(game => (
                            <GameCard key={game.id}>
                                <GameHeaderImage src={
                                    game.background_image ? game.background_image : PictureNotFound
                                } alt='Game preview'></GameHeaderImage>
                                <Link passHref href={'/game/' + game.id} >
                                    <GameHeaderLink>{game.name}</GameHeaderLink>
                                </Link>

                                <GameDescription>
                                    <div>Release date: {new Date(game.released).toLocaleDateString()}</div>
                                    <div>Rating: {game.rating}</div>
                                </GameDescription>
                            </GameCard>
                        ))}
                    </Games>
                    { this.state.next !== null && <Loading src={LoadingGif} /> }
                </AppWrapper>
            </React.Fragment>
        );
    }
}
