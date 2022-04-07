import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main id="page-home" className="flex-center-col">
      <section className="text-center">
        <h1>Secret server</h1>
        <p>The website to write and read secrets</p>
      </section>

      <section className="flex-center">
        <Link to="/secret/new" className="block-outline block-hover text-center">
          <h2>Add new secret</h2>
          <p>Give a message and the secret's life time and you will recieve the key to read the secret message.</p>
        </Link>
        
        <Link to="/secret/read" className="block-outline block-hover text-center">
          <h2>Read secret</h2>
          <p>Give the key of a secret and read its message, if the secret has not been expired yet.</p>
        </Link>
      </section>
    </main>
  )
}