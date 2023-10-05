<script>
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { clipboard } from '@milkdown/plugin-clipboard';
import { nord } from '@milkdown/theme-nord';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
import { collab, collabServiceCtx } from '@milkdown/plugin-collab';
import "@milkdown/theme-nord/style.css";

function editor(dom) {
  const doc = new Doc();
  const wsProvider = new WebsocketProvider('ws://localhost:3980/collaboration', 'test', doc);

  const MakeEditor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, dom);
    })
    .config(nord)
    .use(commonmark)
    .use(gfm)
    .use(clipboard)
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
