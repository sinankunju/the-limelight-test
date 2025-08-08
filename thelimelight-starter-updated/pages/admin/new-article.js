import dynamic from 'next/dynamic';
import EditorPlaceholder from '../../components/EditorPlaceholder';
import { useState } from 'react';

export default function NewArticle(){
  const [content, setContent] = useState('');
  async function onSubmit(e){
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      slug: e.target.slug.value || e.target.title.value.toLowerCase().replace(/\s+/g,'-'),
      category: e.target.category.value,
      subcategory: e.target.subcategory.value,
      excerpt: e.target.excerpt.value,
      content
    };
    const res = await fetch('/api/admin/articles', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(data) });
    if(res.ok) window.location.href = '/admin';
    else alert('Error');
  }
  return (
    <div className="container">
      <h1>New Article</h1>
      <form onSubmit={onSubmit}>
        <div><label>Title<input name="title" required /></label></div>
        <div><label>Slug<input name="slug" /></label></div>
        <div><label>Category<select name="category"><option>articles</option><option>literature</option><option>litgarden</option></select></label></div>
        <div><label>Subcategory<input name="subcategory" /></label></div>
        <div><label>Excerpt<textarea name="excerpt" /></label></div>
        <div><label>Content<EditorPlaceholder value={content} onChange={setContent} /></label></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
