<script>
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
import { collab, collabServiceCtx } from '@milkdown/plugin-collab';

function editor(dom) {
  const doc = new Doc();
  const wsProvider = new WebsocketProvider('ws://localhost:3980/collaboration', 'test', doc);
 
  const MakeEditor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, dom);
    })
    .config(nord)
    .use(commonmark)
    .use(collab)
    .create();

  MakeEditor.then((editor) => {
    editor.action((ctx) => {
      const collabService = ctx.get(collabServiceCtx);

      collabService
        // bind doc and awareness
        .bindDoc(doc)
        .setAwareness(wsProvider.awareness)
        // connect yjs with milkdown
        .connect();
    });

  })
}

</script>

<div use:editor />
