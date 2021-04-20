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
import Screenshot from '../../comp/Slug/Screenshot';
import ScreenshotsSlider from '../../comp/Slug/ScreenshotsSlider';
import SliderButton from '../../comp/Slug/ScreenshotSliderButton';
import SliderButtonsWrapper from '../../comp/Slug/SliderButtonsWrapper';

export default function Game() {
    const router = useRouter();
    const [state, setState] = useState({ loading: true });
    const [slider, setSlider] = useState(0);
    const [screenshots, setScreenshots] = useState({ loading: true });

    // game info
    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (state.loading) {
            api.get('/games/' + router.query.id).then(r => setState(r));
        }
    }, [router.isReady, state]);

    // game screenshots
    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (screenshots.loading) {
            api.getScreenshots(router.query.id).then(r => setScreenshots(r));
        }
    }, [router.isReady, screenshots]);

    // game screenshots slider
    useEffect(() => {

    }, [slider]);

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
                        <SliderButtonsWrapper>
                            <SliderButton onClick={() => setSlider(slider === 0 ? screenshots.length-1 : slider-1)}>{'<'}</SliderButton>
                            <SliderButton onClick={() => setSlider(slider === screenshots.length-1 ? 0 : slider + 1)}>{'>'}</SliderButton>
                        </SliderButtonsWrapper>
                        {screenshots.loading ? 
                            <Loading src={LoadingGif} />
                            :
                            <ScreenshotsSlider>
                                {
                                    <Screenshot key={screenshots[slider].id} src={screenshots[slider].image} alt='Screenshot'/>
                                }
                            </ScreenshotsSlider>
                        }
                    </GameProfile>
                }
            </AppWrapper>
        </React.Fragment>
    );
}
