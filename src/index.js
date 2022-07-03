import 'jquery'
import 'highlight-within-textarea/jquery.highlight-within-textarea.js';

import './scss/style.scss'
import pronounsTxt from './pronouns.txt';


jQuery(document).ready(function () {

  const defaultAmbiguousPronouns = [];

  const pronouns = pronounsTxt.split(/\r?\n/).filter((pronoun) => {
    if (pronoun.includes('?')) {
      defaultAmbiguousPronouns.push(pronoun.replace('?', ''));
      return false;
    }

    return true;
  });

  const $ambiguousPronouns = $('#ambigious-pronouns');
  const $mainTextarea = $('#main-textarea');
  const $pronounCharacters = $('#pronoun-characters');
  const $totalCharacters = $('#total-characters');
  const $result = $('#result');

  $ambiguousPronouns.val(defaultAmbiguousPronouns.join(', '));

  const ambiguousPronounsString = $ambiguousPronouns.val();

  const regexPronounSeparators = '\\s\\n\\.,:;';
  const regexStart = '(?<=^|[' + regexPronounSeparators + '])(';
  const regexEnd = ')(?=[' + regexPronounSeparators + ']|$)';

  $mainTextarea.highlightWithinTextarea({
    highlight: [
      {
        highlight: new RegExp(regexStart + pronouns.join('|') + regexEnd, 'gi'),
        className: 'pronoun'
      },
      {
        highlight: new RegExp(regexStart + ambiguousPronounsString.split(', ').join('|') + regexEnd, 'gi'),
        className: 'pronoun--ambiguous'
      },
    ],
  });

  function updateStats() {
    const $hwtContent = $('.hwt-content');

    let pronounCharactersValue = 0;

    const $marks = $hwtContent.find('mark')
    $marks.each((key, mark) => {
      pronounCharactersValue += $(mark).html().length;
    })

    const totalCharactersValue = $mainTextarea.val().replace(/[\s\n]/g, "").length;

    const result = totalCharactersValue ? ((pronounCharactersValue / totalCharactersValue) * 100).toLocaleString(
      undefined,
      {maximumFractionDigits: 2}
    ) : 0;

    $pronounCharacters.html(pronounCharactersValue);
    $totalCharacters.html(totalCharactersValue);
    $result.html(result);
  }

  $mainTextarea.on("change keyup paste", function (e) {
    updateStats();
  })
});
