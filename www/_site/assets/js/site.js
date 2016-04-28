// window.SiteConfig = {
// 	Storage: typeof(Storage) !== 'undefined',
// };

// 

var t = localStorage.getItem('ktest');
if (!t) {
	localStorage.setItem('ktest', JSON.stringify({ hello: 'world'}) );
}
console.log("t", JSON.parse(t) );