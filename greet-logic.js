module.exports = function() {

  // var stored = '' ;

  var greetCounter = 0


  function greetFunction(language,name) {

    // if(name != ''){
    //   // nameGreeted = name
    //   if (stored[name]=== undefined) {
    //     stored[name] =0;


    //   }

    // }

    if (language === 'Eng' ) {
          return 'Hello, ' + name ;
        }

     if (language === 'Xho' ) {
        return 'Molo, ' + name ;
        }
    if (language === 'Afri') {
      return 'Halo, ' + name;
      }

  }


  // function countLocal() {
  //     return  Object.keys(stored).length ;

  // }


  // function returnNamesLocal() {
  //   return stored;

  // }


return {
  greetFunction,
  // countLocal,
  // returnNamesLocal
}
}
