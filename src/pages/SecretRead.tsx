import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import ISecret from '../interface/ISecret';

export default function SecretRead() {
  
  const {data, error, loading, runFetch} = useFetch<ISecret>({ method: 'GET', url: '/secret/:hash' });

  const [formError, setFormError] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  
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
      if (!hash) {
        throw new Error('Key to the secret is required');
      }

      runFetch({ 
        params: { hash }
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
    <main id="page-secret-read" className="flex-center-col">
      <section className="text-center">
        <h1>Read secret</h1>
        <p>Give the key of a secret and read its message, if the secret has not been expired yet.</p>

        {data && <p id="response">Secret message:<br/><span className="tag">{data.secretText}</span></p>}

        <form className="block-filled flex-center-col" onSubmit={handleSubmit}>
          {data && <p className="response-ok">Secret message was read</p>}
          {formError && <p className="response-error">{formError}</p>}

          <label className="label" htmlFor="key">Key of the secret</label>
          <input 
            className="input" 
            type="text" 
            name="hash" 
            required={true} 
            value={hash}
            onChange={e => setHash(e.currentTarget.value)}
          />

          <button className="btn-primary">
            Read secret
          </button>
        </form>
      </section>
    </main>
  )
}