function postFolding(args, content) {
  args = args.join(' ').split(',');
  let style = ''
  let title = ''
  if (args.length > 1) {
    style = args[0].trim()
    title = args[1].trim()
  } else if (args.length > 0) {
    title = args[0].trim()
  }
  if (style != undefined) {
    return `<details ${style}><summary> ${hexo.render.renderSync({text: title, engine: 'markdown'}).split('\n').join('')} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  } else {
    return `<details><summary> ${hexo.render.renderSync({text: title, engine: 'markdown'}).split('\n').join('')} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  }
}
hexo.extend.tag.register('folding', postFolding, {ends: true});
function postP(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<p class='p ${p0}'>${p1}</p>`;
}
function postSpan(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='p ${p0}'>${p1}</span>`;
}
 
hexo.extend.tag.register('p', postP);
hexo.extend.tag.register('span', postSpan);
 
function postNote(args) {
  args = args.join(' ').split(',')
  if (args.length > 1) {
    let cls = args[0].trim()
    let text = args[1].trim()
    return `<div class="note ${cls}">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div>`;
  } else if (args.length > 0) {
    let text = args[0].trim()
    return `<div class="note">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div>`;
  }
}
 
function postNoteBlock(args, content) {
  return `<div class="note ${args.join(' ')}">
            ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
          </div>`;
}
hexo.extend.tag.register('note', postNote);
hexo.extend.tag.register('noteblock', postNoteBlock, {ends: true});
