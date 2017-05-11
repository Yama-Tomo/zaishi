Vue.component('lists', {
  template: '#lists-template',
  props: [ 'lists', 'genres' ],
  data: function() {
    return {
      summary_of_lists: {},
    }
  },
  methods: {
    commafy: function(n) {
      var parts = n.toString().split('.');
      parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      return parts.join('.');
    }
  },
  watch: {
    lists: function(lists) {
      var result = {};
      for(var i=0; i<lists.length; i++) {
        var row = lists[i];
        var date = row.date;

        result = result || {};
        result[date] = result[date] || {};
        result[date]['total'] = result[date]['total'] || 0;
        result[date]['total'] += row.amount;
        result[date]['lists'] = result[date]['lists'] || [];
        row['amount_to_comma'] = this.commafy(row.amount);
        result[date]['lists'].push(row);
      }

      // to total amount commafy, So redundantly loop :(
      for (var k in result) {
        result[k]['total_to_comma'] = this.commafy(result[k]['total']);
      }
      
      this.$data.summary_of_lists = result;
    }
  }
});
