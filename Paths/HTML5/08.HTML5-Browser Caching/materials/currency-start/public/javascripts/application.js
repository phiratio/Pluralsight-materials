var Converter = {
  drawCurrencies: function() {
    var html = '',
        currencies = window.currencies;

    for (var id in currencies) {
      if (!window.currencies.hasOwnProperty(id)) continue;

      html += '<li>';
      html += '<a href="#" id="from-'+id+'">&nbsp;</a>';
      html += '<em>'+currencies[id].symbol+'</em> '+currencies[id].name+' <em>('+id+')</em>';
      html += '<a href="#" id="to-'+id+'">&nbsp;</a>';
      html += '</li>';
    }

    $('#rate-selection ul').html(html);
  },

  highlightCurrencies: function(from_id, to_id) {
    window.fromTo.from = from_id;
    window.fromTo.to = to_id;

		$('#rate-selection a').attr('class', '')

    $('#from-'+from_id).attr('class', 'selected');
    $('#to-'+to_id).attr('class', 'selected');
  },

  updateCurrencyDisplay: function(from_id, to_id) {
    var from_id = from_id || window.fromTo['from'],
        to_id = to_id || window.fromTo['to'],
        from = window.currencies[from_id],
        to = window.currencies[to_id];

    this.highlightCurrencies(from_id, to_id)

    Calculator.rate = from.rateUSD * (1 / to.rateUSD);

    $("#input h2").html('<em>'+from.symbol+'</em> '+from.name) 
    $("#output h2").html('<em>'+to.symbol+'</em> '+to.name);

    html = from_id+' <em>&rarr;</em> '+to_id;
    $('#rates span').html(html);

    Calculator.add('');
  },

  updateCurrencies: function() {
    var currencies = [];
    for (var currency in window.currencies) {
      if (!window.currencies.hasOwnProperty(currency)) continue;
      currencies.push(currency);
    }

		$.post('/exchange?currencies=' + currencies.toString(), function(data) {
      for (var key in data) {
        if (data.hasOwnProperty(key) && key !== 'USD') {
          window.currencies[key].rateUSD = data[key];
        }
      }
      Converter.updateCurrencyDisplay();
		});
		Converter.updateCurrencyDisplay();
	}
}

var Calculator = {
  input: $('#input h1').get(0),
  output: $('#output h1').get(0),
  rate: 0,

  add: function(value) {
    var old = this.input.innerText !== '0' ? this.stripCommas(this.input.innerText) : '';
    this.updateValues(old + value);
  },

  updateValues: function(value) {
    var value = !value ? 0 : this.stripCommas(value),
        output_value = (isNaN(value)) ? '0.00' : (value * this.rate).toFixed(2);

    if (value.length > 9 || output_value.length > 9) return;

    this.input.innerHTML = this.addCommas(value);
    this.output.innerHTML = this.addCommas(output_value);
  },

  clear: function() {
    this.updateValues('0');
  },

  addCommas: function(num) {
    var re = /(\d+)(\d{3,3})/,
        split = (''+num).split('.'),
        num = split[0],
        decimals = split[1] !== undefined ? '.'+split[1] : '';

    while (re.test(num)) num = num.replace(re, '$1,$2');
    return num + decimals;
  },

  stripCommas: function(num) {
    return num.replace(/,/g, '');
  }

}

/*
  Handle button events within DOMReady
*/

$(function () {
	$('#input-pad p').click(function () {
		Calculator.add(this.innerText);
	});

	$('#clear').click(function(e) {
	  Calculator.clear();
	});

	$('#input').click(function(e) {
		$('body').addClass('edit-rates-from');
	});

	$('#output').click(function(e) {
		$('body').addClass('edit-rates-to');
	});

	$('#flip').click(function(e) {
		$('body').addClass('flip');
	  setTimeout(function() {
	    var last = { from: window.fromTo['from'], to: window.fromTo['to'] }
	    Converter.updateCurrencyDisplay(last.to, last.from);
	    if (Calculator.input.innerHTML.length >= 9 || Calculator.output.innerHTML.length >= 9) {
	      Calculator.clear();
	    }
	  }, 130);
	  setTimeout(function() { $('body').removeClass('flip'); }, 275);
	});

	Converter.drawCurrencies();

	$('#rate-selection a').click(function(e) {
	 	e.preventDefault();
	 	var id = this.id.split('-');
	 	args = id[0] == 'from' ? [id[1], null] : [null, id[1]];
	 	Converter.updateCurrencyDisplay.apply(Converter, args);
	 	Calculator.clear();
	 	$('body').removeClass('edit-rates-from');
		$('body').removeClass('edit-rates-to');
	});

	var detectOrientation = function() {
	  if (window.orientation) $('body').addClass('credits');
	  else $('body').removeClass('credits');
	}

	detectOrientation();
	window.addEventListener('orientationchange', detectOrientation);

	Converter.updateCurrencies();
});