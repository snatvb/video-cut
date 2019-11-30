const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/renderer/index.html').pipe(dest('build/renderer'));
}

copyHtml.displayName = 'copy-html';

exports.copyHtml = copyHtml;

function copyCss() {
  return src('app/renderer/styles/**').pipe(dest('build/renderer/styles/'));
}

copyCss.displayName = 'copy-css';

exports.copyCss = copyCss;
