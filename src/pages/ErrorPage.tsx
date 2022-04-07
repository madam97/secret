import React from 'react';

type ErrorPageProps = {
  code?: number
}

export default function ErrorPage({ code = 404 }: ErrorPageProps) {
  return (
    <main>
      <h1>{code}</h1>
      
      {code === 404 && <p>Ooops, something went wrong...</p>}
    </main>
  )
}