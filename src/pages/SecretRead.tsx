import React from 'react';

export default function SecretRead() {
  return (
    <main id="page-secret-read" className="flex-center-col">
      <section className="text-center">
        <h1>Read secret</h1>
        <p>Give the key of a secret and read its message, if the secret has not been expired yet.</p>

        <form className="block-filled flex-center-col">
          <input className="input" type="text" name="hash" placeholder="Key" required={true} />

          <button className="btn-primary">
            Read secret
          </button>
        </form>
      </section>
    </main>
  )
}