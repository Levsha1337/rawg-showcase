import React from 'react';
import Link from 'next/link';

export default class extends React.Component {
  render() {
    return (
        <Link href="/time">
            <a>Click me</a>
        </Link>
    )
  }
}
