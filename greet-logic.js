module.exports = function() {

  var stored = {} ;
  var greetings = '' ;
  // var greetCounter = 0 ;



  function greetFunction(language,name) {

    if(name != ''){
      // nameGreeted = name
      if (stored[name]=== undefined) {
        stored[name] =0;


      }

    }

    if (language === 'Eng' ) {
          return 'Hello, ' + name ;
        }

     if (language === 'Xho' ) {
        return 'Molo, ' + name ;
        }
    if (language === 'Afri') {
      return 'Halo, ' + name;
      }
      return greetings
  }

    function myGreet(){
      return greetings;
    }

  function countLocal() {
      return  Object.keys(stored).length ;

  }


  function returnNamesLocal() {
    return stored;

  }


return {
  greetFunction,
  countLocal,
  returnNamesLocal,
  myGreet
}
}
