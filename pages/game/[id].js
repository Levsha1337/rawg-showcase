import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Game() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div id='game-page'>
            <h1>Game id is {id}</h1>
            <Link href="/">
                <a>Back</a>
            </Link>
        </div>
    );
}