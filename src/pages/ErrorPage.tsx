import React from 'react';
import '../scss/pages/errorpage.scss';

type ErrorPageProps = {
  code?: number
}

export default function ErrorPage({ code = 404 }: ErrorPageProps) {
  return (
    <main>
      <section className="text-center">
        <h1>{code}</h1>
        {code === 404 && <p>Ooops, something went wrong...</p>}
      </section>
    </main>
  )
}