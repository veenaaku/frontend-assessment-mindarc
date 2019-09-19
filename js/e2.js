	/*
	* Explain why the result of ('b' + 'a' + + 'a' + 'a').toLowerCase() is banana
	*
	* (+ 'a') return NaN as a result. Because of automatic type conversion for future operations, it's the same as a string "NaN": 'b' + 'a' + 'NaN' + 'a'.
	* .toLowerCase() function is being used just to hide the answer
	*/

	/*
	* load file from server
	*/
	function loadFile(filePath) {
        let result = null;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
        }
        return result;
      }

      let data = JSON.parse(loadFile('data.json'));
      let template = document.querySelector('.template').outerHTML.replace('template','');
      let menu = '';
      data.forEach((element, index) => {
          let html = template.replace('{{title}}', element.title).replace('{{content}}', element.content);
          if (index != 0) {
              html = html.replace(/picked/g,'');
          }
          menu += html;
      });
      document.querySelector('.menu').innerHTML = menu;
      setMenuHeight();

      /*
      * display contet after click
      */
      document.getElementById('menu').addEventListener('click', e => {
          let classes = e.target.classList;
          if (classes.contains('menu_i-header')) {
              if (!classes.contains('picked')) {
                  removeClassFromMenu('picked');
                  e.target.classList.add('picked');
                  e.target.parentElement.querySelector('.menu_i-content').classList.add('picked');
              } else {
                  removeClassFromMenu('picked');
              }
              setMenuHeight();
          }
      });

      function removeClassFromMenu(className) {
          document.getElementById('menu').querySelectorAll('.' + className).forEach(element => {
              element.classList.remove(className);
          });
      }

      function setMenuHeight() {



          let contentHeight = document.querySelector('.menu_i-content.picked');
          if (contentHeight) {
              contentHeight = contentHeight.clientHeight;
          } else {
              contentHeight = 0;
          }
          //for 5 and more tabs we need to offset for 2 or more rows (4 tabs per row by design)
          let headerHeight = document.querySelector('.menu_i-header').clientHeight * Math.ceil(document.querySelectorAll('.menu_i').length/4);
          document.querySelector('.menu').style.minHeight = contentHeight + headerHeight + 'px';
  }

      window.addEventListener('resize', function() {
         setMenuHeight();
      }, true);