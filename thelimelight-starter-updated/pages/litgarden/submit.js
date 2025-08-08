import { useState } from 'react';

export default function Submit(){
  const [status, setStatus] = useState('');
  async function onSubmit(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    setStatus('sending');
    const res = await fetch('/api/litgarden/submit', { method:'POST', body: fd });
    if(res.ok) setStatus('submitted');
    else setStatus('error');
  }
  return (
    <div className="container">
      <h1>Submit to Litgarden</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div><label>Name<input name="name" required /></label></div>
        <div><label>Age<input name="age" type="number" /></label></div>
        <div><label>Class<input name="class" /></label></div>
        <div><label>Email<input name="email" type="email" required /></label></div>
        <div><label>Type<select name="type"><option>story</option><option>poem</option></select></label></div>
        <div><label>Text<textarea name="text" rows="10" /></label></div>
        <div><label>Optional image<input name="image" type="file" accept="image/*" /></label></div>
        <div><label>Optional file (DOCX/PDF)<input name="file" type="file" accept=".pdf,.doc,.docx" /></label></div>
        <div><label><input name="consent" type="checkbox" required /> I have parental consent</label></div>
        <button type="submit">Submit</button>
      </form>
      <p>Status: {status}</p>
    </div>
  )
}
