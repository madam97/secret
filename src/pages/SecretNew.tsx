import React from 'react';

export default function SecretNew() {
  return (
    <main id="page-secret-new" className="flex-center-col">
      <section className="text-center">
        <h1>Add new secret</h1>
        <p>Give a message and the secret's life time and you will recieve the key to read the secret message.</p>

        <form className="block-filled flex-center-col">
          <input className="input" type="text" name="secret" placeholder="Key" required={true} />
          <input className="input" type="number" name="expireAfter" placeholder="Life time in seconds" min={0} value={0} />

          <button className="btn-primary">
            Add secret
          </button>
        </form>
      </section>
    </main>
  )
}