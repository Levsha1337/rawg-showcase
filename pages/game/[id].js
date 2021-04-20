import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GlobalStyle from '../../comp/GlobalStyle';
import Button from '../../comp/Slug/Button';
import Link from 'next/link';
import GameProfile from '../../comp/Slug/GameProfile';
import api from '../../api';
import GameName from '../../comp/Slug/GameName';
import Loading from '../../comp/Loading';
import LoadingGif from '../../res/loading.gif';
import AppWrapper from '../../comp/AppWrapper';

export default function Game() {
    const router = useRouter();
    const [state, setState] = useState({ loading: true });

    useEffect(() => {
        console.log('----------');
        console.log('in effect');
        if (!router.isReady) {
            return;
        }
        console.log('router ready');
        console.log('id: ' + router.query.id);
        console.log('state: ');
        console.log(state);

        if (state.loading) {
            api.get('/games/' + router.query.id).then(r => setState(r));
        }

    }, [router.isReady, state]);

    return (
        <React.Fragment>
            <GlobalStyle />
            <AppWrapper>
                {state.loading ?
                    <Loading src={LoadingGif} />
                    :
                    <GameProfile>
                        <Link passHref href='/'>
                            <Button>
                                {'<'}&nbsp;Back
                            </Button>
                        </Link>
                        <GameName>{state.name}</GameName>
                        <div>{state.description_raw}</div>
                        <Link passHref href={state.website}>
                            <Button target='_blank'>
                                Website
                            </Button>
                        </Link>
                    </GameProfile>
                }
            </AppWrapper>
        </React.Fragment>
    );
}
