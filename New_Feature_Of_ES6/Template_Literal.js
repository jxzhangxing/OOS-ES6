const s1 = String.raw`Hi\n${2+3}!`;
const s11 = `Hi\n${2+3}!`;
// 'Hi\n5!', the character after 'Hi'
// is not a newline character,
// '\' and 'n' are two characters.

const s2 = String.raw`Hi\u000A!`;
const s22 = `Hi\u000A!`;
// 'Hi\u000A!', same here, this time we will get the
//  \, u, 0, 0, 0, A, 6 characters.
// All kinds of escape characters will be ineffective
// and backslashes will be present in the output string.
// You can confirm this by checking the .length property
// of the string.

let name = 'Bob';
const s3 = String.raw`Hi\n${name}!`;
// 'Hi\nBob!', substitutions are processed.



// Normally you would not call String.raw() as a function,
// but to simulate `t${0}e${1}s${2}t` you can do:
const s4 = String.raw({ raw: 'test' }, 0, 1, 2); 
// 't0e1s2t'


// Note that 'test', a string, is an array-like object
// The following is equivalent to
// `foo${2 + 3}bar${'Java' + 'Script'}baz`
const s5 = String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script');
// 'foo5barJavaScriptbaz'


