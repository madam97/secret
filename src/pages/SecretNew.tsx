import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import ISecret from '../interface/ISecret';

export default function SecretNew() {

  const {data, error, loading, runFetch} = useFetch<ISecret>({ method: 'POST', url: '/secret'});

  const [formError, setFormError] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [expireAfter, setExpireAfter] = useState<number>(0);

  useEffect(() => {
    setFormError(error ?? '');
  }, [error]);

  /**
   * Handles the secret saving form
   * @param e 
   */
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    try {
      //Validation
      if (!secret) {
        throw new Error('Secret message is required');
      }
      if (expireAfter < 0) {
        throw new Error('Life time has to be greater than 0');
      }

      runFetch({ 
        body: { secret, expireAfter }
      });

    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('unknown error');
      }
    }
  }

  // --------------------------------------

  return (
    <main id="page-secret-new" className="flex-center-col">
      <section className="text-center">
        <h1>Add new secret</h1>
        <p>Give a message and the secret's life time and you will recieve the key to read the secret message.</p>

        {data && <p id="response">Key to read the secret message:<br/><span className="tag">{data.hash}</span></p>}

        <form className="block-filled flex-center-col" onSubmit={handleSubmit}>
          {data && <p className="response-ok">Secret message was saved</p>}
          {formError && <p className="response-error">{formError}</p>}

          <label className="label" htmlFor="secret">Message</label>
          <input 
            id="secret"
            className={`input ${formError ? 'error' : ''}`}
            type="text" 
            name="secret" 
            required={true}
            value={secret}
            onChange={e => setSecret(e.currentTarget.value)}
          />

          <label className="label" htmlFor="expire-after">Life time in seconds (0 means secret never expires)</label>
          <input 
            id="expire-after"
            className={`input ${formError ? 'error' : ''}`}
            type="number" 
            name="expire-after" 
            min={0} 
            value={expireAfter}
            onChange={e => setExpireAfter( parseInt(e.currentTarget.value) )} 
          />

          <button className="btn-primary">
            Add secret
          </button>
        </form>
      </section>
    </main>
  )
}