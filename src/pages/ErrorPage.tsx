import React from 'react';

type ErrorPageProps = {
  code?: number
}

export default function ErrorPage({ code = 404 }: ErrorPageProps) {
  return (
    <main id="page-error">
      <section className="text-center">
        <h1>{code}</h1>
        {code === 404 && <p>Ooops, something went wrong...</p>}
      </section>
    </main>
  )
}