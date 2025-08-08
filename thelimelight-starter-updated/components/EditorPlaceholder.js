'use client';
import { useState, useCallback } from 'react';
import { Remirror, useRemirror } from '@remirror/react';
import { BoldExtension, ItalicExtension, HeadingExtension, BulletListExtension, OrderedListExtension, LinkExtension } from 'remirror/extensions';

export default function EditorPlaceholder({ value, onChange }) {
  const extensions = () => [new BoldExtension(), new ItalicExtension(), new HeadingExtension(), new BulletListExtension(), new OrderedListExtension(), new LinkExtension()];
  const { manager, state } = useRemirror({ extensions, content: value || '', selection: 'start' });
  const handleChange = useCallback((param) => {
    const html = manager.getHTML();
    onChange && onChange(html);
  }, [manager, onChange]);

  return (
    <div style={{border:'1px dashed #ccc', padding:12}}>
      <Remirror manager={manager} onChange={handleChange} autoRender='end'>
        <div style={{ minHeight: 240 }} />
      </Remirror>
    </div>
  );
}
